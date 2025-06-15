
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bug, Users, BarChart3, Settings, Shield, Zap } from 'lucide-react';

const Introduction = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bug,
      title: "Issue Tracking",
      description: "Track and manage bugs, features, and tasks with powerful categorization and status management."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Invite team members, assign issues, and collaborate effectively on projects."
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Get detailed analytics on project progress, team performance, and issue resolution metrics."
    },
    {
      icon: Settings,
      title: "Project Management",
      description: "Organize work into projects with customizable workflows and priority management."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Built with security in mind, ensuring your data is safe and accessible when you need it."
    },
    {
      icon: Zap,
      title: "Fast & Intuitive",
      description: "Modern, responsive interface designed for productivity and ease of use."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Bug className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900">BugHost</h1>
          </div>
          <Button onClick={() => navigate('/auth')}>
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Bug Tracking & Project Management
            <span className="text-primary"> Made Simple</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Streamline your development workflow with powerful issue tracking, 
            team collaboration tools, and insightful analytics. Built for teams 
            who want to ship better software faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-3"
            >
              Start Free Trial
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Everything you need to manage projects
            </h3>
            <p className="text-lg text-gray-600">
              Powerful features designed to help your team stay organized and productive
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to streamline your workflow?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of teams already using BugHost to deliver better software
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/auth')}
              className="text-lg px-8 py-3"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; 2024 BugHost. Built for teams who care about quality.</p>
        </div>
      </footer>
    </div>
  );
};

export default Introduction;
