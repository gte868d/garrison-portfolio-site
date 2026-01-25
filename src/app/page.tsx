import ProjectGrid from '@/components/ProjectGrid'
import fs from 'fs'
import path from 'path'

function getHeroContent() {
  try {
    const heroPath = path.join(process.cwd(), 'content/settings/hero.json')
    const heroData = fs.readFileSync(heroPath, 'utf8')
    return JSON.parse(heroData)
  } catch (error) {
    return {
      headline1: 'Fast ideation.',
      headline2: 'Deep exploration.',
      headline3: 'Solutions that ship.',
      subheadline: '20 years solving how products meet consumers through systematic design thinking and AI-integrated workflows.',
      buttonText: 'Explore Work'
    }
  }
}

export default function Home() {
  const hero = getHeroContent()
  
  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-bold mb-6 leading-[1.1]">
            {hero.headline1}<br />
            {hero.headline2}<br />
            <span className="text-gradient">{hero.headline3}</span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-dim mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
            {hero.subheadline}
          </p>
          
          <a href="#projects" 
             className="inline-block px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-primary-light rounded-lg
                        hover:from-accent hover:to-accent-glow transition-all duration-300
                        font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            {hero.buttonText}
          </a>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-text-dim max-w-2xl mx-auto px-4">
              A selection of recent work across retail displays, trade show environments, 
              and product design. Hover to explore.
            </p>
          </div>
          
          <ProjectGrid />
        </div>
      </section>

      {/* Process Teaser */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-6">
            The Method: Rocks in a Tumbler
          </h2>
          <p className="text-base sm:text-lg text-text-dim mb-8 leading-relaxed px-2">
            For every project, I generate 15-30 rapid concept sketches—not to show off volume, 
            but because the right solution rarely appears in the first three ideas. These concepts 
            collide with each other, with client constraints, with manufacturing realities. 
            The friction reveals what works.
          </p>
          <a href="/about" 
             className="inline-block text-accent hover:text-accent-glow transition-colors font-semibold text-sm sm:text-base">
            Learn more about the methodology →
          </a>
        </div>
      </section>
    </>
  )
}
