// User types
export interface User {
  userId: string;
  walletAddress?: string;
  createdAt: Date;
  planTier: 'free' | 'premium';
}

// Project Idea types
export interface ProjectIdea {
  ideaId: string;
  userId: string;
  userPrompt: string;
  scopingDetails: ScopingDetails;
  validationFeedback: ValidationFeedback;
  createdAt: Date;
}

export interface ScopingDetails {
  problemStatement: string;
  targetAudience: string;
  valueProposition: string;
  coreFeatures: string[];
  marketSize?: string;
  competitors?: string[];
}

export interface ValidationFeedback {
  score: number; // 0-100
  strengths: string[];
  concerns: string[];
  suggestions: string[];
  marketOpportunity: string;
  feasibilityScore: number; // 0-100
}

// MVP types
export interface MVP {
  mvpId: string;
  ideaId: string;
  templateUsed: string;
  deploymentStatus: 'pending' | 'deployed' | 'failed';
  paymentStatus: 'pending' | 'paid' | 'free';
  createdAt: Date;
  deploymentUrl?: string;
}

// Template types
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'saas' | 'directory' | 'landing' | 'ecommerce' | 'blog';
  features: string[];
  price: number; // in cents
  previewUrl?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

// Chat types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    step?: string;
    progress?: number;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

// Component prop types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'destructive' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children: React.ReactNode;
  className?: string;
}
