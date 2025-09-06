'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { ExternalLink, Star, Clock, Code, Palette, Zap } from 'lucide-react';
import { type Template } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'SaaS Landing Pro',
    description: 'Complete landing page with pricing, testimonials, and conversion optimization',
    category: 'saas',
    features: ['Responsive Design', 'Payment Integration', 'Analytics', 'SEO Optimized'],
    price: 2900, // $29.00
    difficulty: 'beginner',
    previewUrl: '#',
  },
  {
    id: '2',
    name: 'Directory Builder',
    description: 'Build curated directories with search, filters, and user submissions',
    category: 'directory',
    features: ['Search & Filter', 'User Submissions', 'Admin Panel', 'Monetization'],
    price: 4900, // $49.00
    difficulty: 'intermediate',
    previewUrl: '#',
  },
  {
    id: '3',
    name: 'Lead Magnet Kit',
    description: 'High-converting lead capture pages with email automation',
    category: 'landing',
    features: ['Email Integration', 'A/B Testing', 'Analytics', 'Mobile Optimized'],
    price: 1900, // $19.00
    difficulty: 'beginner',
    previewUrl: '#',
  },
  {
    id: '4',
    name: 'E-commerce Starter',
    description: 'Full e-commerce solution with cart, checkout, and inventory management',
    category: 'ecommerce',
    features: ['Shopping Cart', 'Payment Processing', 'Inventory', 'Order Management'],
    price: 7900, // $79.00
    difficulty: 'advanced',
    previewUrl: '#',
  },
];

export function TemplateShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const categories = [
    { id: 'all', name: 'All Templates', icon: Code },
    { id: 'saas', name: 'SaaS', icon: Zap },
    { id: 'directory', name: 'Directory', icon: Star },
    { id: 'landing', name: 'Landing', icon: Palette },
    { id: 'ecommerce', name: 'E-commerce', icon: ExternalLink },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? mockTemplates 
    : mockTemplates.filter(template => template.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'saas': return Zap;
      case 'directory': return Star;
      case 'landing': return Palette;
      case 'ecommerce': return ExternalLink;
      default: return Code;
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'secondary'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4" />
              {category.name}
            </Button>
          );
        })}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => {
          const CategoryIcon = getCategoryIcon(template.category);
          return (
            <Card key={template.id} hover className="group">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-5 h-5 text-purple-300" />
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                  <Badge variant="outline" className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-white text-opacity-80 text-sm">
                  {template.description}
                </p>
                
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-white">Features:</h5>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-20">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">
                      {formatCurrency(template.price)}
                    </span>
                    <Clock className="w-4 h-4 text-white text-opacity-60" />
                    <span className="text-sm text-white text-opacity-60">
                      ~2 hours
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1">
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Code className="w-12 h-12 text-white text-opacity-40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No templates found</h3>
          <p className="text-white text-opacity-60">
            Try selecting a different category or check back soon for new templates.
          </p>
        </div>
      )}
    </div>
  );
}
