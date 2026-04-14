const items = [
  'React / Next.js', 'AI Agents', 'LLM', 'MCP', 'Three.js', 'Processing', 
  'Arduino', 'n8n', 'Supabase', 'AWS', 'Node.js', 'Python',
]

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border/30 py-3 bg-surface/20">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span 
            key={i} 
            className={`whitespace-nowrap px-8 font-mono text-[10px] tracking-[0.2em] uppercase ${
              i % 3 === 0 ? 'text-accent' : 'text-textMuted/40'
            }`}
          >
            {i % 3 === 0 ? '✦ ' : '· '}{item}
          </span>
        ))}
      </div>
    </div>
  )
}