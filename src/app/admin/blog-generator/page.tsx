'use client';

import { generateBlogPost } from '@/ai/flows/blog-generator';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { Copy, Loader2, Send, Wand2 } from 'lucide-react';
import { format } from 'date-fns';
import { useRequireAuth } from '@/hooks/use-auth';
import { addPost } from '@/lib/blog';
import { slugify } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { revalidatePage } from '@/lib/actions';
import React from 'react';

export default function BlogGeneratorPage() {
  useRequireAuth();
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<{ title: string; content: string } | null>(null);
  const { toast } = useToast();
  const router = useRouter();


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
      toast({ title: 'Error', description: 'Failed to generate blog post.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost.content);
    toast({ title: 'Copied!', description: 'Blog post Markdown copied to clipboard.' });
  };

  const handlePublish = async () => {
    if (!generatedPost) return;
    
    setIsPublishing(true);
    try {
        const slug = slugify(generatedPost.title);
        // Create an excerpt from the first ~150 characters
        const excerpt = generatedPost.content.split('\n').find(p => !p.startsWith('#') && p.trim() !== '')?.substring(0, 150) + '...' || 'Read more...';

        const newPost = {
            title: generatedPost.title,
            content: generatedPost.content,
            slug,
            excerpt,
            date: new Date().toISOString(),
            image: `https://picsum.photos/seed/${slug}/1200/800`,
        };
        await addPost(newPost);
        
        toast({ title: 'Published!', description: 'Your new post has been published.' });

        await revalidatePage('/blog');
        await revalidatePage(`/blog/${slug}`);
        await revalidatePage('/');
        
        router.push('/admin/blog');
        router.refresh();

    } catch (error) {
        console.error('Error publishing post:', error);
        toast({ title: 'Error', description: 'Failed to publish post.', variant: 'destructive' });
    } finally {
        setIsPublishing(false);
    }
  }
  
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
            
            // Process inline markdown
            const processInline = (text: string) => {
                const parts = text
                .split(/(\*\*.*?\*\*)|(\*.*?\*)|(`.*?`)/g) // Split by bold, italic, or code
                .filter(Boolean); // Filter out empty strings
        
                return parts.map((part, index) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={index}>{part.slice(2, -2)}</strong>;
                    }
                    if (part.startsWith('*') && part.endsWith('*')) {
                    return <em key={index}>{part.slice(1, -1)}</em>;
                    }
                    if (part.startsWith('`') && part.endsWith('`')) {
                        return <code key={index} className="bg-muted text-foreground font-code px-1 py-0.5 rounded text-sm">{part.slice(1, -1)}</code>;
                    }
                    return <React.Fragment key={index}>{part}</React.Fragment>;
                });
            };

            return <p key={i} className="my-6 text-muted-foreground">{processInline(paragraph)}</p>;
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
             <>
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
              <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleCopy} variant="outline" disabled={isPublishing}>
                  <Copy className="mr-2 h-4 w-4" /> Copy Markdown
                </Button>
                <Button onClick={handlePublish} disabled={isPublishing}>
                  {isPublishing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  {isPublishing ? 'Publishing...' : 'Publish Post'}
                </Button>
              </div>
            </>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
}
