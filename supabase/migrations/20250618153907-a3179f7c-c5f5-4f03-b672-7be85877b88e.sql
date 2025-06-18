
-- Enable RLS on issues table if not already enabled
ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own issues" ON public.issues;
DROP POLICY IF EXISTS "Users can create their own issues" ON public.issues;
DROP POLICY IF EXISTS "Users can update their own issues" ON public.issues;
DROP POLICY IF EXISTS "Users can delete their own issues" ON public.issues;

-- Create RLS policies for issues - users can only see issues they created or are assigned to
CREATE POLICY "Users can view their own issues" 
  ON public.issues 
  FOR SELECT 
  USING (
    auth.uid() = created_by OR 
    auth.uid() = assignee_id OR 
    auth.uid() = reporter_id
  );

CREATE POLICY "Users can create their own issues" 
  ON public.issues 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own issues" 
  ON public.issues 
  FOR UPDATE 
  USING (
    auth.uid() = created_by OR 
    auth.uid() = assignee_id OR 
    auth.uid() = reporter_id
  );

CREATE POLICY "Users can delete their own issues" 
  ON public.issues 
  FOR DELETE 
  USING (auth.uid() = created_by);

-- Enable RLS on projects table if not already enabled
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can create their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can update their own projects" ON public.projects;
DROP POLICY IF EXISTS "Users can delete their own projects" ON public.projects;

-- Create RLS policies for projects - users can only see projects they created
CREATE POLICY "Users can view their own projects" 
  ON public.projects 
  FOR SELECT 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can create their own projects" 
  ON public.projects 
  FOR INSERT 
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own projects" 
  ON public.projects 
  FOR UPDATE 
  USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own projects" 
  ON public.projects 
  FOR DELETE 
  USING (auth.uid() = created_by);
