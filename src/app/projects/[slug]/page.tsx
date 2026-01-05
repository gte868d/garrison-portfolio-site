import { notFound } from 'next/navigation'
import Link from 'next/link'
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
      {/* Minimal Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="/#projects"
              className="flex items-center gap-3 text-text-dim hover:text-text-light transition-colors group"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium tracking-wide">All Work</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section - Spacious & Minimal */}
      <section className="pt-40 pb-24 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Meta Tags - Small & Refined */}
          <div className="flex flex-wrap items-center gap-3 mb-8 animate-fade-in-up">
            <span className="text-xs font-medium tracking-widest uppercase text-text-dim/60">
              {project.industry}
            </span>
            <span className="w-1 h-1 rounded-full bg-text-dim/30"></span>
            <span className="text-xs font-medium tracking-widest uppercase text-text-dim/60">
              {project.year || '2024'}
            </span>
            {project.client && (
              <>
                <span className="w-1 h-1 rounded-full bg-text-dim/30"></span>
                <span className="text-xs font-medium tracking-widest uppercase text-text-dim/60">
                  {project.client}
                </span>
              </>
            )}
          </div>

          {/* Title - Large & Impactful */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-8 animate-fade-in-up animation-delay-100">
            <span className="bg-gradient-to-br from-text-light via-text-light to-text-dim bg-clip-text text-transparent">
              {project.title}
            </span>
          </h1>

          {/* Type & Materials - Clean Pair */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-12 mb-12 animate-fade-in-up animation-delay-200">
            <div>
              <div className="text-xs font-medium tracking-widest uppercase text-text-dim/50 mb-2">Type</div>
              <div className="text-base text-text-light font-medium">{project.type}</div>
            </div>
            <div>
              <div className="text-xs font-medium tracking-widest uppercase text-text-dim/50 mb-2">Materials</div>
              <div className="text-base text-text-light font-medium">{project.materials}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image - Full Bleed */}
      {project.heroImage && (
        <section className="mb-32 animate-fade-in-up animation-delay-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-primary-dark/5">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-[12rem] font-bold text-white/5 select-none">
                  {project.title.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content - Readable Column */}
      <section className="pb-32">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <article 
            className="prose prose-invert max-w-none
              prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
              prose-h2:text-4xl prose-h2:leading-[1.2] prose-h2:mt-16 prose-h2:mb-6 prose-h2:text-text-light
              prose-h3:text-2xl prose-h3:leading-[1.3] prose-h3:mt-12 prose-h3:mb-4 prose-h3:text-text-light
              prose-p:text-lg prose-p:leading-relaxed prose-p:text-text-dim prose-p:mb-6
              prose-strong:text-text-light prose-strong:font-semibold
              prose-ul:text-lg prose-ul:leading-relaxed prose-ul:text-text-dim prose-ul:my-8
              prose-li:my-3 prose-li:text-text-dim
              [&>h2]:first:mt-0"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>
      </section>

      {/* Sketches - Masonry Grid */}
      {project.sketches && project.sketches.length > 0 && (
        <section className="pb-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-xs font-medium tracking-widest uppercase text-text-dim/50 mb-12">
              Design Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.sketches.map((sketch: any, index: number) => (
                <div key={index} className="group relative aspect-square rounded-xl overflow-hidden bg-surface/30 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-text-dim/30 group-hover:text-text-dim/50 transition-colors">
                      Sketch {index + 1}
                    </span>
                  </div>
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
            <h2 className="text-xs font-medium tracking-widest uppercase text-text-dim/50 mb-12">
              Final Execution
            </h2>
            <div className="space-y-12">
              {project.photos.map((photo: any, index: number) => (
                <div key={index} className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-surface/30 backdrop-blur-sm border border-white/5 hover:border-primary/20 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm text-text-dim/30">Photo {index + 1}</span>
                  </div>
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
            className="inline-flex items-center gap-3 text-text-dim hover:text-text-light transition-colors group"
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
