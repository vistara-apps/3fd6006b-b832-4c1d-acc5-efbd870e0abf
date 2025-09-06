'use client';

import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Badge } from './ui/Badge';
import { Progress } from './ui/Progress';
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Zap } from 'lucide-react';

interface MetricData {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  progress?: number;
  icon: React.ComponentType<any>;
}

const mockMetrics: MetricData[] = [
  {
    title: 'Revenue Potential',
    value: '$1,800-$8,500',
    change: '+24.5%',
    trend: 'up',
    progress: 75,
    icon: DollarSign,
  },
  {
    title: 'Market Size',
    value: '2.4M users',
    change: '+18.2%',
    trend: 'up',
    progress: 85,
    icon: Users,
  },
  {
    title: 'Validation Score',
    value: '87/100',
    change: '+12.1%',
    trend: 'up',
    progress: 87,
    icon: Target,
  },
  {
    title: 'Launch Readiness',
    value: '92%',
    change: '+5.3%',
    trend: 'up',
    progress: 92,
    icon: Zap,
  },
];

export function MetricsCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {mockMetrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card key={index} hover className="metric-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white text-opacity-80">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-purple-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">{metric.value}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400 mr-1" />
                  )}
                  <span className={metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}>
                    {metric.change}
                  </span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Live
                </Badge>
              </div>
              {metric.progress && (
                <div className="mt-3">
                  <Progress value={metric.progress} className="h-1" />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
