import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot } from 'lucide-react';

const features = [
  {
    title: 'AI Chatbot',
    description: 'Ask me anything! An AI-powered chatbot that knows about my skills and projects.',
    href: '/ai-hub/chatbot',
    icon: <Bot className="w-8 h-8 text-primary" />,
  },
];

export default function AiHubPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          AI Hub
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Explore interactive AI features that demonstrate my skills in building intelligent applications.
        </p>
      </section>

      <section className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 justify-center">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.href} className="group">
            <Card className="h-full transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20">
              <CardHeader>
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                <CardDescription className="pt-2">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
