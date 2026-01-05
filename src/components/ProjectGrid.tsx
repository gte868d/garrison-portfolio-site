'use client'

import Link from 'next/link'
import { useState } from 'react'

const projects = [
  {
    id: 'carv-2',
    title: 'Carv 2 Ski Technology Display',
    industry: 'Sports & Recreation',
    materials: 'Acrylic, Steel, LED',
    type: 'Interactive Retail Display',
    image: '/images/projects/carv-2-hero.jpg',
  },
  {
    id: 'dometic',
    title: 'Dometic Mobile Showroom',
    industry: 'RV & Mobile Living',
    materials: 'Corrugated, Graphics',
    type: 'Trade Show Environment',
    image: '/images/projects/dometic-hero.jpg',
  },
  {
    id: 'korr-cardio-coach',
    title: 'KORR Cardio Coach',
    industry: 'Medical & Fitness',
    materials: 'Sheet Metal, Acrylic',
    type: 'Product Housing',
    image: '/images/projects/korr-hero.jpg',
  },
  {
    id: 'leer-tonneau-covers',
    title: 'Leer Tonneau Covers',
    industry: 'Automotive Aftermarket',
    materials: 'Vacuum-Formed Plastic',
    type: 'Retail Display',
    image: '/images/projects/leer-hero.jpg',
  },
  {
    id: 'trex-decking-bay',
    title: 'Trex Decking Bay System',
    industry: 'Home Improvement',
    materials: 'Composite, Steel, Print',
    type: '9\' Retail Bay',
    image: '/images/projects/trex-hero.jpg',
  },
  {
    id: 'atlas-trade-show',
    title: 'Atlas Trade Show Graphics',
    industry: 'Building Materials',
    materials: 'Large-Format Print',
    type: 'Trade Show Graphics',
    image: '/images/projects/atlas-hero.jpg',
  },
  {
    id: 'delta-faucet-display',
    title: 'Delta Faucet Display',
    industry: 'Home Improvement',
    materials: 'Corrugated, Digital Print',
    type: 'Retail Bay Display',
    image: '/images/projects/delta-hero.jpg',
  },
  {
    id: 'one-wake-store',
    title: 'One Wake Store Concept',
    industry: 'Retail & Spatial',
    materials: 'Environmental Graphics',
    type: 'Store Planning',
    image: '/images/projects/one-wake-hero.jpg',
  },
]

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      href={`/projects/${project.id}`}
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-xl overflow-hidden card-hover bg-surface aspect-[4/5]">
        {/* Placeholder Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
          <div className="text-6xl font-bold text-white opacity-10">
            {project.title.charAt(0)}
          </div>
        </div>
        
        {/* Info Overlay - Always visible at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
          <h3 className="text-xl font-serif font-bold mb-2">{project.title}</h3>
          
          {/* Expanded info on hover */}
          <div className={`transition-all duration-300 ${
            isHovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
          } overflow-hidden`}>
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}
