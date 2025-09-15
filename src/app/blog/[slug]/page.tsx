import { getPost } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';

export const revalidate = 0; // Revalidate the page on every request

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } =  params
  const post = await getPost(slug);

  if (!post) {
    notFound();
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
      <article className="mx-auto max-w-3xl">
        <header className="mb-12 text-center">
            <p className="text-sm text-muted-foreground">
                Published on {format(new Date(post.date), 'MMMM d, yyyy')}
            </p>
          <h1 className="font-headline mt-2 text-4xl font-bold tracking-tighter sm:text-5xl">
            {post.title}
          </h1>
        </header>

        <div className="relative mb-12 h-96 w-full rounded-lg shadow-lg overflow-hidden">
            <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                data-ai-hint="tech blog"
                priority
            />
        </div>

        <div className="font-inter text-lg leading-relaxed">
          {renderMarkdown(post.content)}
        </div>
      </article>
    </div>
  );
}
