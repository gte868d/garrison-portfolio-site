'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Rendering {
  image: string
  title: string
  category: string
}

interface RenderingsGalleryProps {
  renderings: Rendering[]
}

// Format category for display
function formatCategory(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'retail-permanent': 'Retail - Permanent',
    'retail-semi-permanent': 'Retail - Semi-Permanent',
    'retail-temporary': 'Retail - Temporary',
    'retail-store-environment': 'Retail Store Environment',
    'retail-decor': 'Retail Decor',
    'trade-show': 'Trade Show',
    'product': 'Product Design',
    'signage': 'Signage',
    'conceptual': 'Conceptual'
  }
  return categoryMap[category] || category
}

function Lightbox({ 
  image, 
  title, 
  onClose 
}: { 
  image: string
  title: string
  onClose: () => void 
}) {
  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-accent transition-colors z-10"
        aria-label="Close"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Image */}
      <div 
        className="relative w-full h-full flex items-center justify-center p-12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative max-w-7xl max-h-full w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {title}
      </div>
    </div>
  )
}

export default function RenderingsGallery({ renderings }: RenderingsGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<{ image: string; title: string } | null>(null)
  const [filter, setFilter] = useState<string>('all')

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(renderings.map(r => r.category)))]
  
  // Filter renderings
  const filteredRenderings = filter === 'all' 
    ? renderings 
    : renderings.filter(r => r.category === filter)

  return (
    <>
      <section className="py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4">
              Concept Renderings
            </h2>
            <p className="text-lg sm:text-xl text-text-dim max-w-2xl mx-auto mb-8">
              A selection of visualization work spanning retail displays, trade show environments, 
              and product concepts. Click any image to view larger.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === category
                      ? 'bg-accent text-white shadow-lg'
                      : 'bg-surface hover:bg-surface/80 text-text-dim hover:text-text-light'
                  }`}
                >
                  {category === 'all' ? 'All' : formatCategory(category)}
                </button>
              ))}
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRenderings.map((rendering, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer bg-surface/30 border border-white/5 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage({ image: rendering.image, title: rendering.title })}
              >
                <Image
                  src={rendering.image}
                  alt={rendering.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-semibold text-lg mb-1">{rendering.title}</h3>
                  <p className="text-gray-300 text-sm">{formatCategory(rendering.category)}</p>
                </div>

                {/* Zoom Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredRenderings.length === 0 && (
            <div className="text-center py-20">
              <p className="text-text-dim text-lg">No renderings in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage.image}
          title={selectedImage.title}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  )
}
