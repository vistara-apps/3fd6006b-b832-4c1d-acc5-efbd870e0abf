# Builder Buddy - Base Mini App

Your AI co-pilot for launching web apps fast. Help solo founders quickly scope, validate, and launch MVP web applications using AI assistance and no-code templates.

## Features

- **AI Project Scoping Assistant**: Interactive guidance to define project ideas, target audience, and value propositions
- **AI Idea Validation**: Get feedback on app ideas with market insights and feasibility analysis
- **No-Code MVP Templates**: Pre-built, customizable templates for common web app types
- **Guided Deployment Assistance**: Step-by-step deployment support to get MVPs live quickly

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit & MiniKit)
- **AI**: OpenAI/OpenRouter API with Gemini 2.0 Flash
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone and install dependencies**:
```bash
git clone <repository-url>
cd builder-buddy
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env.local
```

Add your API keys:
- `OPENAI_API_KEY` or `OPENROUTER_API_KEY` for AI functionality
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY` for Base integration

3. **Run the development server**:
```bash
npm run dev
```

4. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main homepage
│   ├── providers.tsx      # MiniKit provider setup
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── AppShell.tsx      # Main app layout
│   ├── AgentChat.tsx     # AI chat interface
│   └── ...               # Feature components
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript definitions
│   ├── utils.ts          # Helper functions
│   └── openai.ts         # AI integration
└── README.md
```

## Key Components

### AgentChat
Interactive AI assistant that guides users through project scoping and validation.

### ProjectScopeBuilder
Visual progress tracker for project scoping with validation feedback.

### TemplateShowcase
Gallery of no-code templates with filtering and preview functionality.

### MetricsCard
Live metrics dashboard showing project success rates and revenue potential.

## Business Model

- **Micro-transactions**: Pay-as-you-go for premium features
- **Template Usage**: Small fees for advanced templates
- **Deployment Assistance**: Premium deployment support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support, please open an issue on GitHub or contact the development team.
