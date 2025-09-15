'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getProjectById, Project, updateProject, addProject } from '@/lib/projects';
import { useRequireAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { slugify } from '@/lib/utils';
import { revalidatePage } from '@/lib/actions';

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Short description is required"),
  longDescription: z.string().min(1, "Full description is required"),
  image: z.string().url("Must be a valid URL"),
  imageHint: z.string().min(1, "Image hint is required"),
  technologies: z.string().min(1, "At least one technology is required"),
  repoUrl: z.string().url().optional().or(z.literal('')),
  liveUrl: z.string().url().optional().or(z.literal('')),
});

type ProjectFormData = z.infer<typeof projectSchema>;

export default function EditProjectPage() {
  useRequireAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const projectId = searchParams.get('id');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!projectId);

  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      description: '',
      longDescription: '',
      image: '',
      imageHint: '',
      technologies: '',
      repoUrl: '',
      liveUrl: '',
    },
  });

  useEffect(() => {
    if (projectId) {
      setIsFetching(true);
      getProjectById(projectId).then(p => {
        if (p) {
          form.reset({
            ...p,
            technologies: p.technologies.join(', '),
          });
        }
        setIsFetching(false);
      });
    }
  }, [projectId, form]);

  const onSubmit: SubmitHandler<ProjectFormData> = async (data) => {
    setIsLoading(true);
    const technologies = data.technologies.split(',').map(t => t.trim());
    const slug = slugify(data.title);

    try {
      if (projectId) {
         const projectToUpdate: Partial<Project> = {
            ...data,
            technologies,
            slug,
        };
        await updateProject(projectId, projectToUpdate);
        toast({ title: 'Project Updated', description: 'Your project has been successfully updated.' });
      } else {
        const newProject: Omit<Project, 'id'> = {
            ...data,
            technologies,
            slug,
        };
        await addProject(newProject);
        toast({ title: 'Project Created', description: 'Your new project has been successfully created.' });
      }

      // Revalidate relevant pages
      await revalidatePage('/projects');
      await revalidatePage(`/projects/${slug}`);
      await revalidatePage('/');

      router.push('/admin/projects');
      router.refresh();

    } catch (error) {
      console.error('Failed to save project', error);
      toast({ title: 'An error occurred.', description: (error as Error).message, variant: 'destructive'});
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">{projectId ? 'Edit Project' : 'Add New Project'}</CardTitle>
          <CardDescription>Fill out the form below to {projectId ? 'update the' : 'add a new'} project.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField name="title" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Short Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="longDescription" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Full Description</FormLabel><FormControl><Textarea {...field} rows={6} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="image" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} placeholder="https://picsum.photos/..."/></FormControl><FormMessage /></FormItem>
              )} />
               <FormField name="imageHint" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Image Hint</FormLabel><FormControl><Input {...field} placeholder="e.g. tech abstract" /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="technologies" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Technologies (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="repoUrl" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Repository URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="liveUrl" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Live Site URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {projectId ? 'Update Project' : 'Create Project'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
