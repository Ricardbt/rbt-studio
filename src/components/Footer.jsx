export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 lg:px-20 bg-bg border-t border-border/20">
      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-mono text-[10px] tracking-widest uppercase text-textMuted/50">
          © 2025 RBT Studio
        </span>
        <span className="font-mono text-[10px] tracking-wider text-textMuted/50">
          Barcelona · Spain
        </span>
      </div>
    </footer>
  )
}