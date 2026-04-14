const items = [
  'React / Next.js', 'AI Agents', 'LLM Integration', 'MCP Architecture',
  'Three.js / WebGL', 'Processing Animations', 'Arduino', 'n8n Automation',
  'Supabase', 'AWS Infrastructure', 'Node.js', 'Python AI Pipelines',
]

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-border py-4 bg-surface">
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span 
            key={i} 
            className={`whitespace-nowrap px-10 font-mono text-[11px] tracking-widest uppercase ${
              i % 3 === 0 ? 'text-accent' : 'text-textMuted'
            }`}
          >
            {i % 3 === 0 ? '✦ ' : '· '}{item}
          </span>
        ))}
      </div>
    </div>
  )
}