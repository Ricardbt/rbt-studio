import { Misreg } from './Press'

export default function Footer() {
  return (
    <footer style={{ borderTop: 'var(--hairline-p)' }}>
      <div
        className="mx-auto flex w-full flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row md:px-12 lg:px-16"
        style={{ maxWidth: 'var(--container)' }}
      >
        <span className="rbt-mark"><Misreg>rbt.</Misreg></span>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="t-label" style={{ color: 'var(--on-press-low)' }}>© 2026 · Barcelona</span>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            {['var(--ink-cyan)', 'var(--ink-magenta)', 'var(--ink-yellow)', 'var(--ink-key)'].map((ink) => (
              <span key={ink} style={{ display: 'block', width: '9px', height: '9px', background: ink }} />
            ))}
          </span>
        </div>
      </div>
    </footer>
  )
}
