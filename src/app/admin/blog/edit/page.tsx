import EditPostClient from './EditPostClient';
import { Suspense } from 'react';

export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPostClient />
    </Suspense>
  );
}