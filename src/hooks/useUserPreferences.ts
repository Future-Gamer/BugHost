
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

type UserPreferences = Tables<'user_preferences'>;
type UserPreferencesInsert = TablesInsert<'user_preferences'>;
type UserPreferencesUpdate = TablesUpdate<'user_preferences'>;

export const useUserPreferences = (userId: string | null) => {
  return useQuery({
    queryKey: ['user-preferences', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (error) throw error;
      return data as UserPreferences | null;
    },
    enabled: !!userId,
  });
};

export const useCreateUserPreferences = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (preferences: Omit<UserPreferencesInsert, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('user_preferences')
        .insert(preferences)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create preferences",
        variant: "destructive",
      });
      console.error('Error creating preferences:', error);
    },
  });
};

export const useUpdateUserPreferences = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UserPreferencesUpdate }) => {
      const { data, error } = await supabase
        .from('user_preferences')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-preferences'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update preferences",
        variant: "destructive",
      });
      console.error('Error updating preferences:', error);
    },
  });
};
