'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';

import { generateChatResponse, generateScopingQuestions, validateIdea } from '@/lib/openai';
import { type ChatMessage, type ScopingDetails, type ValidationFeedback } from '@/lib/types';
import { SCOPING_QUESTIONS } from '@/lib/utils';

interface AgentChatProps {
  variant?: 'withTools' | 'compact';
  onScopingComplete?: (details: ScopingDetails) => void;
  onValidationComplete?: (feedback: ValidationFeedback) => void;
}

export function AgentChat({ 
  variant = 'withTools', 
  onScopingComplete,
  onValidationComplete 
}: AgentChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "gm! 👋 What app idea are you building today? I'm here to help you scope, validate, and launch your MVP!",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState<'initial' | 'scoping' | 'validation' | 'templates'>('initial');
  const [scopingData, setScopingData] = useState<Partial<ScopingDetails>>({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (role: 'user' | 'assistant', content: string, metadata?: any) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role,
      content,
      timestamp: new Date(),
      metadata,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleScopingFlow = async (userResponse: string) => {
    if (questionIndex === 0) {
      // First question - problem statement
      setScopingData(prev => ({ ...prev, problemStatement: userResponse }));
      addMessage('assistant', "Great! Now, who is your target audience? Be as specific as possible - think demographics, behaviors, and pain points.");
      setQuestionIndex(1);
    } else if (questionIndex === 1) {
      // Second question - target audience
      setScopingData(prev => ({ ...prev, targetAudience: userResponse }));
      addMessage('assistant', "Perfect! What makes your solution unique? What's your value proposition that sets you apart from alternatives?");
      setQuestionIndex(2);
    } else if (questionIndex === 2) {
      // Third question - value proposition
      setScopingData(prev => ({ ...prev, valueProposition: userResponse }));
      addMessage('assistant', "Excellent! What are the 3-5 core features your MVP absolutely needs? Focus on the essentials that solve the main problem.");
      setQuestionIndex(3);
    } else if (questionIndex === 3) {
      // Final question - core features
      const features = userResponse.split(/[,\n]/).map(f => f.trim()).filter(f => f.length > 0);
      const completedScoping: ScopingDetails = {
        ...scopingData,
        coreFeatures: features,
      } as ScopingDetails;
      
      setScopingData(completedScoping);
      setCurrentStep('validation');
      
      addMessage('assistant', "🎉 Great! I've gathered all the details about your idea. Let me analyze it and provide some validation feedback...");
      
      // Generate validation
      try {
        const validation = await validateIdea(completedScoping);
        addMessage('assistant', 
          `Here's my analysis of your idea:\n\n` +
          `**Overall Score: ${validation.score}/100** 🎯\n\n` +
          `**Strengths:**\n${validation.strengths.map((s: string) => `• ${s}`).join('\n')}\n\n` +
          `**Areas to Consider:**\n${validation.concerns.map((c: string) => `• ${c}`).join('\n')}\n\n` +
          `**Suggestions:**\n${validation.suggestions.map((s: string) => `• ${s}`).join('\n')}\n\n` +
          `**Market Opportunity:** ${validation.marketOpportunity}\n\n` +
          `Ready to see some MVP templates that could work for your idea?`
        );
        
        onScopingComplete?.(completedScoping);
        onValidationComplete?.(validation);
      } catch (error) {
        addMessage('assistant', "I had trouble analyzing your idea, but it sounds promising! Would you like to explore some MVP templates?");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      if (currentStep === 'initial') {
        // Start scoping flow
        setCurrentStep('scoping');
        setScopingData({ problemStatement: userMessage });
        addMessage('assistant', "Awesome idea! Let me help you scope this properly. Who is your target audience? Be as specific as possible - think demographics, behaviors, and pain points.");
        setQuestionIndex(1);
      } else if (currentStep === 'scoping') {
        await handleScopingFlow(userMessage);
      } else {
        // General chat
        const response = await generateChatResponse([
          ...messages.map(m => ({ role: m.role, content: m.content })),
          { role: 'user', content: userMessage }
        ]);
        addMessage('assistant', response);
      }
    } catch (error) {
      addMessage('assistant', "I'm having trouble connecting right now, but I'm here to help! Try asking me about your project idea.");
    } finally {
      setIsLoading(false);
    }
  };

  const isCompact = variant === 'compact';

  return (
    <Card className={`flex flex-col ${isCompact ? 'h-96' : 'h-[600px]'}`}>
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-white border-opacity-20">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">Builder Buddy AI</h3>
          <p className="text-sm text-white text-opacity-60">Your AI co-pilot</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-white bg-opacity-10 text-white'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="bg-white bg-opacity-10 text-white p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2 pt-4 border-t border-white border-opacity-20">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Tell me about your app idea..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button type="submit" disabled={!input.trim() || isLoading} size="sm">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </Card>
  );
}
