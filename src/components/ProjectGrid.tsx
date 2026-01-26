import Link from 'next/link'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface Project {
  id: string
  title: string
  industry: string
  materials: string
  type: string
  client?: string
  year?: string
  featured?: boolean
  heroImage?: string
}

function getProjects(): Project[] {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects')
    
    if (!fs.existsSync(projectsDirectory)) {
      return []
    }
    
    const filenames = fs.readdirSync(projectsDirectory)
    const projectMap = new Map<string, Project>()
    
    filenames.forEach((filename) => {
      if (!filename.endsWith('.md')) return
      
      const filePath = path.join(projectsDirectory, filename)
      const fileContents = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(fileContents)
      
      const slug = filename.replace('.md', '')
      
      projectMap.set(slug, {
        id: slug,
        title: data.title as string,
        industry: data.industry as string,
        materials: data.materials as string,
        type: data.type as string,
        client: data.client as string | undefined,
        year: data.year as string | undefined,
        featured: data.featured as boolean | undefined,
        heroImage: data.heroImage as string | undefined,
      })
    })
    
    // Return all featured projects
    return Array.from(projectMap.values())
      .filter(project => project.featured)
      .slice(0, 8)
    
  } catch (error) {
    console.error('Error loading projects:', error)
    return []
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link 
      href={`/projects/${project.id}`}
      className="block group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative rounded-2xl overflow-hidden aspect-[4/5] transform transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/20">
        {/* Project Image or Placeholder */}
        {project.heroImage ? (
          <div className="absolute inset-0">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/95"></div>
          </div>
        ) : (
          // Placeholder gradient
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
            <div className="text-8xl font-bold text-white/5 transition-transform duration-700 group-hover:scale-110">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Info Overlay - Clean & Readable */}
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 transform transition-all duration-500">
          {/* Project Title - Always Visible */}
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 transform transition-all duration-500 group-hover:translate-y-[-8px] text-white leading-tight">
            {project.title}
          </h3>
          
          {/* Meta Info - Clean Layout */}
          <div className="transition-all duration-500 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-48">
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex items-baseline gap-2">
                <span className="text-accent font-semibold min-w-[80px]">Industry:</span>
                <span className="text-gray-200">{project.industry}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-accent font-semibold min-w-[80px]">Type:</span>
                <span className="text-gray-200">{project.type}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-accent font-semibold min-w-[80px]">Materials:</span>
                <span className="text-gray-200 leading-relaxed">{project.materials}</span>
              </div>
            </div>
          </div>

          {/* View Project Arrow */}
          <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
              View Project
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 border-2 border-accent/0 group-hover:border-accent/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
      </div>
    </Link>
  )
}

export default function ProjectGrid() {
  const projects = getProjects()
  
  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text-dim text-lg">No projects yet. Add some in the CMS!</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  )
}
