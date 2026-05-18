import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CV() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      gsap.fromTo('.cv-section',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.cv-content',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: '#F2EFE6' }}>
      <div className="relative z-10 w-full mx-auto px-4 sm:px-8 lg:px-16" style={{ maxWidth: '1200px' }}>
        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16 lg:mb-24 pb-10 md:pb-16" style={{ borderBottom: '1px solid #C9C5B6' }}>
          <p className="font-mono text-[12px] tracking-[0.18em] uppercase mb-4" style={{ color: '#0E4A35' }}>
            Curriculum Vitae
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[0.95] mb-2" style={{ color: '#14140F' }}>
            Ricard Boixeda Tamburini
          </h1>
          <p className="font-sans text-lg mb-8" style={{ color: '#6E6E64' }}>
            Experience Engineer · Frontend · Product · AI-native systems · UX
          </p>

          {/* Contact Info */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontFamily: 'JetBrains Mono', fontSize: '13px' }}>
            <span style={{ color: '#3A3A33' }}>Barcelona, Spain</span>
            <span style={{ color: '#3A3A33' }}>ricardboixeda@gmail.com</span>
            <span style={{ color: '#3A3A33' }}>+34 635 642 322</span>
            <span style={{ color: '#0E4A35' }}>github.com/Ricardbt</span>
          </div>
        </div>

        {/* Professional Summary */}
        <div className="cv-section opacity-0 mb-12 md:mb-16 pb-10 md:pb-14" style={{ borderBottom: '1px solid #C9C5B6' }}>
          <p className="font-mono text-[11px] tracking-[0.12em] uppercase mb-6" style={{ color: '#0E4A35' }}>
            Professional Summary
          </p>
          <p className="font-sans text-base leading-relaxed" style={{ color: '#3A3A33', maxWidth: '900px' }}>
            Experience Engineer with 10+ years translating complex systems into clear, usable and sophisticated digital products. My background combines Fine Arts, frontend engineering, product thinking and AI-native interfaces — a profile built around understanding how things should <em>feel</em> to use, not just how they work. I design and build frontend systems where interaction, motion and UX clarity are as deliberate as the architecture behind them. Comfortable owning the full product surface: from design systems and component architecture to AI-powered interfaces and creative technology.
          </p>
        </div>

        {/* CV Content */}
        <div className="cv-content grid grid-cols-1 lg:grid-cols-2" style={{ gap: '64px', marginBottom: '80px' }}>
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {/* Experiencia */}
            <div className="cv-section opacity-0">
              <div style={{ marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #C9C5B6' }}>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: '#0E4A35' }}>
                  Professional Experience
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                <div>
                  <h3 className="font-sans text-lg font-semibold mb-1" style={{ color: '#14140F' }}>
                    Lead Full Stack Developer
                  </h3>
                  <p className="font-mono text-sm mb-3" style={{ color: '#0E4A35' }}>
                    Paladini Digital Solutions · 2024 – Present
                  </p>
                  <ul className="font-sans text-sm space-y-2 leading-relaxed" style={{ color: '#3A3A33' }}>
                    <li>• Defined and evolved solution architecture for Node.js / React / Next.js platforms</li>
                    <li>• Built and owned automation pipelines and system integrations end-to-end</li>
                    <li>• Reduced delivery time by ~40% implementing CI/CD pipelines and DevOps workflows</li>
                    <li>• Mentored engineers and fostered tech-led culture across the team</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-lg font-semibold mb-1" style={{ color: '#14140F' }}>
                    Senior Full Stack Developer & Consultant
                  </h3>
                  <p className="font-mono text-sm mb-3" style={{ color: '#0E4A35' }}>
                    Freelance · 2019 – 2024
                  </p>
                  <ul className="font-sans text-sm space-y-2 leading-relaxed" style={{ color: '#3A3A33' }}>
                    <li>• Designed enterprise REST/GraphQL integration architectures for high-traffic clients</li>
                    <li>• Deployed and maintained AWS cloud infrastructures with full CI/CD pipelines</li>
                    <li>• Led Drupal 7 → 9/10 migrations at scale, ensuring zero downtime</li>
                    <li>• Applied Redis and Varnish caching for significant performance improvements</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-sans text-lg font-semibold mb-1" style={{ color: '#14140F' }}>
                    Web Developer
                  </h3>
                  <p className="font-mono text-sm mb-3" style={{ color: '#0E4A35' }}>
                    University of Barcelona · 2014 – 2019
                  </p>
                  <ul className="font-sans text-sm space-y-2 leading-relaxed" style={{ color: '#3A3A33' }}>
                    <li>• Developed enterprise-level platforms on Drupal and WordPress</li>
                    <li>• Improved UX, performance, and WCAG accessibility standards</li>
                    <li>• Trained and mentored internal teams on web technologies</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {/* Technical Skills */}
            <div className="cv-section opacity-0">
              <div style={{ marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #C9C5B6' }}>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: '#0E4A35' }}>
                  Technical Skills
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] uppercase mb-3" style={{ color: '#0E4A35' }}>
                    Core Stack
                  </p>
                  <p className="font-sans text-sm" style={{ color: '#3A3A33' }}>
                    Node.js · React.js · Next.js · TypeScript · JavaScript (ES6+) · REST APIs · GraphQL
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] uppercase mb-3" style={{ color: '#0E4A35' }}>
                    Frontend
                  </p>
                  <p className="font-sans text-sm" style={{ color: '#3A3A33' }}>
                    React Native · Tailwind CSS · SCSS · WebGL / Three.js · Component Architecture
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] uppercase mb-3" style={{ color: '#0E4A35' }}>
                    Backend & DB
                  </p>
                  <p className="font-sans text-sm" style={{ color: '#3A3A33' }}>
                    Python · PHP · Supabase · PostgreSQL · MySQL · Microservices · Event-driven Architecture
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] uppercase mb-3" style={{ color: '#0E4A35' }}>
                    Cloud / DevOps
                  </p>
                  <p className="font-sans text-sm" style={{ color: '#3A3A33' }}>
                    AWS (EC2, S3, RDS, CloudFront) · Docker · CI/CD (GitHub Actions, GitLab CI) · Redis · Varnish
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] uppercase mb-3" style={{ color: '#0E4A35' }}>
                    CMS & Platforms
                  </p>
                  <p className="font-sans text-sm" style={{ color: '#3A3A33' }}>
                    Headless CMS · Drupal 8–11 · WordPress (custom + headless) · API-first architecture
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-[0.1em] uppercase mb-3" style={{ color: '#0E4A35' }}>
                    AI & Automation
                  </p>
                  <p className="font-sans text-sm" style={{ color: '#3A3A33' }}>
                    LLM Integration · AI Agents · Workflow Automation (n8n, Make) · MCP Architecture
                  </p>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="cv-section opacity-0">
              <div style={{ marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #C9C5B6' }}>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: '#0E4A35' }}>
                  Selected Projects
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div>
                  <h3 className="font-sans text-base font-semibold mb-2" style={{ color: '#14140F' }}>
                    StoryPrint AI
                  </h3>
                  <p className="font-mono text-xs mb-3" style={{ color: '#6E6E64' }}>
                    Next.js · Node.js · Supabase · LLM Integration · PDF Generation
                  </p>
                  <p className="font-sans text-sm" style={{ color: '#3A3A33' }}>
                    End-to-end SaaS product for AI-generated personalised children's storybooks. Demonstrates production-grade Node/React architecture and CI/CD deployment.
                  </p>
                </div>

                <div>
                  <h3 className="font-sans text-base font-semibold mb-2" style={{ color: '#14140F' }}>
                    Branding AI SaaS
                  </h3>
                  <p className="font-mono text-xs mb-3" style={{ color: '#6E6E64' }}>
                    Next.js · Node.js · Supabase · REST APIs · Workflow Automation
                  </p>
                  <p className="font-sans text-sm" style={{ color: '#3A3A33' }}>
                    SaaS platform integrating multiple external APIs and LLM providers. Highlights end-to-end system ownership: architecture, integrations, and deployment.
                  </p>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="cv-section opacity-0">
              <div style={{ marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #C9C5B6' }}>
                <p className="font-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: '#0E4A35' }}>
                  Languages
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="font-sans text-sm" style={{ color: '#14140F' }}>Spanish</span>
                  <span className="font-mono text-xs" style={{ color: '#6E6E64' }}>Native</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="font-sans text-sm" style={{ color: '#14140F' }}>Catalan</span>
                  <span className="font-mono text-xs" style={{ color: '#6E6E64' }}>Native</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="font-sans text-sm" style={{ color: '#14140F' }}>English</span>
                  <span className="font-mono text-xs" style={{ color: '#6E6E64' }}>B2 (Professional)</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span className="font-sans text-sm" style={{ color: '#14140F' }}>Russian</span>
                  <span className="font-mono text-xs" style={{ color: '#6E6E64' }}>A1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
