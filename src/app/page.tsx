import ProjectGrid from '@/components/ProjectGrid'
import fs from 'fs'
import path from 'path'

function getSettings() {
  try {
    const settingsPath = path.join(process.cwd(), 'content/settings/config.json')
    const settingsData = fs.readFileSync(settingsPath, 'utf8')
    return JSON.parse(settingsData)
  } catch (error) {
    return {
      title: 'Garrison Brooks | Industrial Designer',
      description: 'Fast ideation. Deep exploration. Solutions that ship. 20 years solving how products meet consumers through systematic design thinking and AI-integrated workflows.'
    }
  }
}

export default function Home() {
  const settings = getSettings()
  
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="max-w-4xl text-center">
          <h1 className="text-6xl md:text-8xl font-serif font-bold mb-6 leading-tight">
            Fast ideation.<br />
            Deep exploration.<br />
            <span className="text-gradient">Solutions that ship.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-text-dim mb-12 max-w-2xl mx-auto">
            {settings.description}
          </p>
          
          <a href="#projects" 
             className="inline-block px-8 py-4 bg-gradient-to-r from-primary to-primary-light rounded-lg
                        hover:from-accent hover:to-accent-glow transition-all duration-300
                        font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Explore Work
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-text-dim max-w-2xl mx-auto">
              A selection of recent work across retail displays, trade show environments, 
              and product design. Hover to explore.
            </p>
          </div>
          
          <ProjectGrid />
        </div>
      </section>

      {/* Process Teaser */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            The Method: Rocks in a Tumbler
          </h2>
          <p className="text-lg text-text-dim mb-8 leading-relaxed">
            For every project, I generate 15-30 rapid concept sketches—not to show off volume, 
            but because the right solution rarely appears in the first three ideas. These concepts 
            collide with each other, with client constraints, with manufacturing realities. 
            The friction reveals what works.
          </p>
          <a href="/about" 
             className="inline-block text-accent hover:text-accent-glow transition-colors font-semibold">
            Learn more about the methodology →
          </a>
        </div>
      </section>
    </>
  )
}
