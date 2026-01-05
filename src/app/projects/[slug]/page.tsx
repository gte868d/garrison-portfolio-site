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
    <main className="min-h-screen bg-[#0A0B0F]">
      {/* Minimal Top Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#0A0B0F]/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            <Link 
              href="/#projects"
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
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
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/30 via-purple-700/20 to-purple-600/10 border border-purple-500/20">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-[12rem] font-bold text-white/10 select-none mb-4">
                {project.title.charAt(0)}
              </div>
              <div className="text-sm text-gray-500 tracking-wide font-medium">Hero Image Placeholder</div>
            </div>
          </div>
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
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-gray-600 mb-12">
            Design Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Show 6 sketch placeholders */}
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-purple-600/5 border border-white/10 hover:border-purple-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <svg className="w-12 h-12 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600 group-hover:text-gray-500 transition-colors font-medium">
                    Sketch {index}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Execution Photos - Large Format with visible placeholders */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <h2 className="text-xs font-medium tracking-[0.15em] uppercase text-gray-600 mb-12">
            Final Execution
          </h2>
          <div className="space-y-12">
            {/* Show 4 photo placeholders */}
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="group relative aspect-[16/9] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-purple-600/5 border border-white/10 hover:border-purple-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                  <svg className="w-16 h-16 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600 group-hover:text-gray-500 transition-colors font-medium">
                    Execution Photo {index}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-3 text-gray-400 hover:text-white transition-colors group"
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
