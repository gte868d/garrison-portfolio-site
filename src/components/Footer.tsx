import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="glass-morphism mt-32 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Garrison Brooks</h3>
            <p className="text-text-dim">
              Industrial Designer<br />
              Dallas, Georgia
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex flex-col gap-2">
              <a href="mailto:garrison.brooks@gmail.com" 
                 className="text-text-dim hover:text-accent transition-colors">
                Email
              </a>
              <a href="https://linkedin.com/in/garrisonbrooks" 
                 target="_blank" rel="noopener noreferrer"
                 className="text-text-dim hover:text-accent transition-colors">
                LinkedIn
              </a>
              <a href="https://askbetter.us" 
                 target="_blank" rel="noopener noreferrer"
                 className="text-primary-light hover:text-accent transition-colors">
                AskBetter
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Availability</h4>
            <p className="text-text-dim">
              Available for select freelance projects involving complex spatial design, 
              materials outside traditional corrugated, or applications requiring systematic 
              problem-solving methodologies.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-surface text-center text-text-dim text-sm">
          <p>© {new Date().getFullYear()} Garrison Brooks. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
