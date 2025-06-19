
-- Update the issues table to ensure assignee_email is properly stored
ALTER TABLE public.issues 
ADD COLUMN IF NOT EXISTS assignee_email text;

-- Create an index on assignee_email for better query performance
CREATE INDEX IF NOT EXISTS idx_issues_assignee_email ON public.issues(assignee_email);

-- Create an index on project_id for better performance when counting issues per project
CREATE INDEX IF NOT EXISTS idx_issues_project_id ON public.issues(project_id);

-- Update the handle_issue_created function to include assignee email information
CREATE OR REPLACE FUNCTION public.handle_issue_created()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  v_creator_name TEXT;
  v_project_name TEXT;
  v_project_team_id UUID;
  v_project_created_by UUID;
  v_assignee_name TEXT;
BEGIN
  -- Get creator's name
  SELECT COALESCE(first_name || ' ' || last_name, email) INTO v_creator_name
  FROM profiles WHERE id = NEW.created_by;
  
  -- Get assignee's name if assigned
  IF NEW.assignee_id IS NOT NULL THEN
    SELECT COALESCE(first_name || ' ' || last_name, email) INTO v_assignee_name
    FROM profiles WHERE id = NEW.assignee_id;
  END IF;
  
  -- Get project details
  SELECT name, team_id, created_by INTO v_project_name, v_project_team_id, v_project_created_by
  FROM projects WHERE id = NEW.project_id;
  
  -- Create notifications
  PERFORM create_project_notification(
    NEW.project_id,
    'New Issue Created',
    v_creator_name || ' created issue "' || NEW.title || '" in project "' || v_project_name || '"' ||
    CASE 
      WHEN v_assignee_name IS NOT NULL THEN ' and assigned to ' || v_assignee_name
      ELSE ''
    END,
    'issue',
    NEW.created_by
  );
  
  RETURN NEW;
END;
$function$;
