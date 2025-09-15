'use server';
/**
 * @fileOverview A flow for handling contact form submissions and suggesting replies.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message.'),
  email: z.string().email().describe('The email address of the sender.'),
  message: z.string().describe('The content of the message.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  suggestedReply: z.string().describe('A suggested reply to the message.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function processContactForm(input: ContactFormInput): Promise<ContactFormOutput> {
  const prompt = ai.definePrompt({
    name: 'contactFormReplyPrompt',
    input: { schema: ContactFormInputSchema },
    output: { schema: ContactFormOutputSchema },
    prompt: `You are a helpful assistant for a developer named Oluwadimimu Akinjo.
Your task is to draft a friendly and professional reply to an incoming message from their portfolio contact form.

The developer's persona is: passionate, skilled, and eager to connect with others in the tech community.

Here is the message you need to reply to:
- Name: {{{name}}}
- Email: {{{email}}}
- Message: {{{message}}}

Draft a reply that:
1.  Thanks them for their message.
2.  Addresses the main points of their message.
3.  Maintains a friendly and professional tone.
4.  Suggests a next step if appropriate (e.g., scheduling a call, continuing the conversation via email).

Keep the reply concise and to the point.
`,
  });

  const contactFormFlow = ai.defineFlow(
    {
      name: 'contactFormFlow',
      inputSchema: ContactFormInputSchema,
      outputSchema: ContactFormOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      return {
          suggestedReply: output!.suggestedReply
      };
    }
  );
  
  return contactFormFlow(input);
}
