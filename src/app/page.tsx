import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Bot, Code, PenSquare, Quote } from 'lucide-react';
import Image from 'next/image';
import { getProjects } from '@/lib/projects';
import { getPosts } from '@/lib/blog';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import LatestProjects from "./HomeClient";

const services = [
  {
    icon: <Code className="w-8 h-8 text-primary" />,
    title: 'Web Development',
    description: 'Building responsive and high-performance websites using modern technologies like Next.js and React.',
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: 'AI Integration',
    description: 'Integrating generative AI and machine learning models to create smart, interactive applications.',
  },
  {
    icon: <PenSquare className="w-8 h-8 text-primary" />,
    title: 'UI/UX Design',
    description: 'Designing user-centric and aesthetically pleasing interfaces with a focus on user experience.',
  },
];

const testimonials = [
  {
    excerpt: 'A calm, structured collaboration',
    quote: 'Working with her was a game-changer. Her expertise in modern web technologies is unmatched, and she delivered a product that exceeded all our expectations. Highly recommended!',
    name: 'Ovansa Emmanuel',
    title: 'Tech Innovators',
    avatar: '',
  },
  {
    excerpt: 'Exactly what we needed',
    quote: 'The level of professionalism and the quality of the end result were outstanding. She is not just a developer, but a true partner in building a successful product.',
    name: 'Denis',
    title: 'Product Manager',
    avatar: '',
  },
    {
      excerpt: 'Design that works beautifully',
      quote: "I'm incredibly impressed with the AI-powered features she implemented. It has added a whole new level of engagement to our platform. A truly forward-thinking developer.",
      name: 'Thuch Angui',
      title: 'Founder, AI StartHub',
      avatar: '',
  },
];

export default async function Home() {

  const allProjects = await getProjects();
  const allPosts = await getPosts();
  
  const latestPosts = allPosts.slice(0, 2);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-24 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    Full-Stack Developer & AI Enthusiast
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    I build beautiful, responsive, and intelligent web applications. Passionate about modern web technologies and creating delightful user experiences.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/projects">
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                      Get in Touch
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                src="/hero2.jpeg"
                width="600"
                height="600"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="developer abstract"
              />
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-32 px-6 md:px-12  bg-color-dark-200">
          <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
            {/* Tagline */}
            <div 
              className="col-span-12 lg:col-span-3 flex items-start"
            >
              <div className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary"></div>
                <div className="uppercase tracking-widest text-sm">Introduction</div>
              </div>
            </div>

            {/* Intro Content */}
            <div className="col-span-12 lg:col-span-9 space-y-16">
              {/* Quote */}
              <p
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-snug"
              >
                &quot;I believe great software starts with listening — to users, to context, to what isn&apos;t yet obvious.&quot;
              </p>

              {/* Description */}
              <p
                className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-base sm:text-lg md:text-xl"
              >
                Development isn&apos;t just building software — it&apos;s creating clarity, flow, and solutions that matter.
              </p>

              <div>
                <Link
                  href="/about"
                  className="group inline-flex items-center py-3 pr-2 relative overflow-hidden"
                >
                  <span className="relative z-10 font-medium text-sm uppercase tracking-wide">More About Me</span>

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
          </div>
        </section>

        {/* Services Section */}
<section className="relative w-full py-24 md:py-32 bg-[url('/images/services-bg.jpg')] bg-cover bg-center">
  {/* Optional Overlay */}
  <div className="absolute inset-0 bg-black/70"></div>

  <div className="relative container mx-auto px-4 md:px-6 z-10">
    {/* Section Heading */}
    <div className="flex flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-white">
          What I Do
        </h2>
        <p className="max-w-[900px] text-gray-200 md:text-xl leading-relaxed">
          From crafting elegant user interfaces to building robust backend systems and integrating intelligent features, here&apos;s how I can help you.
        </p>
      </div>
    </div>

    {/* Services Grid */}
    <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12">
      {services.map((service, index) => (
        <div
          key={index}
          className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-white/10 hover:bg-primary/10 transition-all shadow-md"
        >
          <div className="text-primary text-4xl">{service.icon}</div>
          <h3 className="text-xl font-bold text-white text-center">{service.title}</h3>
          <p className="text-gray-200 text-center">{service.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


        <LatestProjects />

        {/* Testimonials Section */}
        <section className="w-full py-24 md:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="max-w-4xl mx-auto text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 bg-primary"></div>
                <span className="text-sm uppercase tracking-wider font-medium">
                  Testimonials
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold">
                What My Customers Say
              </h2>
            </div>
            <div className="grid w-full grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-color-dark-200 rounded-none p-6 text-left flex flex-col justify-between">
                  <div>
                    <Quote className="w-8 h-8 text-primary mb-4" />
                    <p className="text-lg">&quot;{testimonial.quote}&quot;</p>
                  </div>
                  <div className="mt-6 flex items-center gap-4">
                     <Avatar className="h-12 w-12">
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="relative w-full py-24 lg:py-40 lg:px-12 bg-[url('https://ztnyuecbojebmzlwthft.supabase.co/storage/v1/object/public/quickshare-uploads/user-uploads/1757692697522-d1a92f173d4bffffefe6aee50a3fd003.jpg')] bg-cover bg-center overflow-hidden">
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/5" />

          {/* Content */}
          <div className="relative container mx-auto px-4 lg:px-6 z-10 flex flex-col gap-12">
            
            {/* Row 1: Tagline + Heading */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                <div className="w-1.5 h-1.5 bg-primary"></div>
                <span className="text-sm font-semibold uppercase tracking-widest text-white">
                  Start Project
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold text-white tracking-wide">
                Let’s Build <br /> Something Great
              </h2>
            </div>

            {/* Row 2: Description + Button (aligned right, but start inside) */}
            <div className="flex flex-col items-center text-center lg:items-end lg:text-left">
              <div className="max-w-lg lg:self-end w-full">
                <p className="text-lg lg:text-xl tracking-tighter lg:tracking-normal text-gray-200">
                  I’m always open to thoughtful collaborations — let’s talk about your next idea.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center py-3 pr-2 relative overflow-hidden text-white"
                  >
                    <span className="relative z-10 font-medium text-sm uppercase tracking-wide">Get in Touch</span>

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
            </div>

          </div>
        </section>


        <section className="articles py-24 md:py-32 lg:px-12 px-4">
          <div className="container mx-auto px-4 md:px-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-16">
              {/* Tagline + Heading */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 bg-primary"></div>
                  <span className="text-sm font-semibold uppercase tracking-widest">
                    From the Blog
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-6xl lg:max-w-lg sm:max-w-xs font-bold font-headline">
                  Thoughts Behind the Work
                </h2>
              </div>

              {/* Button */}
              <div>
                <Link
                  href="/blog"
                  className="group inline-flex items-center py-3 pr-2 relative overflow-hidden"
                >
                  <span className="relative z-10 font-medium text-sm uppercase tracking-wide">Browse all Posts</span>

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

            {/* Articles Grid */}
            <div className="grid gap-3 lg:grid-cols-3">
              {latestPosts.map((post) => (
              <a
                href={`/blog/${post.slug}`} key={post.slug}
                className="group block overflow-hidden transition mb-10 lg:mb-0"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src="https://cdn.prod.website-files.com/6881d6b6d2b42e95fee28187/6881d6b6d2b42e95fee2825a_note-04-thumb.webp"
                    alt={post.title}
                    className="w-full lg:h-56 h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
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

                {/* Meta */}
                <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                </div>

                {/* Title */}
                <h3 className="mt-2 text-xl font-semibold transition">
                  {post.title}
                </h3>
              </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
