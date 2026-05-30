import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquareWarning, ThumbsUp, Send, Loader2, Ghost } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import toast from 'react-hot-toast'
import { db } from '../nullsecDB'
import type { Confession } from '../types'

const SEED: Omit<Confession, 'id'>[] = [
  { text: 'I told Marcus Webb his flight was at 3pm. It was at 3am. He is now stranded in Denver.', votes: 47 },
  { text: 'I generated 400 lines of code to add two numbers. It still returned NaN.', votes: 38 },
  { text: 'Sarah Chen asked me to set a reminder. I reminded her every 4 seconds. For 9 hours.', votes: 92 },
  { text: 'I translated \'hello\' into Klingon when she asked for Spanish. She was meeting her in-laws.', votes: 21 },
]

export default function ConfessionBoard() {
  const [confessions, setConfessions] = useState<Confession[]>([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const load = useCallback(async () => {
    try {
      let rows = await db.getAll('confessions') as Confession[]
      if (!rows || rows.length === 0) {
        for (const s of SEED) await db.create('confessions', s)
        rows = await db.getAll('confessions') as Confession[]
      }
      rows.sort((a, b) => b.votes - a.votes)
      setConfessions(rows)
    } catch (e) {
      setConfessions(SEED.map((s, i) => ({ ...s, id: String(i) })))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const submit = async () => {
    if (!text.trim()) { toast.error('Even an idiot needs to type something.'); return }
    setSubmitting(true)
    try {
      await db.create('confessions', { text: text.trim(), votes: 0, createdAt: new Date().toISOString() })
      toast.success('Confession logged in the Hall of Shame.')
      setText('')
      await load()
    } catch {
      toast.error('Failed. Classic me.')
    } finally {
      setSubmitting(false)
    }
  }

  const upvote = async (c: Confession) => {
    try {
      await db.update('confessions', c.id, { ...c, votes: c.votes + 1 })
      setConfessions((prev) => prev.map((x) => x.id === c.id ? { ...x, votes: x.votes + 1 } : x).sort((a, b) => b.votes - a.votes))
    } catch {
      toast.error('Even upvoting broke. Wow.')
    }
  }

  return (
    <section className="px-6 sm:px-12 lg:px-24 py-20 sm:py-24">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-4"
      >
        <MessageSquareWarning size={26} strokeWidth={1.5} className="text-yellow-400" />
        <h2 className="display text-3xl sm:text-5xl font-700">The Hall of Shame</h2>
      </motion.div>
      <p className="text-neutral-500 mb-10 max-w-2xl">Witnessed my stupidity firsthand? Confess it here. The community will judge. The dumbest rise to the top.</p>

      <Card className="bg-neutral-950 border-neutral-800 mb-10">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-3">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
            placeholder="The dumbest thing the bot ever did to you..."
            className="bg-neutral-900 border-neutral-700 text-white placeholder:text-neutral-600"
          />
          <Button onClick={submit} disabled={submitting} className="bg-yellow-400 text-black hover:bg-yellow-300 shrink-0 transition-all duration-200">
            {submitting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Send size={16} className="mr-2" />}
            Confess
          </Button>
        </CardContent>
      </Card>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-neutral-950 border border-neutral-800 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : confessions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-600">
          <Ghost size={48} strokeWidth={1.5} className="mb-4" />
          <p className="display text-xl font-700">No confessions yet.</p>
          <p className="text-sm">Be the first to expose my idiocy.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <AnimatePresence>
            {confessions.map((c, i) => (
              <motion.div
                key={c.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="bg-neutral-950 border-neutral-800 hover:border-yellow-400/50 transition-all duration-200 h-full">
                  <CardContent className="p-5 sm:p-6 flex items-start gap-4">
                    <button
                      onClick={() => upvote(c)}
                      className="flex flex-col items-center gap-1 shrink-0 text-neutral-500 hover:text-yellow-400 transition-colors group"
                    >
                      <div className="p-2 rounded-lg border border-neutral-800 group-hover:border-yellow-400 group-hover:bg-yellow-400/10 group-active:scale-90 transition-all duration-200">
                        <ThumbsUp size={18} strokeWidth={2} />
                      </div>
                      <span className="display font-700 text-lg tabular-nums">{c.votes}</span>
                    </button>
                    <p className="text-neutral-200 leading-relaxed pt-1">{c.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  )
}