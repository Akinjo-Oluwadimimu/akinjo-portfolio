'use client';
import { useRequireAuth } from '@/hooks/use-auth';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, PenSquare, BookOpen, Briefcase, MessagesSquare } from 'lucide-react';
import Link from 'next/link';

export default function AdminPage() {
    useRequireAuth();

    return (
        <div className="container mx-auto px-4 py-16 md:py-24">
            <section className="text-center">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    Admin Dashboard
                </h1>
                <p className="mx-auto mt-6 max-w-[700px] text-lg text-muted-foreground md:text-xl">
                    Welcome! Here you can manage your content and use AI-powered tools.
                </p>
            </section>

             <section className="mt-16">
                <h2 className="font-headline text-3xl font-bold mb-8 text-center">Manage Your Content</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    <Link href="/admin/projects" className="group">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                           <CardHeader>
                                <div className="mb-4"><Briefcase className="w-8 h-8 text-primary" /></div>
                                <CardTitle className="group-hover:text-primary transition-colors">Manage Projects</CardTitle>
                                <CardDescription className="pt-2">Add, edit, or delete your project listings.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/admin/blog" className="group">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                            <CardHeader>
                                <div className="mb-4"><BookOpen className="w-8 h-8 text-primary" /></div>
                                <CardTitle className="group-hover:text-primary transition-colors">Manage Blog Posts</CardTitle>
                                <CardDescription className="pt-2">Create new blog posts or manage existing ones.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                    <Link href="/admin/contacts" className="group">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                            <CardHeader>
                                <div className="mb-4"><MessagesSquare className="w-8 h-8 text-primary" /></div>
                                <CardTitle className="group-hover:text-primary transition-colors">View Messages</CardTitle>
                                <CardDescription className="pt-2">See messages submitted through the contact form.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>

             <section className="mt-16">
                <h2 className="font-headline text-3xl font-bold mb-8 text-center">AI Tools</h2>
                 <div className="grid gap-8 md:grid-cols-2">
                    <Link href="/admin/blog-generator" className="group">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                            <CardHeader>
                                <div className="mb-4"><PenSquare className="w-8 h-8 text-primary" /></div>
                                <CardTitle className="group-hover:text-primary transition-colors">Blog Post Generator</CardTitle>
                                <CardDescription className="pt-2">Watch AI draft a blog post on any web development topic.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                     <Link href="/admin/contact-responder" className="group">
                        <Card className="h-full transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                            <CardHeader>
                                <div className="mb-4"><Mail className="w-8 h-8 text-primary" /></div>
                                <CardTitle className="group-hover:text-primary transition-colors">Contact Responder</CardTitle>
                                <CardDescription className="pt-2">Get in touch and see how AI can draft a reply for me instantly.</CardDescription>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </section>
        </div>
    );
}
