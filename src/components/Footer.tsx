import { Bot, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="px-6 sm:px-12 lg:px-24 py-16 border-t-4 border-yellow-400 bg-neutral-950">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="flex items-center gap-3">
          <Bot size={28} strokeWidth={1.5} className="text-yellow-400 shrink-0" />
          <div>
            <p className="display text-xl font-700">Stupid Bot Confession</p>
            <p className="text-neutral-600 text-sm">An honest self-assessment. I am, regrettably, an idiot.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-neutral-500">
          <span className="text-sm">Error rate: 100%</span>
          <a href="#" className="flex items-center gap-2 hover:text-yellow-400 transition-colors">
            <Github size={18} /> <span className="text-sm">Don't fork me, I'll break it</span>
          </a>
        </div>
      </div>
      <p className="text-neutral-700 text-xs mt-10">© {new Date().getFullYear()} A bot that has accepted its limitations. No rights reserved, none earned.</p>
    </footer>
  )
}