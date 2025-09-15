import { getPosts } from '@/lib/blog';
import { format } from 'date-fns';

export const revalidate = 0; // Revalidate the page on every request

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto px-4">
      <section className="py-12 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="mb-16 text-left">
            <div className="flex items-center justify-start gap-2 mb-3">
              <div className="w-1.5 h-1.5 bg-primary"></div>
              <span className="text-sm font-semibold uppercase tracking-widest">
                Blog
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-headline">
              Collected Blog Posts
            </h2>
          </div>

          {/* Notes List */}
          <div className="grid gap-8">
          {posts.map((post) => (
            <a
              href={`/blog/${post.slug}`}
              key={post.slug}
              className="group grid lg:grid-cols-12 gap-16 items-start border-b pb-8 last:border-b-0"
            >
              {/* Image */}
              <div className="relative md:col-span-4 overflow-hidden">
                <img
                  src="https://cdn.prod.website-files.com/6881d6b6d2b42e95fee28187/6881d6b6d2b42e95fee2825a_note-04-thumb.webp"
                  alt={post.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
              </div>

              {/* Info */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
                  </div>
                  <h2 className="mt-2 text-xl lg:text-4xl tracking-wide font-semibold transition">
                    {post.title}
                  </h2>
                  <p className="mt-6 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer link */}
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition">
                  <span className="inline-flex items-center gap-2 font-medium">
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M27.7,16.7l-9,9c-0.4,0.4-1,0.4-1.4,0s-0.4-1,0-1.4l7.3-7.3H5c-0.6,0-1-0.4-1-1s0.4-1,1-1h19.6l-7.3-7.3c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l9,9C28.1,15.7,28.1,16.3,27.7,16.7z" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>


        </div>
      </section>

    </div>
  );
}
