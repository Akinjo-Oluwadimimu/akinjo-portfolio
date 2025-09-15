"use client"; // THIS ENSURES CLIENT-SIDE ONLY

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getPostById, Post, addPost, updatePost } from "@/lib/blog";
import { useRequireAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { slugify } from "@/lib/utils";
import { revalidatePage } from "@/lib/actions";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().url("Must be a valid URL"),
});

type PostFormData = z.infer<typeof postSchema>;

export default function EditPostClient() {
  useRequireAuth();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(!!postId);

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      image: "",
    },
  });

  useEffect(() => {
    if (postId) {
      setIsFetching(true);
      getPostById(postId).then((p) => {
        if (p) form.reset(p);
        setIsFetching(false);
      });
    }
  }, [postId, form]);

  const onSubmit: SubmitHandler<PostFormData> = async (data) => {
    setIsLoading(true);
    const slug = slugify(data.title);

    try {
      if (postId) {
        await updatePost(postId, { ...data, slug });
        toast({ title: "Post Updated", description: "Your post has been successfully updated." });
      } else {
        await addPost({ ...data, slug, date: new Date().toISOString() });
        toast({ title: "Post Created", description: "Your new post has been successfully created." });
      }

      await revalidatePage("/blog");
      await revalidatePage(`/blog/${slug}`);
      await revalidatePage("/");

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      toast({ title: "An error occurred.", description: (error as Error).message, variant: "destructive" });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl font-bold">{postId ? "Edit Post" : "Add New Post"}</CardTitle>
          <CardDescription>Fill out the form below to {postId ? "update the" : "add a new"} blog post.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField name="title" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="excerpt" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Excerpt</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="content" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Content (Markdown)</FormLabel><FormControl><Textarea {...field} rows={12} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="image" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Image URL</FormLabel><FormControl><Input {...field} placeholder="https://picsum.photos/..." /></FormControl><FormMessage /></FormItem>
              )} />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {postId ? "Update Post" : "Create Post"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
