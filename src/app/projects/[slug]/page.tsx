import { getProject } from '@/lib/projects';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const revalidate = 0; // Revalidate the page on every request

export default async function ProjectDetailsPage({params,}: {  params: Promise<{ slug: string }>}) {
  const { slug } = await params
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center">
          {project.title}
        </h1>
        
        <div className="mt-8 relative aspect-video w-full rounded-lg shadow-lg border overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint={project.imageHint}
            priority
          />
        </div>
        
        <div className="mt-8 text-center">
            {project.repoUrl && (
                <Button asChild className="mr-4">
                  <Link href={project.repoUrl} target="_blank">
                    <Code className="mr-2 h-4 w-4" /> View Code
                  </Link>
                </Button>
            )}
            {project.liveUrl && (
                 <Button asChild variant="secondary">
                  <Link href={project.liveUrl} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> View Live Site
                  </Link>
                </Button>
            )}
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">About the project</h2>
            <p className="text-lg text-muted-foreground whitespace-pre-wrap">{project.longDescription}</p>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
