import { notFound } from 'next/navigation'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import ProjectPageClient from './ProjectPageClient'

interface Project {
  title: string
  industry: string
  materials: string
  type: string
  client?: string
  year?: string
  featured?: boolean
  heroImage?: string
  sketches?: Array<{ image: string }>
  photos?: Array<{ image: string }>
  content: string
  slug: string
}

async function getProject(slug: string): Promise<Project | null> {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects')
    const filePath = path.join(projectsDirectory, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContents)
    
    const htmlContent = marked(content)
    
    return {
      title: data.title as string,
      industry: data.industry as string,
      materials: data.materials as string,
      type: data.type as string,
      client: data.client as string | undefined,
      year: data.year as string | undefined,
      featured: data.featured as boolean | undefined,
      heroImage: data.heroImage as string | undefined,
      sketches: data.sketches as Array<{ image: string }> | undefined,
      photos: data.photos as Array<{ image: string }> | undefined,
      content: htmlContent as string,
      slug,
    }
  } catch (error) {
    return null
  }
}

export async function generateStaticParams() {
  const projectsDirectory = path.join(process.cwd(), 'content/projects')
  const filenames = fs.readdirSync(projectsDirectory)
  
  return filenames
    .filter(filename => filename.endsWith('.md'))
    .map(filename => ({
      slug: filename.replace('.md', ''),
    }))
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  
  if (!project) {
    notFound()
  }

  return <ProjectPageClient project={project} />
}
