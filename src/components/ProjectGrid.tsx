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


function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Link 
      href={`/projects/${project.id}`}
      className="block group animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative rounded-2xl overflow-hidden card-hover aspect-[4/5] transform transition-all duration-700 hover:scale-[1.03] hover:shadow-2xl hover:shadow-accent/20">
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
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent transition-opacity duration-500 group-hover:from-background/95"></div>
          </div>
        ) : (
          // Placeholder gradient
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/10 flex items-center justify-center">
            <div className="text-8xl font-bold text-white/5 transition-transform duration-700 group-hover:scale-110">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 transform transition-all duration-500">
          <h3 className="text-xl font-serif font-bold mb-2 transform transition-all duration-500 group-hover:translate-y-[-8px] group-hover:text-accent">
            {project.title}
          </h3>
          
          {/* Expanded info on hover */}
          <div className="transition-all duration-500 opacity-0 max-h-0 overflow-hidden group-hover:opacity-100 group-hover:max-h-40">
            <div className="glass-morphism rounded-lg p-4 mt-2 space-y-2 text-sm backdrop-blur-xl">
              <div className="flex justify-between items-center">
                <span className="text-text-dim">Industry</span>
                <span className="font-semibold text-text-light">{project.industry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-dim">Materials</span>
                <span className="font-semibold text-text-light">{project.materials}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-dim">Type</span>
                <span className="font-semibold text-text-light">{project.type}</span>
              </div>
            </div>
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
