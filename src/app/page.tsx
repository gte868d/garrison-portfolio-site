import ProjectGrid from '@/components/ProjectGrid'
import RenderingsGallery from '@/components/RenderingsGallery'
import AnimatedBackground from '@/components/AnimatedBackground'
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

function getRenderings() {
  try {
    const renderingsPath = path.join(process.cwd(), 'content/settings/renderings.json')
    const renderingsData = fs.readFileSync(renderingsPath, 'utf8')
    const data = JSON.parse(renderingsData)
    return data.renderings || []
  } catch (error) {
    return []
  }
}

export default function Home() {
  const hero = getHeroContent()
  const renderings = getRenderings()
  
  return (
    <>
      {/* Hero Section - Award-Winning Layout */}
      <section className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-12 overflow-hidden">
        {/* Animated 3D Background */}
        <AnimatedBackground />

        {/* Subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto text-center py-32 sm:py-40 lg:py-48 z-10">
          {/* Headline with perfect spacing */}
          <h1 className="font-serif font-bold mb-8 sm:mb-10 lg:mb-12 leading-[1.05] tracking-tight">
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 animate-fade-in-up">
              {hero.headline1}
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 animate-fade-in-up animation-delay-100">
              {hero.headline2}
            </span>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gradient animate-fade-in-up animation-delay-200">
              {hero.headline3}
            </span>
          </h1>
          
          {/* Subheadline with optimal line length */}
          <p className="text-lg sm:text-xl lg:text-2xl text-text-dim/90 mb-12 sm:mb-14 lg:mb-16 max-w-3xl mx-auto leading-relaxed font-light animate-fade-in-up animation-delay-300">
            {hero.subheadline}
          </p>
          
          {/* CTA Button */}
          <div className="animate-fade-in-up animation-delay-300">
            <a 
              href="#projects" 
              className="group inline-flex items-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-accent hover:bg-accent-glow 
                         rounded-full transition-all duration-500 font-semibold text-base sm:text-lg 
                         shadow-lg shadow-accent/25 hover:shadow-2xl hover:shadow-accent/40 
                         transform hover:scale-105"
            >
              {hero.buttonText}
              <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-text-dim/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-background via-surface/30 to-background">
        <div className="container mx-auto max-w-7xl">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20 lg:mb-24">
            <div className="inline-block mb-4">
              <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-accent/70">
                Selected Work
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 tracking-tight">
              Featured Projects
            </h2>
            <p className="text-lg sm:text-xl text-text-dim/80 max-w-2xl mx-auto leading-relaxed">
              Case studies spanning retail displays, trade show environments, 
              and product design. Click to explore.
            </p>
          </div>
          
          <ProjectGrid />
        </div>
      </section>

      {/* Renderings Gallery */}
      {renderings.length > 0 && (
        <div className="bg-gradient-to-b from-background via-surface/20 to-background">
          <RenderingsGallery renderings={renderings} />
        </div>
      )}

      {/* Methodology Section */}
      <section className="py-24 sm:py-28 lg:py-32 px-6 sm:px-8 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          {/* Section marker */}
          <div className="text-center mb-6">
            <span className="text-xs sm:text-sm font-medium tracking-[0.2em] uppercase text-accent/70">
              Methodology
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-8 text-center tracking-tight">
            The Method: Rocks in a Tumbler
          </h2>
          
          <div className="space-y-6 text-lg sm:text-xl text-text-dim/80 leading-relaxed text-center max-w-3xl mx-auto">
            <p>
              For every project, I generate 15-30 rapid concept sketches—not to show off volume, 
              but because the right solution rarely appears in the first three ideas.
            </p>
            <p>
              These concepts collide with each other, with client constraints, with manufacturing realities. 
              The friction reveals what works.
            </p>
          </div>

          <div className="text-center mt-10">
            <a 
              href="/about" 
              className="group inline-flex items-center gap-2 text-accent hover:text-accent-glow transition-all duration-300 font-semibold text-base sm:text-lg"
            >
              Learn more about the methodology
              <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
