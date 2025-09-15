'use server';

import { revalidatePath } from 'next/cache';

// This function is called from client-side mutations to revalidate paths
// after a successful database operation.
export async function revalidatePage(path: string) {
  revalidatePath(path);
}
