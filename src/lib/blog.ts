import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export type Post = {
  id?: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
};

const postsCollection = collection(db, 'posts');

export const getPosts = async (): Promise<Post[]> => {
  const snapshot = await getDocs(postsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post)).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPost = async (slug: string): Promise<Post | null> => {
    const q = query(postsCollection, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Post;
};

export const getPostById = async (id: string): Promise<Post | null> => {
    const postDoc = await getDoc(doc(db, 'posts', id));
    if (!postDoc.exists()) {
        return null;
    }
    return { id: postDoc.id, ...postDoc.data() } as Post;
}

export const addPost = async (post: Omit<Post, 'id'>) => {
  return await addDoc(postsCollection, post);
};

export const updatePost = async (id: string, post: Partial<Post>) => {
  const postRef = doc(db, 'posts', id);
  return await updateDoc(postRef, post);
};

export const deletePost = async (id: string) => {
  const postRef = doc(db, 'posts', id);
  return await deleteDoc(postRef);
};


export const initialPosts: Omit<Post, 'id'>[] = [
  {
    slug: 'mastering-react-hooks',
    title: 'Mastering React Hooks',
    date: '2024-05-15',
    excerpt: 'A deep dive into React Hooks and how to use them effectively in your projects.',
    image: 'https://picsum.photos/seed/react/1200/800',
    content: `## Introduction to Hooks

React Hooks are functions that let you “hook into” React state and lifecycle features from function components.

### useState
\`useState\` is a Hook that lets you add React state to function components.

\`\`\`javascript
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

### useEffect
The Effect Hook, \`useEffect\`, lets you perform side effects in function components. Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
`,
  },
  {
    slug: 'tailwind-css-guide',
    title: 'A Guide to Tailwind CSS',
    date: '2024-04-22',
    excerpt: 'Learn how to speed up your web development process with Tailwind CSS.',
    image: 'https://picsum.photos/seed/tailwind/1200/800',
    content: `## Why Tailwind CSS?

Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.

### Core Concepts
Instead of pre-designed components, Tailwind provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.

\`\`\`html
<div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
  <div class="flex-shrink-0">
    <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo">
  </div>
  <div>
    <div class="text-xl font-medium text-black">ChitChat</div>
    <p class="text-gray-500">You have a new message!</p>
  </div>
</div>
\`\`\`

This approach makes it easy to create complex, responsive layouts without writing a lot of custom CSS.
`,
  },
];
