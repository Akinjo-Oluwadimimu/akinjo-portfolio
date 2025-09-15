'use server';
/**
 * @fileOverview A flow for generating blog post drafts.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const BlogGeneratorInputSchema = z.object({
  topic: z.string().describe('The topic for the blog post.'),
});
export type BlogGeneratorInput = z.infer<typeof BlogGeneratorInputSchema>;

const BlogGeneratorOutputSchema = z.object({
  title: z.string().describe('A catchy title for the blog post.'),
  content: z.string().describe('The full content of the blog post, formatted in Markdown.'),
});
export type BlogGeneratorOutput = z.infer<typeof BlogGeneratorOutputSchema>;

export async function generateBlogPost(input: BlogGeneratorInput): Promise<BlogGeneratorOutput> {
  const prompt = ai.definePrompt({
    name: 'blogGeneratorPrompt',
    input: { schema: BlogGeneratorInputSchema },
    output: { schema: BlogGeneratorOutputSchema },
    prompt: `You are an expert tech blogger specializing in web development.
Your task is to write a short, engaging blog post about the following topic: {{{topic}}}.

The blog post should:
1.  Have a catchy title.
2.  Be well-structured with an introduction, a main body, and a conclusion.
3.  Use Markdown for formatting (e.g., ## for headings, \`\`\` for code blocks).
4.  If the topic allows, include a small, relevant code snippet.
5.  Maintain a tone that is informative, accessible, and enthusiastic.
6.  The entire post should be around 300-400 words.
`,
  });

  const blogGeneratorFlow = ai.defineFlow(
    {
      name: 'blogGeneratorFlow',
      inputSchema: BlogGeneratorInputSchema,
      outputSchema: BlogGeneratorOutputSchema,
    },
    async (input) => {
      const { output } = await prompt(input);
      return output!;
    }
  );

  return blogGeneratorFlow(input);
}
