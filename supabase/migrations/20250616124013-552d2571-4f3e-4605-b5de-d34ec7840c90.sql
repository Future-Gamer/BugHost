
-- First, let's add RLS policies for notifications table
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to see their own notifications and notifications for their teams
CREATE POLICY "Users can view their own and team notifications" 
  ON public.notifications 
  FOR SELECT 
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT tm.user_id 
      FROM team_members tm 
      WHERE tm.team_id IN (
        SELECT tm2.team_id 
        FROM team_members tm2 
        WHERE tm2.user_id = auth.uid()
      )
    )
  );

-- Policy to allow users to mark notifications as read (only their own)
CREATE POLICY "Users can update their own notifications" 
  ON public.notifications 
  FOR UPDATE 
  USING (user_id = auth.uid());

-- Function to create notifications for team members
CREATE OR REPLACE FUNCTION public.create_team_notification(
  p_team_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_exclude_user_id UUID DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Insert notifications for all active team members except the one who performed the action
  INSERT INTO public.notifications (user_id, title, message, type)
  SELECT 
    tm.user_id,
    p_title,
    p_message,
    p_type
  FROM team_members tm
  WHERE tm.team_id = p_team_id 
    AND tm.status = 'active'
    AND (p_exclude_user_id IS NULL OR tm.user_id != p_exclude_user_id);
END;
$$;

-- Function to create notification for project creator and team members
CREATE OR REPLACE FUNCTION public.create_project_notification(
  p_project_id UUID,
  p_title TEXT,
  p_message TEXT,
  p_type TEXT DEFAULT 'info',
  p_exclude_user_id UUID DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_team_id UUID;
  v_created_by UUID;
BEGIN
  -- Get project details
  SELECT team_id, created_by INTO v_team_id, v_created_by
  FROM projects WHERE id = p_project_id;
  
  -- Create notification for project creator if not excluded
  IF v_created_by IS NOT NULL AND (p_exclude_user_id IS NULL OR v_created_by != p_exclude_user_id) THEN
    INSERT INTO public.notifications (user_id, title, message, type)
    VALUES (v_created_by, p_title, p_message, p_type);
  END IF;
  
  -- Create notifications for team members if project belongs to a team
  IF v_team_id IS NOT NULL THEN
    PERFORM create_team_notification(v_team_id, p_title, p_message, p_type, p_exclude_user_id);
  END IF;
END;
$$;

-- Trigger function for project creation
CREATE OR REPLACE FUNCTION public.handle_project_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_creator_name TEXT;
BEGIN
  -- Get creator's name
  SELECT COALESCE(first_name || ' ' || last_name, email) INTO v_creator_name
  FROM profiles WHERE id = NEW.created_by;
  
  -- Create notifications for team members and project owner
  PERFORM create_project_notification(
    NEW.id,
    'New Project Created',
    v_creator_name || ' created project "' || NEW.name || '"',
    'project',
    NEW.created_by
  );
  
  RETURN NEW;
END;
$$;

-- Trigger function for issue creation
CREATE OR REPLACE FUNCTION public.handle_issue_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_creator_name TEXT;
  v_project_name TEXT;
  v_project_team_id UUID;
  v_project_created_by UUID;
BEGIN
  -- Get creator's name
  SELECT COALESCE(first_name || ' ' || last_name, email) INTO v_creator_name
  FROM profiles WHERE id = NEW.created_by;
  
  -- Get project details
  SELECT name, team_id, created_by INTO v_project_name, v_project_team_id, v_project_created_by
  FROM projects WHERE id = NEW.project_id;
  
  -- Create notifications
  PERFORM create_project_notification(
    NEW.project_id,
    'New Issue Created',
    v_creator_name || ' created issue "' || NEW.title || '" in project "' || v_project_name || '"',
    'issue',
    NEW.created_by
  );
  
  RETURN NEW;
END;
$$;

-- Trigger function for team creation
CREATE OR REPLACE FUNCTION public.handle_team_created()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_creator_name TEXT;
BEGIN
  -- Get creator's name
  SELECT COALESCE(first_name || ' ' || last_name, email) INTO v_creator_name
  FROM profiles WHERE id = NEW.created_by;
  
  -- Create notification for the team creator
  INSERT INTO public.notifications (user_id, title, message, type)
  VALUES (
    NEW.created_by,
    'Team Created',
    'You created team "' || NEW.name || '"',
    'team'
  );
  
  RETURN NEW;
END;
$$;

-- Trigger function for team member addition
CREATE OR REPLACE FUNCTION public.handle_team_member_added()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_member_name TEXT;
  v_team_name TEXT;
BEGIN
  -- Get member's name
  SELECT COALESCE(first_name || ' ' || last_name, email) INTO v_member_name
  FROM profiles WHERE id = NEW.user_id;
  
  -- Get team name
  SELECT name INTO v_team_name FROM teams WHERE id = NEW.team_id;
  
  -- Create notifications for all team members including the new member
  PERFORM create_team_notification(
    NEW.team_id,
    'New Team Member',
    v_member_name || ' joined team "' || v_team_name || '"',
    'team_member',
    NULL -- Don't exclude anyone, everyone should see this
  );
  
  RETURN NEW;
END;
$$;

-- Create triggers
CREATE TRIGGER on_project_created
  AFTER INSERT ON projects
  FOR EACH ROW EXECUTE FUNCTION handle_project_created();

CREATE TRIGGER on_issue_created
  AFTER INSERT ON issues
  FOR EACH ROW EXECUTE FUNCTION handle_issue_created();

CREATE TRIGGER on_team_created
  AFTER INSERT ON teams
  FOR EACH ROW EXECUTE FUNCTION handle_team_created();

CREATE TRIGGER on_team_member_added
  AFTER INSERT ON team_members
  FOR EACH ROW EXECUTE FUNCTION handle_team_member_added();
