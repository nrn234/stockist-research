"use client";
import { useState, useEffect, useRef } from "react";

// ─── CONFIGURATION ───────────────────────────────────────────────────────────
const TELEGRAM_LINK = "https://t.me/your_actual_channel_link_here"; // 👈 ADD YOUR LINK HERE

// ─── DATA ────────────────────────────────────────────────────────────────────
const HERO_LETTERS = [
  { c: "S", color: "#16a34a", icon: "📈" },
  { c: "T", color: "#FBC138", icon: "💹" },
  { c: "O", color: "#0ea5e9", icon: "🔍" },
  { c: "C", color: "#7c3aed", icon: "📊" },
  { c: "K", color: "#dc2626", icon: "⚡" },
  { c: "I", color: "#ea580c", icon: "🏆" },
  { c: "S", color: "#0891b2", icon: "📡" },
  { c: "T", color: "#db2777", icon: "🎯" },
];

const TOOLS = [
  { name: "Live BSE/NSE Tracker", tag: "REAL-TIME", emoji: "📡", desc: "Sub-millisecond filing catcher." },
  { name: "Results Pipeline",     tag: "ANALYSIS",  emoji: "📊", desc: "QoQ & YoY metrics computed instantly." },
  { name: "Telegram Bot",         tag: "ALERTS",    emoji: "🤖", desc: "Instant terminal-to-mobile delivery." },
  { name: "Verdict Engine",       tag: "SCORING",   emoji: "🏆", desc: "6-tier algorithmic grading system." },
  { name: "XBRL Parser",          tag: "DATA",      emoji: "📋", desc: "Deep extraction of nested financials." },
  { name: "Research Reporter",    tag: "REPORTS",   emoji: "📈", desc: "Institutional-grade PDF generation." },
];

const PRINCIPLES = [
  { title: "Real-time data",  icon: "⚡", desc: "BSE/NSE filings caught within minutes. No stale data, ever." },
  { title: "Deep analysis",   icon: "🔬", desc: "YoY, QoQ, EBITDA, CFO — every metric computed correctly." },
  { title: "Retail-first",    icon: "🎯", desc: "Institutional-grade research made accessible to every Indian investor." },
  { title: "Accurate scoring",icon: "🏆", desc: "BLOCKBUSTER to POOR — 6-tier verdict engine with full margin awareness." },
];

const TICKER_DATA = "BSE: ^BSESN +1.2% | NSE: ^NSEI +0.8% | XBRL PARSER: ONLINE | VERDICT ENGINE: ACTIVE | MARKET BREADTH: POSITIVE | FII DII DATA: UPDATED | ALERTS: OPERATIONAL | JAI SHRI GANESH 🙏 | ";

// ─── ADVANCED INTERACTIVE COMPONENTS ─────────────────────────────────────────

// 1. Custom Smooth Cursor (Ring + Dot)
function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth < 768) return; 

    const onMouseMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (cursorRef.current) {
        // Slight delay for the ring creates a smooth follow effect
        setTimeout(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
          }
        }, 40);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div className="cursor-wrapper">
      <div ref={cursorRef} className="custom-cursor-ring" />
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}

// 2. Network Particle Web Canvas (Connections between dots)
function NetworkCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];
    let mouse = { x: -1000, y: -1000 };

    const initParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 15000); 
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        // Screen wrap
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(22, 163, 74, 0.5)"; // Neon green dots
        ctx.fill();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(22, 163, 74, ${1 - distance / 120})`; 
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Mouse interaction (Repel)
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 150) {
          const force = (150 - distMouse) / 150;
          p.x -= (dxMouse / distMouse) * force * 2;
          p.y -= (dyMouse / distMouse) * force * 2;
          
          // Draw line to mouse
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(251, 193, 56, ${force})`; // Gold line to mouse
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", initParticles);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    
    initParticles();
    draw();

    return () => {
      window.removeEventListener("resize", initParticles);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 0, opacity: 0.8
      }}
    />
  );
}

// 3. 3D Tilt Card Component (Glassmorphism)
function TiltCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(22,163,74,0.3)";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    card.style.boxShadow = "0 8px 32px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card"
      style={{
        transition: "transform 0.2s ease-out, box-shadow 0.2s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      <div style={{ transform: "translateZ(30px)" }}>{children}</div>
    </div>
  );
}

// 4. Glitch / Scramble Text Effect
function ScrambleText({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState("");
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  
  useEffect(() => {
    let iteration = 0;
    let interval = null;

    setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text.split("").map((letter, index) => {
            if (index < iteration) return text[index];
            return characters[Math.floor(Math.random() * characters.length)];
          }).join("")
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
    }, delay);

    return () => clearInterval(interval);
  }, [text, delay]);

  return <span>{displayText || text.replace(/./g, '_')}</span>;
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function StockistLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ backgroundColor: "#050505", color: "#e2e8f0", overflowX: "hidden", minHeight: "100vh", position: "relative" }}>
      
      {/* ─── GLOBAL CSS STYLES (NO TAILWIND REQUIRED) ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@400..800&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body, html { font-family: 'Space Mono', monospace; cursor: none; scroll-behavior: smooth; }
        a, button { cursor: none; }
        
        /* Cursor Styles */
        .cursor-wrapper { pointer-events: none; z-index: 9999; position: fixed; inset: 0; overflow: hidden; }
        .custom-cursor-dot {
          position: absolute; top: -4px; left: -4px; width: 8px; height: 8px;
          background-color: #16a34a; border-radius: 50%; pointer-events: none;
          box-shadow: 0 0 10px #16a34a, 0 0 20px #16a34a;
        }
        .custom-cursor-ring {
          position: absolute; top: -15px; left: -15px; width: 30px; height: 30px;
          border: 1.5px solid rgba(22, 163, 74, 0.6); border-radius: 50%; pointer-events: none;
          transition: width 0.2s, height 0.2s, top 0.2s, left 0.2s;
        }
        a:hover ~ .cursor-wrapper .custom-cursor-ring, button:hover ~ .cursor-wrapper .custom-cursor-ring {
          width: 50px; height: 50px; top: -25px; left: -25px; border-color: #FBC138; background: rgba(251,193,56,0.1);
        }

        /* Animations */
        @keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .ticker-track { display: inline-block; white-space: nowrap; animation: ticker 30s linear infinite; }
        
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        .floating { animation: float 6s ease-in-out infinite; }

        /* Glassmorphism */
        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(22, 163, 74, 0.3);
        }
        .glass-card {
          background: linear-gradient(145deg, rgba(30,30,30,0.6) 0%, rgba(10,10,10,0.8) 100%);
          backdrop-filter: blur(10px);
          border-radius: 1.5rem; padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 8px 32px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,0.1);
        }
        
        /* Noise Texture */
        .noise-bg {
          position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .heading-syne { font-family: 'Syne', sans-serif; font-weight: 800; }
        .gradient-text { background: linear-gradient(90deg, #16a34a, #FBC138); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      <CustomCursor />
      <NetworkCanvas />
      <div className="noise-bg" />

      {/* ── LIVE TICKER BAR ── */}
      <div style={{ background: "#16a34a", color: "#000", padding: "0.4rem 0", fontSize: "0.75rem", fontWeight: 700, overflow: "hidden", position: "relative", zIndex: 50 }}>
        <div className="ticker-track">
          {TICKER_DATA.repeat(4)}
        </div>
      </div>

      {/* ── TOP NAV ── */}
      <nav className={scrolled ? "glass-panel" : ""} style={{
        display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem 2.5rem",
        position: "sticky", top: 0, zIndex: 40, transition: "all 0.3s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <div style={{ width: "12px", height: "12px", background: "#16a34a", borderRadius: "50%", boxShadow: "0 0 10px #16a34a" }} />
          <span className="heading-syne" style={{ fontSize: "1.2rem", color: "#fff", letterSpacing: ".1em" }}>
            STOCKIST<span style={{color: "#16a34a"}}>.</span>RESEARCH
          </span>
        </div>
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {["Tools", "Engine", "About"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: "#94a3b8", fontSize: "0.85rem", textTransform: "uppercase", transition: "color 0.2s" }} onMouseEnter={e => e.target.style.color = "#16a34a"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>
              {item}
            </a>
          ))}
          <a href={TELEGRAM_LINK} target="_blank" rel="noreferrer" style={{
            background: "rgba(22, 163, 74, 0.1)", color: "#16a34a", border: "1px solid #16a34a",
            padding: "0.5rem 1.5rem", borderRadius: "4px", fontSize: "0.85rem", fontWeight: 700,
            textTransform: "uppercase", transition: "all 0.2s"
          }} onMouseEnter={e => { e.target.style.background = "#16a34a"; e.target.style.color = "#000"; e.target.style.boxShadow = "0 0 20px rgba(22,163,74,0.4)"; }} onMouseLeave={e => { e.target.style.background = "rgba(22, 163, 74, 0.1)"; e.target.style.color = "#16a34a"; e.target.style.boxShadow = "none"; }}>
            [ Connect Bot ]
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "85vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", textAlign: "center", padding: "4rem 2rem", zIndex: 10 }}>
        
        <div style={{ padding: "0.5rem 1rem", border: "1px solid rgba(251,193,56,0.3)", borderRadius: "100px", color: "#FBC138", fontSize: "0.75rem", marginBottom: "2rem", background: "rgba(251,193,56,0.05)" }}>
          <span style={{ marginRight: "8px" }}>🟢</span> SYSTEM STATUS: ONLINE
        </div>

        <h1 className="heading-syne" style={{ fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 1, marginBottom: "1rem", color: "#fff" }}>
          <ScrambleText text="INSTITUTIONAL" delay={0} /><br />
          <span className="gradient-text"><ScrambleText text="EDGE FOR RETAIL" delay={1000} /></span>
        </h1>

        <p style={{ color: "#94a3b8", fontSize: "clamp(1rem, 1.5vw, 1.25rem)", maxWidth: "600px", margin: "1.5rem auto 3rem", lineHeight: 1.8 }}>
          Real-time BSE & NSE alerts, XBRL parsing, and a 6-tier scoring engine. 
          The ultimate terminal experience delivered to your Telegram.
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button style={{
            background: "#16a34a", color: "#000", border: "none", padding: "1rem 2.5rem",
            fontSize: "1rem", fontWeight: 700, clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
            transition: "all 0.2s"
          }} onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.transform = "translateY(-3px)"; }} onMouseLeave={e => { e.target.style.background = "#16a34a"; e.target.style.transform = "none"; }}>
            INITIALIZE ENGINE
          </button>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div style={{ display: "flex", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.4)", zIndex: 10, position: "relative" }}>
        {[
          { label: "LATENCY", val: "< 500ms" },
          { label: "VERDICT ENGINE", val: "6-TIER" },
          { label: "MARKETS", val: "BSE / NSE" },
          { label: "DATA FORMAT", val: "XBRL / PDF" }
        ].map((stat, i) => (
          <div key={i} style={{ flex: "1 1 200px", padding: "2rem", borderRight: "1px solid rgba(255,255,255,0.1)", textAlign: "center" }}>
            <p style={{ color: "#64748b", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>{stat.label}</p>
            <p className="heading-syne" style={{ fontSize: "1.75rem", color: "#fff" }}>{stat.val}</p>
          </div>
        ))}
      </div>

      {/* ── TOOLS GRID (3D TILT CARDS) ── */}
      <section id="tools" style={{ padding: "8rem 2rem", position: "relative", zIndex: 10, maxWidth: "1200px", margin: "0 auto" }}>
        <h2 className="heading-syne" style={{ fontSize: "clamp(2rem, 5vw, 4rem)", textAlign: "center", marginBottom: "4rem" }}>
          [ <span style={{color: "#16a34a"}}>SYSTEM</span> MODULES ]
        </h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
          {TOOLS.map((tool, i) => (
            <TiltCard key={i}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", alignItems: "flex-start" }}>
                <span style={{ fontSize: "2.5rem" }}>{tool.emoji}</span>
                <span style={{ color: "#16a34a", fontSize: "0.7rem", padding: "4px 8px", border: "1px solid #16a34a", borderRadius: "4px", letterSpacing: "1px" }}>
                  {tool.tag}
                </span>
              </div>
              <h3 className="heading-syne" style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#fff" }}>{tool.name}</h3>
              <p style={{ color: "#94a3b8", fontSize: "0.9rem", lineHeight: 1.6 }}>{tool.desc}</p>
              <div style={{ marginTop: "2rem", height: "2px", width: "100%", background: "linear-gradient(90deg, #16a34a 0%, transparent 100%)" }} />
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── ABOUT / PRINCIPLES ── */}
      <section id="about" style={{ padding: "6rem 2rem", background: "rgba(10,10,10,0.8)", borderTop: "1px solid rgba(22,163,74,0.2)", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ color: "#FBC138", fontSize: "0.85rem", letterSpacing: "2px", marginBottom: "1rem" }}>MISSION CONTROL</p>
          <h2 className="heading-syne" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", marginBottom: "2rem" }}>
            Democratizing institutional research for the retail investor.
          </h2>
          <p style={{ color: "#94a3b8", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "3rem" }}>
            Built from Nokha, Rajasthan. Every algorithm is crafted to strip away the noise and give you the raw, computed truth of the markets faster than humanly possible. No black boxes.
          </p>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", textAlign: "left" }}>
            {PRINCIPLES.map((p, i) => (
              <div key={i} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
                <h4 style={{ color: "#fff", marginBottom: "0.5rem" }}>{p.icon} {p.title}</h4>
                <p style={{ color: "#64748b", fontSize: "0.85rem", lineHeight: 1.5 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "4rem 2rem 2rem", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.1)", position: "relative", zIndex: 10 }}>
        <h2 className="heading-syne" style={{ fontSize: "2rem", color: "#fff", letterSpacing: "4px", marginBottom: "1rem" }}>
          STOCKIST<span style={{color: "#16a34a"}}>.</span>
        </h2>
        <p style={{ color: "#64748b", fontSize: "0.85rem", marginBottom: "2rem" }}>
          Built with 💚 for Indian retail investors · Jai Shri Ganesh 🙏
        </p>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
          {["TELEGRAM", "GITHUB", "TWITTER"].map(s => (
            <a key={s} href="#" style={{ color: "#94a3b8", fontSize: "0.75rem", letterSpacing: "1px", textDecoration: "none" }} onMouseEnter={e => e.target.style.color = "#16a34a"} onMouseLeave={e => e.target.style.color = "#94a3b8"}>
              [{s}]
            </a>
          ))}
        </div>
      </footer>
    </main>
  );
}
