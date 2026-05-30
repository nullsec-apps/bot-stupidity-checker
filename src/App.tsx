import { Component, ReactNode } from 'react'
import Hero from './components/Hero'
import ConfessionBoard from './components/ConfessionBoard'
import IQMeter from './components/IQMeter'
import DumbQuotes from './components/DumbQuotes'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import { AlertTriangle } from 'lucide-react'

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
          <AlertTriangle size={48} className="text-yellow-400" strokeWidth={1.5} />
          <h1 className="display text-4xl font-700">Even my error screen broke.</h1>
          <p className="text-neutral-500">Told you I was stupid. Try refreshing.</p>
          <button onClick={() => location.reload()} className="mt-4 bg-yellow-400 text-black px-6 py-3 font-semibold hover:bg-yellow-300 transition-colors">Reload</button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full overflow-x-hidden bg-[#0a0a0a] relative">
        <div className="grain" />
        <Toaster position="bottom-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fafafa', border: '1px solid #facc15' } }} />
        <Hero />
        <IQMeter />
        <DumbQuotes />
        <ConfessionBoard />
        <Footer />
      </div>
    </ErrorBoundary>
  )
}