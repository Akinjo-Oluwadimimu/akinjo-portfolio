import { MetadataRoute } from 'next'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '@/lib/firebase.admin' 

export const dynamic = "force-dynamic"; 

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://dimimu.dev'

  // --- Static routes ---
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/didibot`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]

  // --- Blog posts from Firebase ---
  const blogSnapshot = await getDocs(collection(db, 'blogs'))
  const blogs: MetadataRoute.Sitemap = blogSnapshot.docs.map(doc => ({
    url: `${baseUrl}/blog/${doc.data().slug}`,
    lastModified: doc.data().updatedAt?.toDate() || new Date(),
    changefreq: 'weekly',
    priority: 0.8,
  }))

  // --- Projects from Firebase ---
  const projectSnapshot = await getDocs(collection(db, 'projects'))
  const projects: MetadataRoute.Sitemap = projectSnapshot.docs.map(doc => ({
    url: `${baseUrl}/projects/${doc.data().slug}`,
    lastModified: doc.data().updatedAt?.toDate() || new Date(),
    changefreq: 'monthly',
    priority: 0.7,
  }))

  // Return combined sitemap
  return [...staticRoutes, ...blogs, ...projects]
}
