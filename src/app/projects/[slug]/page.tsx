import { notFound } from 'next/navigation'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

async function getProject(slug: string) {
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
      ...data,
      content: htmlContent,
      slug,
    }
  } catch (error) {
    return null
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)
  
  if (!project) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 grain-texture">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-background to-background opacity-50"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-2 text-text-dim hover:text-primary-light transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Work
          </Link>

          {/* Project Title & Meta */}
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6">
              {project.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 text-lg mb-8">
              <div>
                <span className="text-text-dim">Industry:</span>
                <span className="ml-2 font-semibold">{project.industry}</span>
              </div>
              <div>
                <span className="text-text-dim">Type:</span>
                <span className="ml-2 font-semibold">{project.type}</span>
              </div>
              {project.client && (
                <div>
                  <span className="text-text-dim">Client:</span>
                  <span className="ml-2 font-semibold">{project.client}</span>
                </div>
              )}
              {project.year && (
                <div>
                  <span className="text-text-dim">Year:</span>
                  <span className="ml-2 font-semibold">{project.year}</span>
                </div>
              )}
            </div>

            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary-light">{project.materials}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image (if exists) */}
      {project.heroImage && (
        <section className="max-w-7xl mx-auto px-6 -mt-8 mb-16">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
              <div className="text-9xl font-bold text-white opacity-10">
                {project.title.charAt(0)}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div 
          className="prose prose-invert prose-lg max-w-none
            prose-headings:font-serif prose-headings:font-bold prose-headings:text-text-light
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-text-light prose-p:leading-relaxed
            prose-ul:text-text-light prose-ul:space-y-2
            prose-li:text-text-light
            prose-strong:text-accent prose-strong:font-semibold"
          dangerouslySetInnerHTML={{ __html: project.content }}
        />
      </section>

      {/* Sketches Gallery (if exists) */}
      {project.sketches && project.sketches.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-serif font-bold mb-12">Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.sketches.map((sketch: any, index: number) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-surface card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
                  <span className="text-text-dim text-sm">Sketch {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Execution Photos (if exists) */}
      {project.photos && project.photos.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-4xl font-serif font-bold mb-12">Final Execution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.photos.map((photo: any, index: number) => (
              <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-surface card-hover">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-dark/20 flex items-center justify-center">
                  <span className="text-text-dim text-sm">Photo {index + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Next/Previous Projects */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="flex justify-between items-center">
          <Link 
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            View All Projects
          </Link>
        </div>
      </section>

    </main>
  )
}
