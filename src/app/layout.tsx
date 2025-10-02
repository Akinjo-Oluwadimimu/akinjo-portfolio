import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/hooks/use-auth';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Oluwadimimu Akinjo',
  description: 'Portfolio of Oluwadimimu Akinjo – Computer Science graduate, web developer, and creator of innovative apps and solutions. Explore my projects and achievements.',
  authors: { name: 'Oluwadimimu Akinjo', url: 'https://dimimu.dev' },
  keywords: [
    'Oluwadimimu Akinjo',
    'Dimimu',
    'Portfolio',
    'Web Developer',
    'Software Engineer',
    'Projects',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Full-Stack Developer',
    'Open Source',
    'Tech Enthusiast'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Oluwadimimu Akinjo",
              "url": "https://dimimu.dev",
              "sameAs": [
                "https://www.linkedin.com/in/yourusername",
                "https://github.com/yourusername"
              ],
              "jobTitle": "Web Developer",
              "alumniOf": "Shenyang Aerospace University",
              "knowsAbout": [
                "Web Development",
                "JavaScript",
                "React",
                "Statistics",
                "Biostatistics"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Nigerian Airspace Management Agency (NAMA)"
              }
            }),
          }}
        />
      </head>
      <body className={cn("font-body antialiased", "min-h-screen bg-background")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
              <div className="relative flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
