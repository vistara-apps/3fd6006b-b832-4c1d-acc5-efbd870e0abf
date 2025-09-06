'use client';

import { useState } from 'react';
import { Menu, X, Sparkles, Zap, Target, Rocket } from 'lucide-react';
import { Button } from './ui/Button';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Launch', href: '#', icon: Rocket },
    { name: 'Validate', href: '#', icon: Target },
    { name: 'Templates', href: '#', icon: Sparkles },
    { name: 'Deploy', href: '#', icon: Zap },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative z-50">
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold text-white">Builder Buddy</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Wallet Connection */}
            <div className="hidden md:block">
              <Wallet>
                <ConnectWallet>
                  <Name />
                </ConnectWallet>
              </Wallet>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black bg-opacity-20 backdrop-blur-lg">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white text-opacity-80 hover:text-opacity-100 hover:bg-white hover:bg-opacity-10"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                );
              })}
              <div className="px-3 py-2">
                <Wallet>
                  <ConnectWallet>
                    <Name />
                  </ConnectWallet>
                </Wallet>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-white border-opacity-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-white text-opacity-60 text-sm">
              © 2024 Builder Buddy. Built with ❤️ for solo founders.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
