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
import { useRequireAuth } from '@/hooks/use-auth';

const ContactFormInputSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Invalid email address.'),
  message: z.string().min(1, 'Message is required.'),
});

type FormData = z.infer<typeof ContactFormInputSchema>;

export default function ContactResponderPage() {
  useRequireAuth();
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
            <CardTitle className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl text-center">AI Contact Responder</CardTitle>
            <CardDescription className="text-center pt-2">
                {formSubmitted ? "Here's an AI-suggested reply to the message." : "Enter the details from a message you received and let AI draft a reply."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {formSubmitted ? (
                <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center"><Sparkles className="w-4 h-4 mr-2 text-primary"/> Suggested Reply:</h3>
                    <div className="p-4 bg-muted/50 rounded-lg whitespace-pre-wrap border">
                        <p>{suggestedReply}</p>
                    </div>
                    <Button onClick={() => { setFormSubmitted(false); form.reset(); }} className="mt-4">Draft another reply</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sender's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Their Name" {...field} />
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
                        <FormLabel>Sender's Email</FormLabel>
                        <FormControl>
                          <Input placeholder="their.email@example.com" {...field} />
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
                        <FormLabel>Sender's Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="The message they sent..." {...field} rows={5}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Analyzing...' : 'Generate Reply'}
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
