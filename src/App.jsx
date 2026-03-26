import { useState, useEffect, useRef } from 'react'
import apexLogo from './assets/icon copy.png'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Dumbbell, TrendingUp, ChevronRight,
  Zap, BarChart3, Activity, Github,
  Check, Sparkles, Timer,
  Bot, Trophy,
} from 'lucide-react'

// ─── Animation Variants ──────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useScrollInView(threshold = 0.15) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  return [ref, inView]
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Orb({ className }) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl opacity-20 ${className}`}
      style={{ animation: 'orb-move 12s ease-in-out infinite' }}
    />
  )
}

function SectionLabel({ children }) {
  return (
    <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6">
      <Sparkles size={12} className="text-apex-cyan" />
      <span className="text-xs font-semibold tracking-widest uppercase text-apex-cyan">{children}</span>
    </div>
  )
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}
    >
      <div className={`mx-4 sm:mx-8 lg:mx-auto lg:max-w-6xl rounded-2xl transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-black/40' : ''}`}>
        <div className="flex items-center justify-between px-5 py-3">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.04 }} className="flex items-center">
            <img src={apexLogo} alt="Apex" className="h-10 w-auto" style={{ mixBlendMode: 'screen' }} />
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Features', 'Preview', 'FAQ'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-medium tracking-wide"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <motion.a
            href="https://github.com/alpgi1/apex-coach"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="hidden md:flex items-center gap-2 glass border border-white/[0.12] rounded-xl px-4 py-2 text-sm font-semibold text-white/60 hover:text-white hover:border-white/30 transition-all duration-200"
          >
            <Github size={14} />
            View Source
          </motion.a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-white block transition-all" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-white block transition-all" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-white block transition-all" />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden px-5 pb-4"
            >
              {['Features', 'Preview', 'FAQ'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="block py-2.5 text-white/60 hover:text-white text-sm font-medium"
                >
                  {link}
                </a>
              ))}
              <a
                href="https://github.com/alpgi1/apex-coach"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-3 text-white/50 text-sm"
              >
                <Github size={14} /> View Source
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setEmail('')
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      <Orb className="w-96 h-96 bg-apex-red top-20 -left-20" />
      <Orb className="w-80 h-80 bg-apex-cyan bottom-20 -right-10" style={{ animationDelay: '-4s' }} />
      <Orb className="w-64 h-64 bg-purple-600 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '-8s' }} />

      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 text-center">
        {/* Badge */}
        <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 mb-10">
          <span className="w-2 h-2 rounded-full bg-apex-cyan animate-pulse" />
          <span className="text-xs font-semibold text-apex-cyan tracking-widest uppercase">iOS · Coming Soon</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp} custom={1} initial="hidden" animate="visible"
          className="text-5xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6"
        >
          <span className="block text-white">Train With</span>
          <span className="block text-gradient-red mt-1">Purpose.</span>
          <span className="block text-white mt-2">Progress With</span>
          <span className="block text-gradient-cyan mt-1">Precision.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={fadeUp} custom={2} initial="hidden" animate="visible"
          className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
        >
          Offline-first, RPE-driven training app with a built-in AI coach that has full context
          of your entire training history. No guesswork. Just data.
        </motion.p>

        {/* Email form */}
        <motion.form
          variants={fadeUp} custom={3} initial="hidden" animate="visible"
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 glass rounded-xl px-5 py-4 text-sm text-white placeholder-white/30 outline-none border border-white/[0.08] focus:border-apex-red/60 transition-all duration-300 bg-transparent"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(255,77,77,0.55)' }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary text-white whitespace-nowrap flex items-center justify-center gap-2 px-7 py-4"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="flex items-center gap-2">
                  <Check size={16} /> You're In!
                </motion.span>
              ) : (
                <motion.span key="cta" className="flex items-center gap-2">
                  Notify Me at Launch <ChevronRight size={16} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        {/* Pills */}
        <motion.div
          variants={fadeUp} custom={4} initial="hidden" animate="visible"
          className="flex flex-wrap items-center justify-center gap-3 mt-14"
        >
          {[
            { icon: Dumbbell, label: 'RPE Tracking', color: 'text-apex-red', border: 'border-apex-red/30 hover:border-apex-red/60' },
            { icon: Bot, label: 'Apex AI Coach', color: 'text-apex-cyan', border: 'border-apex-cyan/30 hover:border-apex-cyan/60' },
            { icon: TrendingUp, label: 'Overload Engine', color: 'text-purple-400', border: 'border-purple-400/30 hover:border-purple-400/60' },
          ].map(({ icon: Icon, label, color, border }) => (
            <motion.div key={label} whileHover={{ scale: 1.05 }}
              className={`flex items-center gap-2 glass px-5 py-2.5 rounded-full border ${border} transition-all duration-300`}>
              <Icon size={15} className={color} />
              <span className={`text-sm font-semibold ${color}`}>{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Feature Mock UIs ─────────────────────────────────────────────────────────

function AIChatMockUI() {
  const messages = [
    { role: 'user', text: 'Am I ready to increase bench press?' },
    {
      role: 'ai',
      text: 'Your last 4 bench sessions show RPE trending down from 8.5 → 7.0 at 100 kg × 5. Clear adaptation signal. Try 102.5 kg next session and target RPE 8.',
    },
    { role: 'ai', text: 'Volume trend over the last 4 weeks: +22% ↑', highlight: true },
  ]

  return (
    <div className="mt-4 space-y-2.5">
      {messages.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.18 }}
          className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {m.role === 'ai' && (
            <div className="w-6 h-6 rounded-lg flex items-center justify-center mr-2 mt-0.5 shrink-0"
              style={{ background: 'linear-gradient(135deg, rgba(0,210,211,0.3), rgba(0,210,211,0.1))', border: '1px solid rgba(0,210,211,0.3)' }}>
              <Zap size={11} className="text-apex-cyan" />
            </div>
          )}
          <div className={`max-w-[76%] rounded-2xl px-3.5 py-2.5 text-[11px] leading-relaxed ${
            m.role === 'user'
              ? 'bg-apex-red/20 border border-apex-red/25 text-white/80 rounded-br-sm'
              : 'bg-white/[0.05] border border-white/[0.08] text-white/70 rounded-bl-sm'
          } ${m.highlight ? 'text-apex-cyan font-semibold' : ''}`}>
            {m.text}
          </div>
        </motion.div>
      ))}

      {/* Typing indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
        className="flex items-center gap-1.5 pl-8"
      >
        {[0, 0.15, 0.3].map((d, i) => (
          <motion.div key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: d }}
            className="w-1.5 h-1.5 rounded-full bg-apex-cyan/50"
          />
        ))}
      </motion.div>

      <div className="flex items-center gap-1.5 pl-1 pt-1">
        <span className="text-[9px] text-white/20">Powered by</span>
        <span className="text-[9px] text-white/30 font-semibold tracking-wide">Gemini 2.5 Flash</span>
      </div>
    </div>
  )
}

function RPEMockUI() {
  const sets = [
    { w: 100, r: 5, rpe: 8.0, done: true },
    { w: 100, r: 5, rpe: 8.5, done: true },
    { w: 100, r: 4, rpe: null, done: false },
  ]

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-white/40 font-medium">Squat — Today</span>
        <span className="text-xs text-apex-red font-semibold">Set 3 / 4</span>
      </div>

      {sets.map((s, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.12 }}
          className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 border ${
            !s.done
              ? 'border-apex-red/40 bg-apex-red/10'
              : 'border-white/[0.06] bg-white/[0.03]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/30 w-4">S{i + 1}</span>
            <span className="text-xs font-bold text-white">{s.w} kg</span>
            <span className="text-[10px] text-white/30">×</span>
            <span className="text-xs font-bold text-white/80">{s.r} reps</span>
          </div>

          {s.done ? (
            <div className="flex items-center gap-1 bg-white/[0.06] rounded-lg px-2.5 py-1">
              <span className="text-[10px] text-white/40">RPE</span>
              <span className="text-[10px] font-bold text-apex-red">{s.rpe}</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-0.5">
              <span className="text-[8px] text-white/25 mb-0.5">RPE</span>
              {[7.5, 8, 8.5].map((v) => (
                <span key={v} className={`text-[10px] font-bold leading-tight ${v === 8 ? 'text-apex-red' : 'text-white/20'}`}>{v}</span>
              ))}
            </div>
          )}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
        className="flex items-center justify-between glass-strong rounded-xl p-3 border border-apex-red/20 mt-1"
      >
        <div className="flex items-center gap-2">
          <TrendingUp size={11} className="text-apex-red" />
          <span className="text-[11px] text-white/50">Volume PR Today</span>
        </div>
        <span className="text-[11px] font-bold text-apex-red">+8.2% ↑</span>
      </motion.div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div className="glass rounded-2xl p-4 border border-white/[0.06] flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: color + '22' }}>
          <Icon size={14} style={{ color }} />
        </div>
        <span className="text-xs text-white/50 font-medium">{label}</span>
      </div>
      <div>
        <div className="text-2xl font-black text-white">{value}</div>
        <div className="text-xs text-white/40 mt-0.5">{sub}</div>
      </div>
    </div>
  )
}

// ─── Features Section ─────────────────────────────────────────────────────────

function FeaturesSection() {
  const [ref, inView] = useScrollInView()

  return (
    <section id="features" className="relative py-24 px-4 sm:px-8" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>Features</SectionLabel>
          </motion.div>
          <motion.h2 variants={fadeUp} custom={1}
            className="text-4xl sm:text-5xl font-black text-white leading-tight">
            Built for Athletes Who{' '}
            <span className="text-gradient-red">Take Data Seriously</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2}
            className="text-white/40 mt-4 max-w-xl mx-auto text-lg">
            RPE-based progression, real AI coaching, and deep analytics — all offline-first.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5"
        >
          {/* Apex AI Coach (large) */}
          <motion.div
            variants={scaleIn}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 40px rgba(0,210,211,0.3), 0 0 80px rgba(0,210,211,0.1)',
              borderColor: 'rgba(0,210,211,0.5)',
            }}
            className="lg:col-span-2 relative glass rounded-3xl p-6 border border-white/[0.08] overflow-hidden transition-all duration-300 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-apex-cyan/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(0,210,211,0.3), rgba(0,210,211,0.1))', border: '1px solid rgba(0,210,211,0.3)' }}>
                  <Bot size={18} className="text-apex-cyan" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-apex-cyan tracking-widest uppercase">Apex AI</div>
                  <h3 className="text-lg font-bold text-white">Your Personal Coach</h3>
                </div>
              </div>
              <p className="text-sm text-white/40 mb-2 leading-relaxed">
                Gemini-powered AI with full read access to your training history. Ask about overtraining,
                next session targets, or get a full weekly analysis.
              </p>
              <AIChatMockUI />
            </div>
          </motion.div>

          {/* RPE Tracking */}
          <motion.div
            variants={scaleIn}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 0 40px rgba(255,77,77,0.3), 0 0 80px rgba(255,77,77,0.1)',
              borderColor: 'rgba(255,77,77,0.5)',
            }}
            className="relative glass rounded-3xl p-6 border border-white/[0.08] overflow-hidden transition-all duration-300 cursor-pointer"
          >
            <div className="absolute top-0 left-0 w-48 h-48 bg-apex-red/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, rgba(255,77,77,0.3), rgba(255,77,77,0.1))', border: '1px solid rgba(255,77,77,0.3)' }}>
                  <Dumbbell size={18} className="text-apex-red" />
                </div>
                <div>
                  <div className="text-[10px] font-semibold text-apex-red tracking-widest uppercase">RPE Based</div>
                  <h3 className="text-lg font-bold text-white">Log Every Set</h3>
                </div>
              </div>
              <p className="text-sm text-white/40 leading-relaxed">
                Log RPE per set with half-point precision via an iOS-style drum roll picker.
                The only metric that captures both load and fatigue.
              </p>
              <RPEMockUI />
            </div>
          </motion.div>

          {/* Stat cards */}
          {[
            { icon: TrendingUp, label: 'Overload Engine', value: 'Smart', sub: 'Weight & rep suggestions from your own data', color: '#ff4d4d' },
            { icon: BarChart3, label: 'Body Heat Map', value: '7-Day', sub: 'Front & back muscle coverage visualization', color: '#00d2d3' },
            { icon: Trophy, label: 'Personal Records', value: 'Auto', sub: 'Max weight, 1RM (Epley formula), best set', color: '#a855f7' },
          ].map((s) => (
            <motion.div key={s.label} variants={scaleIn} whileHover={{ scale: 1.04, y: -4 }}>
              <StatCard {...s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── App Preview Section ──────────────────────────────────────────────────────

function PhoneMockup({ src, alt }) {
  return (
    <div
      className="relative rounded-[2.2rem] overflow-hidden border-2 border-white/10"
      style={{
        background: '#060a14',
        boxShadow: '0 0 50px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.08)',
      }}
    >
      <img src={src} alt={alt} className="w-full block" />
    </div>
  )
}

function SneakPeekSection() {
  const [ref, inView] = useScrollInView()

  const features = [
    { icon: Zap, title: 'Instant Logging', desc: 'Log a full workout in under 60 seconds with smart pre-fill from your last session.', color: '#ff4d4d' },
    { icon: BarChart3, title: 'Volume Analytics', desc: 'See how your total volume, frequency, and intensity trend week over week.', color: '#00d2d3' },
    { icon: Timer, title: 'Rest Timer', desc: 'Auto-start rest timers between sets so you never lose count between heavy lifts.', color: '#f59e0b' },
    { icon: Activity, title: 'Training Reminders', desc: 'Smart notifications fire 48 hours after your last session to keep you consistent.', color: '#a855f7' },
  ]

  return (
    <section id="preview" className="relative py-24 px-4 sm:px-8 overflow-hidden" ref={ref}>
      <Orb className="w-96 h-96 bg-apex-cyan -bottom-20 -left-20 opacity-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}>
            <motion.div variants={fadeUp}>
              <SectionLabel>App Preview</SectionLabel>
            </motion.div>
            <motion.h2 variants={fadeUp} custom={1}
              className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
              Built for the<br />
              <span className="text-gradient-cyan">Relentless.</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2}
              className="text-white/40 text-lg leading-relaxed mb-10">
              Every screen is designed for the serious lifter. Clean, fast, and distraction-free.
              Your full training history is always one tap away.
            </motion.p>

            <motion.div variants={stagger} className="space-y-4">
              {features.map((f, i) => (
                <motion.div key={f.title} variants={fadeUp} custom={i + 3}
                  whileHover={{ x: 6, backgroundColor: 'rgba(255,255,255,0.04)' }}
                  className="flex items-start gap-4 rounded-2xl p-4 transition-all duration-300 border border-transparent hover:border-white/[0.06]">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                    style={{ backgroundColor: f.color + '22', border: `1px solid ${f.color}44` }}>
                    <f.icon size={16} style={{ color: f.color }} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white mb-1">{f.title}</div>
                    <div className="text-sm text-white/40 leading-relaxed">{f.desc}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: screenshots */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex items-end justify-center gap-3"
          >
            <div className="absolute inset-0 bg-apex-red/10 blur-3xl rounded-full scale-75 pointer-events-none" />

            {/* Left phone — Analyse / Heat Map */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="relative z-10 w-[30%] opacity-75"
              style={{ transform: 'rotate(-5deg) translateY(24px)' }}
            >
              <PhoneMockup src="/screenshots/IMG_7279.PNG" alt="Analyse & Heat Map" />
            </motion.div>

            {/* Center phone — Home / Dashboard */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-20 w-[38%]"
            >
              <PhoneMockup src="/screenshots/IMG_7277.PNG" alt="Dashboard" />
            </motion.div>

            {/* Right phone — Apex AI */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="relative z-10 w-[30%] opacity-75"
              style={{ transform: 'rotate(5deg) translateY(24px)' }}
            >
              <PhoneMockup src="/screenshots/IMG_7278.PNG" alt="Apex AI Coach" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────

function FAQSection() {
  const [open, setOpen] = useState(null)
  const [ref, inView] = useScrollInView()

  const faqs = [
    {
      q: 'When is Apex launching?',
      a: 'Apex is launching on iOS soon. Android support is planned for a later release. Sign up above to be notified the moment it goes live on the App Store.',
    },
    {
      q: 'Will it be free?',
      a: 'Apex is completely free to use. All features — including RPE tracking, AI coaching, volume analytics, and cloud sync — are available at no cost.',
    },
    {
      q: 'What is RPE and why does it matter?',
      a: 'RPE (Rate of Perceived Exertion) is a 1–10 scale that captures how hard a set actually felt. Unlike raw weight, RPE accounts for daily fatigue, sleep quality, and stress — giving the overload engine real signals to work with instead of blindly incrementing numbers.',
    },
    {
      q: 'What can the AI coach actually do?',
      a: "Apex AI is powered by Gemini 2.5 Flash and has full read access to your training history — every session, exercise, set, and RPE you've ever logged. Ask it if you're overtraining, what to lift next session, or to analyze a full month of training.",
    },
    {
      q: 'Does it work without internet?',
      a: 'Yes. Apex is offline-first — your data lives in a local SQLite database on your device. Everything syncs to the cloud automatically when connected. AI coaching requires an active internet connection.',
    },
  ]

  return (
    <section id="faq" className="py-24 px-4 sm:px-8" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
          className="text-center mb-14"
        >
          <motion.div variants={fadeUp}><SectionLabel>FAQ</SectionLabel></motion.div>
          <motion.h2 variants={fadeUp} custom={1} className="text-4xl sm:text-5xl font-black text-white">
            Got Questions?
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger}
          className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={fadeUp} custom={i}>
              <motion.div
                onClick={() => setOpen(open === i ? null : i)}
                className="glass rounded-2xl border border-white/[0.08] overflow-hidden cursor-pointer"
                whileHover={{ borderColor: 'rgba(255,77,77,0.3)' }}
              >
                <div className="flex items-center justify-between p-5">
                  <span className="text-sm font-semibold text-white">{faq.q}</span>
                  <motion.div animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronRight size={16} className="text-white/40 shrink-0" />
                  </motion.div>
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed border-t border-white/[0.05] pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <img src={apexLogo} alt="Apex" className="h-12 w-auto" style={{ mixBlendMode: 'screen' }} />
            <p className="text-sm text-white/30 italic font-light">"Built for the relentless."</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <motion.a
              href="https://github.com/alpgi1/apex-coach"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200"
            >
              <Github size={15} />
              Source Code
            </motion.a>
            <a
              href="/privacy.html"
              className="text-sm text-white/40 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/25 text-center md:text-right">
            © {new Date().getFullYear()} Apex. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── Background Particles ─────────────────────────────────────────────────────

function FloatingParticles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 6 + 5,
    delay: Math.random() * 4,
    color: i % 2 === 0 ? '#ff4d4d' : '#00d2d3',
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
          animate={{ y: [-20, 20, -20], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" />
      <FloatingParticles />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <SneakPeekSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
