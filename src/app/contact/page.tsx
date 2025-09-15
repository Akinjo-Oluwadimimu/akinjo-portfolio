'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Linkedin, Mail, Instagram, Twitter } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { addContact } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      await addContact(data);
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      console.error('Failed to send message', error);
      toast({ title: 'An error occurred.', description: 'Could not send your message. Please try again.', variant: 'destructive'});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <section className="py-12">
        <div className="text-left">
            <div className="flex items-center justify-start gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-primary"></div>
              <span className="text-sm font-semibold uppercase tracking-widest">
                Contact
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-headline">
              Let&apos;s make Something Thoughtful
            </h2>
        </div>
      </section>

      {/* Contact Section */}
      <section className="lg:py-12">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Let&apos;s talk</h2>
            <p className="text-lg text-muted-foreground">
              Whether you&apos;re planning a new brand or refining an existing one — I&apos;d love to hear what
              you&apos;re working on.
            </p>

            {/* Socials */}
            <div className="flex gap-4">
                <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
                >
                    <Linkedin className="h-5 w-5" />
                </Link>
                <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
                >
                    <Instagram className="h-5 w-5" />
                </Link>
                <Link
                    href="https://twitter.com"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link flex items-center gap-3 text-muted-foreground hover:text-primary transition-all text-sm"
                >
                    <Twitter className="h-5 w-5" />
                </Link>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-7">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField name="name" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Name</FormLabel><FormControl><Input {...field} placeholder="Your Name" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="email" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input {...field} placeholder="your.email@example.com" type="email" /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="message" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Message</FormLabel><FormControl><Textarea {...field} placeholder="Your message..." rows={6} /></FormControl><FormMessage /></FormItem>
                )} />
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Message <Mail className="ml-2 h-4 w-4" />
                </Button>
                </form>
            </Form>
          </div>
        </div>
        </section>
        <AlertDialog open={isSuccess} onOpenChange={setIsSuccess}>
            <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Message Sent!</AlertDialogTitle>
                <AlertDialogDescription>
                Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogAction onClick={() => setIsSuccess(false)}>Close</AlertDialogAction>
            </AlertDialogContent>
        </AlertDialog>
    </div>
  );
}
