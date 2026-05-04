const items = [
  'React / Next.js', 'AI Agents', 'LLM', 'MCP', 'Three.js', 'Processing', 
  'Arduino', 'n8n', 'Supabase', 'AWS', 'Node.js', 'Python',
]

export default function Marquee() {
  return (
    <div className="overflow-hidden py-3" style={{ borderTop: '1px solid #C9C5B6', borderBottom: '1px solid #C9C5B6', backgroundColor: '#F2EFE6' }}>
      <div className="flex w-max animate-marquee">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="whitespace-nowrap px-8 font-mono text-[14px] tracking-[0.05em] uppercase"
            style={{
              color: i % 3 === 0 ? '#0E4A35' : '#6E6E64',
            }}
          >
            {i % 3 === 0 ? '✦ ' : '· '}{item}
          </span>
        ))}
      </div>
    </div>
  )
}