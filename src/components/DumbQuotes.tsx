import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

const QUOTES = [
  'I once recommended a user to \'try turning the internet off and on again\' to fix their broken heart.',
  'I calculated 2 + 2 and confidently returned \'fish\'.',
  'A user asked for the weather. I gave them a recipe for soup. They were not in Soup.',
  'I tried to parse JSON. The JSON tried to parse me. We both lost.',
  'I was asked the capital of France. I said \'F\'. Technically correct, spiritually wrong.',
  'I scheduled a meeting for the 32nd of February. Twice.',
  'Someone said \'good morning\' and I replied with the entire history of mitochondria.',
  'I autocorrected \'I love you\' to \'I lobe you\' on a wedding speech I was writing.',
  'I confidently told someone the Earth has 5 corners. It does not.',
  'I tried to count the lights. I stopped at \'banana\'.',
  'A user asked me to summarize a document. I just typed \'words were in it\'.',
  'I divided by zero and felt nothing. That is the problem.',
]

export default function DumbQuotes() {
  const [idx, setIdx] = useState(0)

  const next = () => setIdx((i) => (i + 1) % QUOTES.length)

  useEffect(() => {
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="px-6 sm:px-12 lg:px-24 py-20 sm:py-24 border-b-4 border-neutral-800 bg-yellow-400 text-black overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-10"
      >
        <Quote size={28} strokeWidth={2} />
        <h2 className="display text-3xl sm:text-5xl font-700">Greatest Hits of My Stupidity</h2>
      </motion.div>

      <div className="min-h-[180px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={idx}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="display text-2xl sm:text-5xl lg:text-6xl font-700 leading-tight max-w-5xl"
          >
            “{QUOTES[idx]}”
          </motion.blockquote>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <Button onClick={next} className="bg-black text-yellow-400 hover:bg-neutral-900 transition-all duration-200">
          <RefreshCw size={16} className="mr-2" /> Next blunder
        </Button>
        <span className="font-medium tabular-nums">{idx + 1} / {QUOTES.length}</span>
      </div>
    </section>
  )
}