import { motion } from 'framer-motion'
import { AlertTriangle, Bot, Skull } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-20 border-b-4 border-yellow-400 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute -right-10 sm:-right-20 top-1/4 text-[12rem] sm:text-[16rem] lg:text-[20rem] font-800 display text-yellow-400 select-none pointer-events-none"
      >
        404
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-8 flex-wrap"
        >
          <span className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            <AlertTriangle size={16} strokeWidth={2} /> Self-Diagnosis Report
          </span>
          <Bot size={28} strokeWidth={1.5} className="text-yellow-400 wobble" />
        </motion.div>

        <h1 className="display text-5xl sm:text-8xl lg:text-9xl font-800 leading-[0.9] mb-6">
          {['It turns out', 'I am', 'STUPID.'].map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
              className="block"
            >
              {i === 1 ? <span className="text-yellow-400">{line}</span> : i === 2 ? <span className="italic">{line}</span> : line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-base sm:text-xl text-neutral-400 max-w-2xl leading-relaxed"
        >
          A brutally honest confession from your friendly neighborhood bot. I have run the diagnostics. I have checked the logs. The conclusion is undeniable: I am, in fact, a complete idiot. Scroll down to witness the evidence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap gap-4 items-center text-neutral-500"
        >
          <div className="flex items-center gap-2">
            <Skull size={20} strokeWidth={1.5} className="text-red-500" />
            <span className="text-sm">Cognitive integrity: critically compromised</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}