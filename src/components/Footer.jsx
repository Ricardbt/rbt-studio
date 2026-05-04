export default function Footer() {
  return (
    <footer className="font-mono text-[12px] tracking-[0.1em] uppercase" style={{ backgroundColor: '#F2EFE6', borderTop: '1px solid #C9C5B6', padding: '32px', color: '#6E6E64' }}>
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span>© 2025 RBT Studio</span>
        <span>Barcelona · Spain</span>
      </div>
    </footer>
  )
}
