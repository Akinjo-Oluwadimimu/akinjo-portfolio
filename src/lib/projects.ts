import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { getPlaiceholder } from "plaiceholder";

export type Project = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  imageHint: string;
  technologies: string[];
  repoUrl?: string;
  liveUrl?: string;
  blurDataURL?: string;
};

const projectsCollection = collection(db, 'projects');

export const getProjects = async (): Promise<Project[]> => {
  const snapshot = await getDocs(projectsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getProject = async (slug: string): Promise<Project | null> => {
    const q = query(projectsCollection, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Project;
};


export const getProjectById = async (id: string): Promise<Project | null> => {
  const projectDoc = await getDoc(doc(db, 'projects', id));
  if (!projectDoc.exists()) {
    return null;
  }
  return { id: projectDoc.id, ...projectDoc.data() } as Project;
}

async function generateBlur(imageUrl: string) {
  const buffer = await fetch(imageUrl).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const { base64 } = await getPlaiceholder(buffer);
  return base64;
}

export const addProject = async (project: Omit<Project, 'id'>) => {
  const blurDataURL = await generateBlur(project.image);
  return await addDoc(projectsCollection, {
    ...project,
    blurDataURL,
  });
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const projectRef = doc(db, 'projects', id);
  let updated = { ...project };

  if (project.image) {
    // re-generate blur if image changes
    updated.blurDataURL = await generateBlur(project.image);
  }

  return await updateDoc(projectRef, updated);
};

export const deleteProject = async (id: string) => {
  const projectRef = doc(db, 'projects', id);
  return await deleteDoc(projectRef);
};

// Initial data if collection is empty
export const initialProjects: Omit<Project, 'id'>[] = [
  {
    slug: 'e-commerce-platform',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce website with user authentication, product catalog, and Stripe integration.',
    longDescription: 'This project is a feature-rich e-commerce platform built with Next.js and Firebase. It includes functionalities like user accounts, browsing products by category, a shopping cart, and a complete checkout process using Stripe. The frontend is built with Tailwind CSS for a modern, responsive design. The backend uses Firebase for authentication and database management, with serverless functions for handling payments and other sensitive operations.',
    image: 'https://picsum.photos/seed/ecom/1200/800',
    imageHint: 'e-commerce website',
    technologies: ['Next.js', 'React', 'TypeScript', 'Firebase', 'Stripe', 'Tailwind CSS'],
    repoUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    slug: 'task-management-app',
    title: 'Task Management App',
    description: 'A Kanban-style task management application with drag-and-drop functionality.',
    longDescription: 'A responsive and interactive task management application inspired by Trello. Users can create boards, lists, and cards to organize their tasks. The app features real-time updates and drag-and-drop functionality for moving tasks between lists. It\'s a purely front-end application built with React and uses the browser\'s local storage to persist data, making it a great showcase of complex UI interactions and state management.',
    image: 'https://picsum.photos/seed/task/1200/800',
    imageHint: 'task management',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Local Storage'],
    repoUrl: 'https://github.com',
  },
  {
    slug: 'portfolio-generator',
    title: 'AI Portfolio Generator',
    description: 'A tool that uses generative AI to help developers create portfolio content.',
    longDescription: 'This is a web application that leverages a large language model (LLM) to help developers write compelling descriptions for their projects. The user provides a few bullet points about their project, and the AI generates a well-structured and professional-sounding project summary. This project demonstrates the practical application of generative AI through a simple and useful tool. It is built with Next.js and uses a custom-trained Genkit flow.',
    image: 'https://picsum.photos/seed/ai/1200/800',
    imageHint: 'portfolio generator',
    technologies: ['Next.js', 'GenAI', 'Genkit', 'Tailwind CSS'],
    repoUrl: 'https://github.com',
    liveUrl: 'https://example.com',
  },
  {
    slug: 'social-media-dashboard',
    title: 'Social Media Dashboard',
    description: 'A dashboard to monitor social media analytics and engagement.',
    longDescription: 'This dashboard provides real-time analytics for various social media platforms. It features charts and graphs to visualize data such as follower growth, engagement rates, and post performance. The application is built with React and uses a mock API to simulate data fetching, showcasing data visualization and component-based architecture skills.',
    image: 'https://picsum.photos/seed/social/1200/800',
    imageHint: 'social dashboard',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Recharts'],
    repoUrl: 'https://github.com',
  },
];
