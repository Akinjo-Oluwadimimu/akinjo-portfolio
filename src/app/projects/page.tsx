import { getProjects } from '@/lib/projects';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const revalidate = 0; // Revalidate the page on every request

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="container mx-auto px-4 py-16 md:py-16">
      <section className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          My Projects
        </h1>
        <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          A selection of projects shaped by clarity, collaboration, and purpose. Dive in to see the details.
        </p>
      </section>

      <section className="projects py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-3 md:grid-cols-1 lg:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.slug}
                className="relative group overflow-hidden shadow-lg"
              >
                {/* Project Link */}
                <a href={`/projects/${project.slug}`} aria-label={`See project ${project.title}`}>
                  {/* Project Image */}
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[400px] object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h2 className="text-2xl font-bold">{project.title}</h2>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((tag) => (
                        <Badge key={tag} className="tracking-widest" variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </a>

                {/* Hover Arrow */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-10 h-10 bg-primary flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white transform -rotate-45 transition-transform duration-300"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
