'use client';

import { generateBlogPost } from '@/ai/flows/blog-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { format } from 'date-fns';

export default function BlogGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<{ title: string; content: string } | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setGeneratedPost(null);
    try {
      const result = await generateBlogPost({ topic });
      setGeneratedPost(result);
    } catch (error) {
      console.error('Error generating blog post:', error);
      // You could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  };
  
    const renderMarkdown = (content: string) => {
        return content.split('\n\n').map((paragraph, i) => {
            if (paragraph.startsWith('```')) {
              const code = paragraph.replace(/```(javascript|html|css|typescript)?/g, '').trim();
              return (
                <pre key={i} className="bg-muted p-4 rounded-md overflow-x-auto my-6">
                  <code className="font-code text-sm text-foreground">{code}</code>
                </pre>
              );
            }
             if (paragraph.startsWith('## ')) {
                return <h2 key={i} className="font-headline text-3xl font-bold mt-10 mb-4 text-foreground">{paragraph.substring(3)}</h2>;
            }
            if (paragraph.startsWith('### ')) {
                return <h3 key={i} className="font-headline text-2xl font-bold mt-8 mb-3 text-foreground">{paragraph.substring(4)}</h3>;
            }
            return <p key={i} className="my-6 text-muted-foreground">{paragraph}</p>;
          });
    }


  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center">AI Blog Post Generator</CardTitle>
            <CardDescription className="text-center pt-2">
              Provide a topic and let AI draft an engaging blog post for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-2 mb-8">
              <Input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., 'The future of server components'"
                disabled={isLoading}
                className="flex-grow"
              />
              <Button type="submit" disabled={isLoading || !topic.trim()} className="w-full sm:w-auto">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                {isLoading ? 'Generating...' : 'Generate Post'}
              </Button>
            </form>

            {isLoading && (
              <div className="space-y-4 animate-pulse">
                <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-5/6"></div>
                 <div className="h-4 bg-muted rounded w-full mt-4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            )}
            
            {generatedPost && (
              <article>
                <header className="mb-12 text-center">
                    <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
                        {generatedPost.title}
                    </h1>
                    <p className="mt-4 text-sm text-muted-foreground">
                        {format(new Date(), 'MMMM d, yyyy')}
                    </p>
                </header>
                <div className="font-inter text-lg leading-relaxed">
                   {renderMarkdown(generatedPost.content)}
                </div>
              </article>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
