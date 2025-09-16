import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Github, Linkedin, Mail, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
  <section className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
    <div className="order-1 lg:order-2 lg:col-span-1 flex flex-col items-center lg:items-start">
      <Avatar className="h-[220px] w-[220px] sm:h-[260px] sm:w-[260px] lg:h-[300px] lg:w-[300px] xl:h-[320px] xl:w-[320px] rounded-xl overflow-hidden shadow-lg mx-auto lg:mx-0">
        <AvatarImage
          src="/hero.jpeg"
          alt="My photo"
          className="h-full w-full object-cover"
        />
      </Avatar>

      <div className="hidden lg:flex mt-8 w-full justify-center lg:justify-start">
        <div className="flex flex-col gap-5 w-full">
          <Link
            href="https://github.com/Akinjo-Oluwadimimu"
            target="_blank"
            rel="noreferrer"
            className="social-link flex items-center gap-3 text-muted-foreground transition-all hover:text-primary text-sm"
          >
            <Github className="h-5 w-5" />
            <span className="font-medium">Follow on GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/oluwadimimuakinjo"
            target="_blank"
            rel="noreferrer"
            className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
          >
            <Linkedin className="h-5 w-5" />
            <span className="font-medium">Follow on LinkedIn</span>
          </Link>
          <Link
            href="https://instagram.com/motolani_ak"
            target="_blank"
            rel="noreferrer"
            className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-medium">Follow on Instagram</span>
          </Link>
          <Link
            href="https://x.com/dimimuakinjo"
            target="_blank"
            rel="noreferrer"
            className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
          >
            <Twitter className="h-5 w-5" />
            <span className="font-medium">Follow on Twitter</span>
          </Link>
          <a
            href="mailto:motolanioluwadimimu@gmail.com"
            className="social-link flex items-center border-t pt-5 gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
          >
            <Mail className="h-5 w-5" />
            <span className="font-medium">motolanioluwadimimu@gmail.com</span>
          </a>
        </div>
      </div>
    </div>

    <div className="order-2 md:order-1 md:col-span-2 max-w-3xl lg:pr-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
        I&apos;m <span className="text-primary">Oluwadimimu Akinjo</span>, but most people just call me Didi.
      </h1>

      <div className="mt-8 space-y-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
        <p>
          I&apos;ve always been fascinated by how ideas can turn into something tangible, from sketching little concepts as a kid to now building software that people actually use.
        </p>
        <p>
          My journey in tech has taken me through classrooms in Nigeria and lecture halls in China, where I studied Computer Science and discovered how much I enjoy shaping technology that solves real problems.
        </p>
        <p>
          What excites me most isn&apos;t just writing code; it&apos;s seeing someone interact with what I&apos;ve built and realizing it makes their day a little easier. That moment is what keeps me learning, experimenting, and refining.
        </p>
        <p>
          Outside of coding, I&apos;m curious about cultures, languages, and creativity in all forms. I enjoy music that makes you move, conversations that spark new ideas, and exploring spaces where art and technology meet.
        </p>
        <p>
          For me, development is both craft and storytelling, and I try to leave a bit of that personal spark in every project I work on.
        </p>
      </div>
    </div>

    {/* MOBILE socials: visible only on small screens and placed after the text */}
    <div className="order-3 lg:hidden w-full mt-6 pb-12">
      <div className="flex flex-col gap-5 w-full">
          <Link
            href="https://github.com/Akinjo-Oluwadimimu"
            target="_blank"
            rel="noreferrer"
            className="social-link flex items-center gap-3 text-muted-foreground transition-all hover:text-primary text-sm"
          >
            <Github className="h-5 w-5" />
            <span className="font-medium">Follow on GitHub</span>
          </Link>
          <Link
            href="https://www.linkedin.com/in/oluwadimimuakinjo"
            target="_blank"
            rel="noreferrer"
            className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
          >
            <Linkedin className="h-5 w-5" />
            <span className="font-medium">Follow on LinkedIn</span>
          </Link>
          <Link
            href="https://instagram.com/motolani_ak"
            target="_blank"
            rel="noreferrer"
            className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
          >
            <Instagram className="h-5 w-5" />
            <span className="font-medium">Follow on Instagram</span>
          </Link>
          <Link
            href="https://x.com/dimimuakinjo"
            target="_blank"
            rel="noreferrer"
            className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
          >
            <Twitter className="h-5 w-5" />
            <span className="font-medium">Follow on Twitter</span>
          </Link>
          <a
            href="mailto:motolanioluwadimimu@gmail.com"
            className="social-link flex items-center border-t pt-5 gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
          >
            <Mail className="h-5 w-5" />
            <span className="font-medium">motolanioluwadimimu@gmail.com</span>
          </a>
        </div>
    </div>
  </section>
</div>

  );
}
