import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

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

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section - Spacious & Minimal */}
      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Subtle back link */}
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-text-dim hover:text-accent transition-colors mb-8 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>

          {/* Meta Tags - Small & Refined */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500">
              {project.industry}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-700"></span>
            <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500">
              {project.year || '2025'}
            </span>
            {project.client && (
              <>
                <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                <span className="text-xs font-medium tracking-[0.2em] uppercase text-gray-500">
                  {project.client}
                </span>
              </>
            )}
          </div>

          {/* Title - HUGE & Impactful */}
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-serif font-bold tracking-tight leading-[0.95] mb-10 text-white">
            {project.title}
          </h1>

          {/* Type & Materials - Clean Pair */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 mb-16">
            <div>
              <div className="text-xs font-medium tracking-[0.15em] uppercase text-gray-600 mb-3">Type</div>
              <div className="text-lg text-gray-200 font-medium leading-relaxed">{project.type}</div>
            </div>
            <div>
              <div className="text-xs font-medium tracking-[0.15em] uppercase text-gray-600 mb-3">Materials</div>
              <div className="text-lg text-gray-200 font-medium leading-relaxed">{project.materials}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image - Full Bleed with visible placeholder */}
      <section className="mb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {project.heroImage ? (
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1536px) 100vw, 1536px"
              />
            </div>
          ) : (
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-primary/30 via-primary/20 to-accent/10 border border-accent/20">
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-[12rem] font-bold text-white/10 select-none mb-4">
                  {project.title.charAt(0)}
                </div>
                <div className="text-sm text-gray-500 tracking-wide font-medium">Hero Image Placeholder</div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content - Readable Column with Clear Hierarchy */}
      <section className="pb-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <article 
            className="space-y-6
              [&>h2]:font-serif [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-white
              [&>h2]:text-4xl [&>h2]:leading-[1.15] [&>h2]:mt-20 [&>h2]:mb-8
              [&>h2:first-child]:mt-0
              
              [&>h3]:font-serif [&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:text-gray-100
              [&>h3]:text-2xl [&>h3]:leading-[1.3] [&>h3]:mt-16 [&>h3]:mb-6
              
              [&>p]:text-lg [&>p]:leading-[1.8] [&>p]:text-gray-400
              
              [&>p>strong]:text-white [&>p>strong]:font-semibold
              
              [&>ul]:text-lg [&>ul]:leading-[1.8] [&>ul]:text-gray-400 [&>ul]:my-8 [&>ul]:space-y-3 [&>ul]:list-disc [&>ul]:pl-6
              [&>ul>li]:text-gray-400
            "
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>
      </section>

      {/* Sketches - With visible placeholders */}
      {project.sketches && project.sketches.length > 0 && (
        <section className="pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-gray-600 mb-12">
              Design Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.sketches.map((sketch: any, index: number) => (
                <div key={index} className="relative aspect-square rounded-2xl overflow-hidden">
                  <Image
                    src={sketch.image}
                    alt={`Sketch ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Execution Photos - Large Format */}
      {project.photos && project.photos.length > 0 && (
        <section className="pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-gray-600 mb-12">
              Final Execution
            </h2>
            <div className="space-y-12">
              {project.photos.map((photo: any, index: number) => (
                <div key={index} className="relative aspect-[16/9] rounded-3xl overflow-hidden">
                  <Image
                    src={photo.image}
                    alt={`Execution photo ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1536px) 100vw, 1536px"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Navigation */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-accent transition-colors group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm font-medium tracking-wide">Back to All Work</span>
          </Link>
        </div>
      </section>
    </main>
  )
}
