
-- Create invitations table for team member invitations
CREATE TABLE public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  role public.user_role NOT NULL DEFAULT 'developer',
  invited_by UUID REFERENCES public.profiles(id) NOT NULL,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + interval '7 days'),
  accepted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS policies for invitations
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Policy to allow team creators and admins to view invitations for their teams
CREATE POLICY "Team members can view team invitations" 
  ON public.invitations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = invitations.team_id 
      AND tm.user_id = auth.uid()
      AND tm.status = 'active'
    )
  );

-- Policy to allow team creators and admins to create invitations
CREATE POLICY "Team members can create invitations" 
  ON public.invitations 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.team_members tm 
      WHERE tm.team_id = invitations.team_id 
      AND tm.user_id = auth.uid()
      AND tm.status = 'active'
    )
  );

-- Policy to allow users to view invitations sent to their email
CREATE POLICY "Users can view invitations sent to them" 
  ON public.invitations 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.email = invitations.email 
      AND p.id = auth.uid()
    )
  );

-- Policy to allow invited users to update their own invitations (accept them)
CREATE POLICY "Users can accept their own invitations" 
  ON public.invitations 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p 
      WHERE p.email = invitations.email 
      AND p.id = auth.uid()
    )
  );

-- Create index for faster lookups
CREATE INDEX idx_invitations_email ON public.invitations(email);
CREATE INDEX idx_invitations_token ON public.invitations(token);
CREATE INDEX idx_invitations_team_id ON public.invitations(team_id);

-- Add user preferences table for settings like theme
CREATE TABLE public.user_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL UNIQUE,
  theme TEXT NOT NULL DEFAULT 'light' CHECK (theme IN ('light', 'dark', 'system')),
  email_notifications BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS for user preferences
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to manage their own preferences
CREATE POLICY "Users can manage their own preferences" 
  ON public.user_preferences 
  FOR ALL 
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
