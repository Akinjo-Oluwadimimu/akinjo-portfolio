'use client';

import { processContactForm, type ContactFormInput } from '@/ai/flows/contact-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';

const ContactFormInputSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(1, 'Message is required.'),
});

type FormData = z.infer<typeof ContactFormInputSchema>;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedReply, setSuggestedReply] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(ContactFormInputSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setSuggestedReply('');
    try {
      const result = await processContactForm(data);
      setSuggestedReply(result.suggestedReply);
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error processing contact form:', error);
      // You could show a toast notification here
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center">AI-Powered Contact Form</CardTitle>
            <CardDescription className="text-center pt-2">
                {formSubmitted ? "Here's an AI-suggested reply to your message." : "Send a message and see how AI can draft a reply for me."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formSubmitted ? (
                <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><Sparkles className="w-4 h-4 mr-2 text-primary"/> Suggested Reply:</h3>
                    <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap border">
                        <p>{suggestedReply}</p>
                    </div>
                    <Button onClick={() => { setFormSubmitted(false); form.reset(); }} className="mt-4">Send another message</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Your message..." {...field} rows={5}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Analyzing...' : 'Send Message & See AI Magic'}
                  </Button>
                </form>
              </Form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
