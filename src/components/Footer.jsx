export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#F2EFE6', borderTop: '1px solid #C9C5B6' }}>
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ maxWidth: '1600px' }}>
        <span className="rbt-mark">RBT.</span>
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase" style={{ color: '#6E6E64' }}>
          © 2025 · Barcelona · Spain
        </span>
      </div>
    </footer>
  )
}
