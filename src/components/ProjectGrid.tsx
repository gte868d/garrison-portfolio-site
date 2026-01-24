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
  heroImage?: string
  featured?: boolean
}

function getProjects(): Project[] {
  try {
    const projectsDirectory = path.join(process.cwd(), 'content/projects')
    const filenames = fs.readdirSync(projectsDirectory)
    
    // Load project order from settings
    let projectOrder: string[] = []
    try {
      const orderPath = path.join(process.cwd(), 'content/settings/project-order.json')
      const orderData = fs.readFileSync(orderPath, 'utf8')
      const orderJson = JSON.parse(orderData)
      projectOrder = orderJson.order || []
    } catch (error) {
      console.log('No project order file found, using default order')
    }
    
    // Load all projects into a map
    const projectMap = new Map<string, Project>()
    
    filenames
      .filter(filename => filename.endsWith('.md'))
      .forEach(filename => {
        const slug = filename.replace('.md', '')
        const filePath = path.join(projectsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        projectMap.set(slug, {
          id: slug,
          title: data.title || 'Untitled Project',
          industry: data.industry || '',
          materials: data.materials || '',
          type: data.type || '',
          heroImage: data.heroImage,
          featured: data.featured !== false,
        })
      })
    
    // If we have a project order, use it
    if (projectOrder.length > 0) {
      return projectOrder
        .map(slug => projectMap.get(slug))
        .filter(project => project && project.featured) as Project[]
    }
    
    // Otherwise, show all featured projects
    return Array.from(projectMap.values())
      .filter(project => project.featured)
      .slice(0, 8)
    
  } catch (error) {
    console.error('Error loading projects:', error)
    return []
  }
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link 
      href={`/projects/${project.id}`}
      className="block group"
    >
      <div className="relative rounded-2xl overflow-hidden card-hover aspect-[4/5]">
        {/* Project Image or Placeholder */}
        {project.heroImage ? (
          <div className="absolute inset-0">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Stronger gradient overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
          </div>
        ) : (
          // Placeholder gradient if no image
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
            <div className="text-8xl font-bold text-white/5">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Info Overlay - Clean, Always Visible */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
          {/* Industry tag at top */}
          <div className="mb-auto pt-4">
            <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase bg-accent/20 text-accent backdrop-blur-sm rounded-full">
              {project.industry}
            </span>
          </div>
          
          {/* Project info at bottom */}
          <div className="space-y-3">
            <h3 className="text-2xl font-serif font-bold leading-tight text-white">
              {project.title}
            </h3>
            
            <div className="space-y-1.5">
              <p className="text-sm text-gray-300 leading-relaxed">
                {project.type}
              </p>
              <p className="text-xs text-gray-400 leading-relaxed">
                {project.materials}
              </p>
            </div>
            
            {/* View project hint */}
            <div className="flex items-center gap-2 text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              <span>View Project</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
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
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
