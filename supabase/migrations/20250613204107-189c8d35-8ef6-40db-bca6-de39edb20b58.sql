
-- Create enum types for tickets
CREATE TYPE ticket_type AS ENUM ('bug', 'feature', 'task');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE ticket_status AS ENUM ('todo', 'inprogress', 'done');
CREATE TYPE project_status AS ENUM ('active', 'archived');

-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  status project_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type ticket_type NOT NULL DEFAULT 'bug',
  priority ticket_priority NOT NULL DEFAULT 'medium',
  status ticket_status NOT NULL DEFAULT 'todo',
  assignee TEXT,
  reporter TEXT NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;

-- Create policies for projects (public access for now)
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Anyone can create projects" ON public.projects FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update projects" ON public.projects FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete projects" ON public.projects FOR DELETE USING (true);

-- Create policies for tickets (public access for now)
CREATE POLICY "Anyone can view tickets" ON public.tickets FOR SELECT USING (true);
CREATE POLICY "Anyone can create tickets" ON public.tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can update tickets" ON public.tickets FOR UPDATE USING (true);
CREATE POLICY "Anyone can delete tickets" ON public.tickets FOR DELETE USING (true);

-- Insert sample projects
INSERT INTO public.projects (name, description, status) VALUES
('Bug Tracker App', 'Main application for tracking bugs and issues across our platform', 'active'),
('Mobile App v2.0', 'Next generation mobile application with enhanced features', 'active'),
('Legacy System Migration', 'Migration project for moving from old infrastructure', 'archived');

-- Insert sample tickets
INSERT INTO public.tickets (title, description, type, priority, status, assignee, reporter, project_id) VALUES
('Login page not responsive on mobile', 'The login form elements are not properly aligned on mobile devices', 'bug', 'high', 'todo', 'John Doe', 'Jane Smith', (SELECT id FROM public.projects WHERE name = 'Bug Tracker App')),
('Add dark mode toggle', 'Implement dark mode functionality with theme switching', 'feature', 'medium', 'inprogress', 'Alice Johnson', 'Bob Wilson', (SELECT id FROM public.projects WHERE name = 'Bug Tracker App')),
('Update project documentation', 'Review and update the README file with latest changes', 'task', 'low', 'done', 'Charlie Brown', 'David Lee', (SELECT id FROM public.projects WHERE name = 'Bug Tracker App')),
('API endpoint performance issue', 'User registration API is taking too long to respond', 'bug', 'urgent', 'todo', 'John Doe', 'Sarah Connor', (SELECT id FROM public.projects WHERE name = 'Mobile App v2.0')),
('Push notifications feature', 'Add support for real-time push notifications', 'feature', 'high', 'inprogress', 'Alice Johnson', 'Mike Ross', (SELECT id FROM public.projects WHERE name = 'Mobile App v2.0'));
