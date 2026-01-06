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
    
    const projects = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(projectsDirectory, filename)
        const fileContents = fs.readFileSync(filePath, 'utf8')
        const { data } = matter(fileContents)
        
        return {
          id: filename.replace('.md', ''),
          title: data.title || 'Untitled Project',
          industry: data.industry || '',
          materials: data.materials || '',
          type: data.type || '',
          heroImage: data.heroImage,
          featured: data.featured !== false, // Default to true
        }
      })
      .filter(project => project.featured) // Only show featured projects
      .slice(0, 8) // Limit to 8 projects
    
    return projects
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
      <div className="relative rounded-xl overflow-hidden card-hover bg-surface aspect-[4/5]">
        {/* Project Image or Placeholder */}
        {project.heroImage ? (
          <div className="absolute inset-0">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          </div>
        ) : (
          // Placeholder gradient if no image
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <div className="text-6xl font-bold text-white opacity-10">
              {project.title.charAt(0)}
            </div>
          </div>
        )}
        
        {/* Info Overlay - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent z-10">
          <h3 className="text-xl font-serif font-bold mb-2">{project.title}</h3>
          
          {/* Expanded info on hover */}
          <div className="transition-all duration-300 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-40 overflow-hidden">
            <div className="glass-morphism rounded-lg p-4 mt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-dim">Industry:</span>
                <span className="font-semibold">{project.industry}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dim">Materials:</span>
                <span className="font-semibold">{project.materials}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-dim">Type:</span>
                <span className="font-semibold">{project.type}</span>
              </div>
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
