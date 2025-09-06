'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { Badge } from './ui/Badge';
import { CheckCircle, Circle, User, Target, Lightbulb, Cog } from 'lucide-react';
import { type ScopingDetails, type ValidationFeedback } from '@/lib/types';

interface ProjectScopeBuilderProps {
  scopingDetails?: ScopingDetails;
  validationFeedback?: ValidationFeedback;
}

export function ProjectScopeBuilder({ scopingDetails, validationFeedback }: ProjectScopeBuilderProps) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'problem',
      title: 'Problem Analysis',
      icon: Target,
      completed: !!scopingDetails?.problemStatement,
      data: scopingDetails?.problemStatement,
    },
    {
      id: 'audience',
      title: 'Target Audience',
      icon: User,
      completed: !!scopingDetails?.targetAudience,
      data: scopingDetails?.targetAudience,
    },
    {
      id: 'value',
      title: 'Value Proposition',
      icon: Lightbulb,
      completed: !!scopingDetails?.valueProposition,
      data: scopingDetails?.valueProposition,
    },
    {
      id: 'features',
      title: 'Core Features',
      icon: Cog,
      completed: !!scopingDetails?.coreFeatures?.length,
      data: scopingDetails?.coreFeatures,
    },
  ];

  const completedSteps = steps.filter(step => step.completed).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-300" />
            Project Scope Builder
          </CardTitle>
          <Badge variant={progress === 100 ? 'default' : 'secondary'}>
            {completedSteps}/{steps.length} Complete
          </Badge>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      
      <CardContent className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                step.completed
                  ? 'border-green-400 border-opacity-50 bg-green-400 bg-opacity-10'
                  : 'border-white border-opacity-20 hover:border-opacity-40'
              }`}
              onClick={() => setActiveStep(index)}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-white text-opacity-40" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-purple-300" />
                    <h4 className="font-medium text-white">{step.title}</h4>
                  </div>
                  {step.completed && step.data && (
                    <div className="text-sm text-white text-opacity-80">
                      {Array.isArray(step.data) ? (
                        <ul className="list-disc list-inside space-y-1">
                          {step.data.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>{step.data}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {validationFeedback && (
          <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 bg-opacity-20 border border-purple-400 border-opacity-30">
            <h4 className="font-medium text-white mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Validation Results
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-white text-opacity-80 mb-1">Overall Score</p>
                <p className="text-2xl font-bold text-white">{validationFeedback.score}/100</p>
              </div>
              <div>
                <p className="text-white text-opacity-80 mb-1">Feasibility</p>
                <p className="text-2xl font-bold text-white">{validationFeedback.feasibilityScore}/100</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-white text-opacity-80 text-sm">{validationFeedback.marketOpportunity}</p>
            </div>
          </div>
        )}

        {progress === 100 && (
          <div className="mt-6 text-center">
            <Button className="w-full">
              🚀 Ready to Build Your MVP
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
