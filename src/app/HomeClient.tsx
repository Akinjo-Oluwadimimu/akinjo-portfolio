import { clsx } from 'clsx'
import { Badge } from '@/components/ui/badge';
import { getProjects, Project } from '@/lib/projects';
import Link from 'next/link';


export default async function LatestProjects() {
  const allProjects = await getProjects();
  
  const latestProjects = allProjects.slice(0, 3);

  return (
    <section className="relative">
      {/* Mobile + Tablet Layout */}
      <div className="lg:hidden pt-20 pb-10">
        {/* Left Column (sticky full height for all screen sizes) */}
        <div
            className="sticky top-0 pt-20 pb-20 flex flex-col justify-center px-6 md:px-12 xl:px-20 bg-color-dark-200 z-10"
        >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-1.5 h-1.5 bg-primary"></div>
              <div className="uppercase tracking-widest text-sm">Latest Projects</div>
            </div>
            <p className="text-3xl md:text-5xl font-serif tracking-wider [word-spacing:0.3em] font-medium mb-12">Code That Lasts</p>
            <p className="mb-12 text-lg">
            Every project is crafted with focus, intention, and care. My goal is software that feels clear, performs reliably, and remains meaningful beyond the moment.
            </p>
            <div>
              <Link
                href="/projects"
                className="group inline-flex items-center py-3 pr-2 relative overflow-hidden"
              >
                <span className="relative z-10 font-medium text-sm uppercase tracking-wide">View all projects</span>

                {/* Arrow Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" 
                className="ml-2 w-5 h-5 relative z-10 transform -rotate-45 
                            group-hover:rotate-0 transition-transform duration-300" 
                fill="currentcolor" 
                viewBox="0 0 256 256">
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
                {/* Hover underline */}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500"></span>
              </Link>
            </div>
        </div>

        {/* Right Column (scrollable projects) */}
        <div className="relative z-20">
            {latestProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} total={latestProjects.length} />
            ))}
        </div>
      </div>


      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 relative min-h-[300vh]">
        {/* Left Column */}
        <div
            className="sticky top-0 h-screen flex flex-col justify-center px-7 xl:px-14 bg-color-dark-200 z-10"
        >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-1.5 h-1.5 bg-primary"></div>
              <div className="uppercase tracking-widest text-sm">Latest Projects</div>
            </div>
            <p className="text-5xl md:text-7xl font-serif tracking-wider [word-spacing:0.3em] font-medium mb-12">Code That Lasts</p>
            <p className="mb-12 py-4 max-w-lg text-xl">
                Every project is crafted with focus, intention, and care. My goal is software that feels clear, performs reliably, and remains meaningful beyond the moment.
            </p>
            <div>
                <Link
                  href="/projects"
                  className="group inline-flex items-center py-3 pr-2 relative overflow-hidden"
                >
                  <span className="relative z-10 font-medium text-sm uppercase tracking-wide">View all projects</span>

                  {/* Arrow Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  className="ml-2 w-5 h-5 relative z-10 transform -rotate-45 
                              group-hover:rotate-0 transition-transform duration-300" 
                  fill="currentcolor" 
                  viewBox="0 0 256 256">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path></svg>
                  {/* Hover underline */}
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-500"></span>
                </Link>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative">
              {latestProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} total={latestProjects.length} />
            ))}
            </div>
        </div>
    </section>
  );
}

type ProjectCardProps = {
  project: Project;
  index: number;
  total: number;
};


function ProjectCard({ project, index, total }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={clsx(
        "group h-screen flex flex-col justify-end relative px-6 xl:px-12 overflow-hidden", // group needed for hover effects
        {
          "mb-1": index !== total - 1,
        }
      )}
    >
      {/* Background/Image with zoom effect */}
      <div className="absolute inset-0">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" // zoom on hover
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Top-right icon */}
      <div className="absolute top-10 right-10 lg:right-16 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7 lg:w-9 lg:h-9 transform -rotate-45 transition-transform duration-300 text-white"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
          </svg>
        </div>
      </div>


      {/* Project Details at Bottom */}
      <div className="relative z-10 text-white pb-16">
        <h2 className="text-4xl font-medium tracking-wide">{project.title}</h2>
        <div className="mt-2 flex flex-wrap gap-4">
          {project.technologies.map((tag) => (
            <Badge key={tag} className="tracking-widest" variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}

