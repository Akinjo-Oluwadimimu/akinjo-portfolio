import { collection, getDocs, getDoc, doc, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
  blurDataURL: string;
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

export const addProject = async (project: Omit<Project, 'id'>) => {
  return await addDoc(projectsCollection, project);
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const projectRef = doc(db, 'projects', id);
  return await updateDoc(projectRef, project);
};

export const deleteProject = async (id: string) => {
  const projectRef = doc(db, 'projects', id);
  return await deleteDoc(projectRef);
};
