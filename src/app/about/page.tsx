import fs from 'fs'
import path from 'path'
import { marked } from 'marked'

function getAboutContent() {
  try {
    const aboutPath = path.join(process.cwd(), 'content/settings/about.json')
    const aboutData = fs.readFileSync(aboutPath, 'utf8')
    const data = JSON.parse(aboutData)
    
    // Convert markdown to HTML
    const htmlContent = marked(data.bio || '')
    
    return htmlContent
  } catch (error) {
    console.error('Error loading about content:', error)
    return '<p>Content not available. Please add bio content in the CMS.</p>'
  }
}

export default function AboutPage() {
  const content = getAboutContent()
  
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-12">
          About
        </h1>
        
        <article 
          className="
            [&>h2]:font-serif [&>h2]:font-bold [&>h2]:text-white
            [&>h2]:text-4xl [&>h2]:leading-[1.15] [&>h2]:mt-16 [&>h2]:mb-6
            [&>h2:first-child]:mt-0
            
            [&>h3]:font-serif [&>h3]:font-semibold [&>h3]:text-gray-100
            [&>h3]:text-2xl [&>h3]:leading-[1.3] [&>h3]:mt-12 [&>h3]:mb-4
            
            [&>p]:text-lg [&>p]:leading-[1.8] [&>p]:text-gray-400 [&>p]:mb-6
            
            [&>p>strong]:text-white [&>p>strong]:font-semibold
            
            [&>ul]:text-lg [&>ul]:leading-[1.8] [&>ul]:text-gray-400 [&>ul]:my-8 [&>ul]:space-y-3 [&>ul]:list-disc [&>ul]:pl-6
            [&>ul>li]:text-gray-400
            
            [&>section]:mb-16
          "
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  )
}
