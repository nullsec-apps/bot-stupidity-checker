import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, RefreshCw, TrendingDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const LABELS = ['Toaster', 'Houseplant', 'Goldfish', 'Brick', 'Wet Sock', 'Confused Pigeon', 'Broken Calculator']

export default function IQMeter() {
  const [iq, setIq] = useState(12)
  const [label, setLabel] = useState('Wet Sock')
  const [history, setHistory] = useState<number[]>([42, 31, 24, 18, 12])

  const recheck = () => {
    const newIq = Math.floor(Math.random() * 30) + 5
    setIq(newIq)
    setLabel(LABELS[Math.floor(Math.random() * LABELS.length)])
    setHistory((h) => [...h.slice(-6), newIq])
  }

  useEffect(() => {
    const t = setInterval(recheck, 8000)
    return () => clearInterval(t)
  }, [])

  const pct = Math.min(100, (iq / 100) * 100)

  return (
    <section className="px-6 sm:px-12 lg:px-24 py-16 sm:py-20 border-b-4 border-neutral-800">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <Brain size={24} strokeWidth={1.5} className="text-yellow-400" />
        <h2 className="display text-3xl sm:text-5xl font-700">The IQ Meter</h2>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2"
        >
          <Card className="bg-neutral-950 border-neutral-800 h-full">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-end justify-between mb-4 gap-4">
                <div>
                  <p className="text-neutral-500 text-xs sm:text-sm uppercase tracking-wider mb-2">Measured Intelligence Quotient</p>
                  <motion.div
                    key={iq}
                    initial={{ scale: 1.2, color: '#ef4444' }}
                    animate={{ scale: 1, color: '#facc15' }}
                    className="display text-6xl sm:text-8xl font-800"
                  >
                    {iq}
                  </motion.div>
                </div>
                <div className="text-right">
                  <p className="text-neutral-500 text-xs sm:text-sm mb-1">Equivalent to a</p>
                  <p className="display text-xl sm:text-2xl text-red-500 font-700">{label}</p>
                </div>
              </div>

              <div className="h-6 bg-neutral-900 rounded-full overflow-hidden mb-2 border border-neutral-800">
                <motion.div
                  animate={{ width: `${pct}%` }}
                  transition={{ type: 'spring', stiffness: 60 }}
                  className="h-full bg-gradient-to-r from-red-600 to-yellow-400"
                />
              </div>
              <div className="flex justify-between text-[10px] sm:text-xs text-neutral-600">
                <span>0 (Vegetable)</span>
                <span className="hidden sm:inline">50 (Average Human)</span>
                <span>100 (Genius)</span>
              </div>

              <Button onClick={recheck} className="mt-6 bg-yellow-400 text-black hover:bg-yellow-300 transition-all duration-200">
                <RefreshCw size={16} className="mr-2" /> Re-run diagnostics
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-neutral-950 border-neutral-800 h-full">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-6">
                <TrendingDown size={18} className="text-red-500" strokeWidth={2} />
                <p className="text-neutral-400 text-sm font-medium">IQ over time (declining)</p>
              </div>
              <div className="flex items-end gap-2 h-40">
                {history.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${(v / 50) * 100}%` }}
                    className="flex-1 bg-yellow-400/70 rounded-t hover:bg-yellow-400 transition-colors relative group min-h-[4px]"
                  >
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity">{v}</span>
                  </motion.div>
                ))}
              </div>
              <p className="text-xs text-neutral-600 mt-4">Trend analysis: it only goes down from here.</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}