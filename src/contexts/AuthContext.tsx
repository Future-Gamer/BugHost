
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Profile = Tables<'profiles'>;

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName?: string, lastName?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<Profile>) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      console.log('Profile data:', profileData);
      return profileData;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  };

  const createProfileIfMissing = async (userId: string, email: string, firstName?: string, lastName?: string) => {
    try {
      console.log('Checking/creating profile for user:', userId);
      
      // First check if profile exists
      let { data: existingProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!existingProfile) {
        console.log('Creating missing profile for user:', userId);
        const { data: newProfile, error } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: email,
            first_name: firstName || '',
            last_name: lastName || ''
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating profile:', error);
          return null;
        }
        
        console.log('Created new profile:', newProfile);
        return newProfile;
      }
      
      return existingProfile;
    } catch (error) {
      console.error('Error in createProfileIfMissing:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    let isMounted = true;
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.email);
        
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Use a small delay to avoid potential deadlocks
          setTimeout(async () => {
            if (!isMounted) return;
            
            let profileData = await fetchUserProfile(session.user.id);
            
            // If no profile found, try to create one
            if (!profileData) {
              profileData = await createProfileIfMissing(
                session.user.id,
                session.user.email || '',
                session.user.user_metadata?.first_name,
                session.user.user_metadata?.last_name
              );
            }
            
            if (isMounted) {
              setProfile(profileData);
            }
          }, 100);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (isMounted) setLoading(false);
          return;
        }

        console.log('Initial session check:', session?.user?.email);
        
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          let profileData = await fetchUserProfile(session.user.id);
          
          // If no profile found, try to create one
          if (!profileData) {
            profileData = await createProfileIfMissing(
              session.user.id,
              session.user.email || '',
              session.user.user_metadata?.first_name,
              session.user.user_metadata?.last_name
            );
          }
          
          if (isMounted) {
            setProfile(profileData);
          }
        }
        
        if (isMounted) {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error in initializeAuth:', error);
        if (isMounted) setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, firstName?: string, lastName?: string) => {
    console.log('Signing up user:', email);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName || '',
          last_name: lastName || '',
        }
      }
    });
    
    if (error) {
      console.error('Sign up error:', error);
    } else {
      console.log('Sign up successful:', data);
      
      // If user is immediately confirmed, ensure profile exists
      if (data.user && data.user.email_confirmed_at) {
        setTimeout(async () => {
          await createProfileIfMissing(
            data.user.id,
            email,
            firstName,
            lastName
          );
        }, 100);
      }
    }
    
    return { error };
  };

  const signIn = async (email: string, password: string) => {
    console.log('Signing in user:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error);
    } else {
      console.log('Sign in successful:', data);
    }
    
    return { error };
  };

  const signOut = async () => {
    console.log('Signing out user');
    await supabase.auth.signOut();
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'No user logged in' };
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    
    if (!error && profile) {
      setProfile({ ...profile, ...updates });
    }
    
    return { error };
  };

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
