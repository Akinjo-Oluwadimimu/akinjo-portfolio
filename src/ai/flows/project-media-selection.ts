'use server';

/**
 * @fileOverview Determines the optimal types of media to showcase a project based on its description.
 *
 * - selectProjectMedia - A function that handles the media selection process.
 * - SelectProjectMediaInput - The input type for the selectProjectMedia function.
 * - SelectProjectMediaOutput - The return type for the selectProjectMedia function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectProjectMediaInputSchema = z.object({
  projectDescription: z
    .string()
    .describe('A detailed description of the project, its goals, and technologies used.'),
});
export type SelectProjectMediaInput = z.infer<typeof SelectProjectMediaInputSchema>;

const SelectProjectMediaOutputSchema = z.object({
  mediaTypes: z
    .array(z.string())
    .describe(
      'An array of media types recommended to showcase the project (e.g., screenshots, video demo, link to code repository, interactive demo).'
    ),
  reasoning: z
    .string()
    .describe('Explanation of why each media type was chosen, based on the project description.'),
});
export type SelectProjectMediaOutput = z.infer<typeof SelectProjectMediaOutputSchema>;

export async function selectProjectMedia(input: SelectProjectMediaInput): Promise<SelectProjectMediaOutput> {
  return selectProjectMediaFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectProjectMediaPrompt',
  input: {schema: SelectProjectMediaInputSchema},
  output: {schema: SelectProjectMediaOutputSchema},
  prompt: `You are an expert in creating compelling developer portfolios. Given a project description, you will determine the optimal types of media to showcase the project in a portfolio. Consider the project's goals, technologies used, and target audience. Provide a reasoning for each media type selected.

Project Description: {{{projectDescription}}}

Based on the project description, recommend specific media types to include in the project showcase (e.g., "screenshots", "video demo", "link to code repository", "interactive demo"). Also, explain why each media type is suitable.

Format your response as a JSON object with 'mediaTypes' (an array of strings representing the selected media types) and 'reasoning' (a string explaining the choices).`,
});

const selectProjectMediaFlow = ai.defineFlow(
  {
    name: 'selectProjectMediaFlow',
    inputSchema: SelectProjectMediaInputSchema,
    outputSchema: SelectProjectMediaOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
