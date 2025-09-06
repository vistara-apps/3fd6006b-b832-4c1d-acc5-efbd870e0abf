'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/AppShell';
import { AgentChat } from '@/components/AgentChat';
import { MetricsCard } from '@/components/MetricsCard';
import { ProjectScopeBuilder } from '@/components/ProjectScopeBuilder';
import { TemplateShowcase } from '@/components/TemplateShowcase';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { 
  Sparkles, 
  Target, 
  Rocket, 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';
import { type ScopingDetails, type ValidationFeedback } from '@/lib/types';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<'chat' | 'scope' | 'templates' | 'deploy'>('chat');
  const [scopingDetails, setScopingDetails] = useState<ScopingDetails | undefined>();
  const [validationFeedback, setValidationFeedback] = useState<ValidationFeedback | undefined>();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleScopingComplete = (details: ScopingDetails) => {
    setScopingDetails(details);
    setActiveTab('scope');
  };

  const handleValidationComplete = (feedback: ValidationFeedback) => {
    setValidationFeedback(feedback);
  };

  const features = [
    {
      icon: Target,
      title: 'AI Project Scoping',
      description: 'Interactive guidance to define your project idea, target audience, and value proposition.',
      color: 'from-purple-400 to-pink-400',
    },
    {
      icon: CheckCircle,
      title: 'Idea Validation',
      description: 'Get AI-powered feedback on your idea with market insights and feasibility analysis.',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      icon: Sparkles,
      title: 'No-Code Templates',
      description: 'Pre-built, customizable templates for common web app types to accelerate development.',
      color: 'from-green-400 to-emerald-400',
    },
    {
      icon: Rocket,
      title: 'Guided Deployment',
      description: 'Step-by-step deployment assistance to get your MVP live quickly.',
      color: 'from-orange-400 to-red-400',
    },
  ];

  const stats = [
    { label: 'MVPs Launched', value: '1,247', icon: Rocket },
    { label: 'Success Rate', value: '89%', icon: TrendingUp },
    { label: 'Avg. Revenue', value: '$2.4K', icon: DollarSign },
    { label: 'Active Builders', value: '3.2K', icon: Users },
  ];

  return (
    <AppShell>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered MVP Builder
                </Badge>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 text-shadow">
                Builder Buddy
              </h1>
              
              <p className="text-xl sm:text-2xl text-white text-opacity-90 mb-8 max-w-3xl mx-auto">
                Your AI co-pilot for launching web apps fast. Scope, validate, and deploy your MVP in hours, not weeks.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button size="lg" className="text-lg px-8 py-4">
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Building
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Star className="w-5 h-5 mr-2" />
                  View Templates
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <Icon className="w-6 h-6 text-purple-300" />
                      </div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-white text-opacity-60">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Everything you need to launch fast
              </h2>
              <p className="text-xl text-white text-opacity-80 max-w-2xl mx-auto">
                From idea to deployment, Builder Buddy guides you through every step of building your MVP.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} hover className="text-center">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-white text-opacity-80 text-sm">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Metrics Dashboard */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Live Metrics</h2>
              <p className="text-white text-opacity-80">Real-time insights from successful Builder Buddy projects</p>
            </div>
            <MetricsCard />
          </div>
        </section>

        {/* Interactive Builder */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Start Building Your MVP</h2>
              <p className="text-white text-opacity-80">Chat with our AI to scope your idea and get started</p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: 'chat', label: 'AI Chat', icon: Sparkles },
                { id: 'scope', label: 'Project Scope', icon: Target },
                { id: 'templates', label: 'Templates', icon: Zap },
                { id: 'deploy', label: 'Deploy', icon: Rocket },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? 'default' : 'secondary'}
                    onClick={() => setActiveTab(tab.id as any)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="max-w-4xl mx-auto">
              {activeTab === 'chat' && (
                <AgentChat
                  onScopingComplete={handleScopingComplete}
                  onValidationComplete={handleValidationComplete}
                />
              )}
              
              {activeTab === 'scope' && (
                <ProjectScopeBuilder
                  scopingDetails={scopingDetails}
                  validationFeedback={validationFeedback}
                />
              )}
              
              {activeTab === 'templates' && <TemplateShowcase />}
              
              {activeTab === 'deploy' && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Rocket className="w-5 h-5 text-purple-300" />
                      Deployment Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12">
                      <Rocket className="w-16 h-16 text-white text-opacity-40 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">Ready to Deploy?</h3>
                      <p className="text-white text-opacity-80 mb-6">
                        Complete your project scoping and select a template to enable deployment.
                      </p>
                      <Button disabled={!scopingDetails}>
                        Start Deployment
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-20 border-purple-400 border-opacity-30">
              <CardContent className="py-12">
                <h2 className="text-3xl font-bold text-white mb-4">
                  Ready to launch your next big idea?
                </h2>
                <p className="text-xl text-white text-opacity-90 mb-8">
                  Join thousands of solo founders who've built successful MVPs with Builder Buddy.
                </p>
                <Button size="lg" className="text-lg px-8 py-4">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
