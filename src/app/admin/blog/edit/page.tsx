// app/admin/blog/edit/page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';

// Dynamically import the client component with SSR disabled
const EditPostClient = dynamic(
  () => import('./EditPostClient'),
  { ssr: false }
);

export default function EditPostPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-16 md:py-24 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <EditPostClient />
    </Suspense>
  );
}
