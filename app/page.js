"use client";
import { useState, useEffect } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const HERO_LETTERS = [
  { c: "S", color: "#16a34a", icon: "📈" },
  { c: "T", color: "#d97706", icon: "💹" },
  { c: "O", color: "#0ea5e9", icon: "🔍" },
  { c: "C", color: "#7c3aed", icon: "📊" },
  { c: "K", color: "#dc2626", icon: "⚡" },
  { c: "I", color: "#ea580c", icon: "🏆" },
  { c: "S", color: "#0891b2", icon: "📡" },
  { c: "T", color: "#db2777", icon: "🎯" },
];

const RESEARCH_LETTERS = [
  { c: "R", color: "#15803d", icon: "📉" },
  { c: "E", color: "#b45309", icon: "💰" },
  { c: "S", color: "#0e7490", icon: "🟢" },
  { c: "E", color: "#6d28d9", icon: "🔮" },
  { c: "A", color: "#b91c1c", icon: "🚀" },
  { c: "R", color: "#0369a1", icon: "🌊" },
  { c: "C", color: "#c2410c", icon: "🔥" },
  { c: "H", color: "#be185d", icon: "💎" },
];

const TOOLS = [
  { name: "BSE Live Tracker",        tag: "Real-Time", emoji: "📡" },
  { name: "NSE Results Pipeline",    tag: "Analysis",  emoji: "📊" },
  { name: "Telegram Alert Bot",      tag: "Alerts",    emoji: "🤖" },
  { name: "Verdict Engine",          tag: "Scoring",   emoji: "🏆" },
  { name: "XBRL Parser",             tag: "Data",      emoji: "📋" },
  { name: "Deep Research Reporter",  tag: "Reports",   emoji: "📈" },
];

const PRINCIPLES = [
  { bg: "#dcfce7", title: "Real-time data",     icon: "⚡",  desc: "BSE/NSE filings caught within minutes. No stale data, ever.",                        wide: true  },
  { bg: "#fef3c7", title: "Deep analysis",      icon: "🔬", desc: "YoY, QoQ, EBITDA, CFO — every metric computed correctly.",                           wide: false },
  { bg: "#dbeafe", title: "Retail-first",       icon: "🎯", desc: "Institutional-grade research made accessible to every Indian investor.",              wide: false },
  { bg: "#ede9fe", title: "Accurate scoring",   icon: "🏆", desc: "BLOCKBUSTER to POOR — 6-tier verdict engine with full margin awareness.",             wide: true  },
];

const TALL_PRINCIPLE = {
  bg: "#fce7f3", title: "Open & transparent", icon: "🔓",
  desc: "Built in public. Every algorithm explainable. No black boxes. Jai Shri Ganesh 🙏",
};

const TICKER =
  " — BSE FILINGS — NSE RESULTS — XBRL DATA — QUARTERLY EARNINGS — EPS — EBITDA — PAT — CFO — BLOCKBUSTER — MARVELLOUS — GREAT — GOOD — AVERAGE — POOR — DISASTER — INDIA MARKETS — REAL-TIME ALERTS — TELEGRAM BOT";

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function HoverLetter({ c, color, icon }) {
  const [on, set] = useState(false);
  return (
    <span
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      style={{
        position: "relative", display: "inline-block", cursor: "crosshair",
        color: on ? color : "inherit",
        transition: "color .3s ease",
      }}
    >
      {on && (
        <span style={{
          position: "absolute", top: "-2.4rem", left: "50%",
          transform: "translateX(-50%)", fontSize: "1.3rem",
          pointerEvents: "none", zIndex: 10,
          animation: "popIn .25s ease forwards",
        }}>
          {icon}
        </span>
      )}
      {c}
    </span>
  );
}

function StripeHeading({ text, size = "clamp(3rem,8vw,5.5rem)" }) {
  const [on, set] = useState(false);
  return (
    <div style={{ textAlign: "center", paddingTop: "4rem", marginBottom: "3rem" }}>
      <div
        onMouseEnter={() => set(true)}
        onMouseLeave={() => set(false)}
        style={{ position: "relative", display: "inline-block", cursor: "default", overflow: "hidden" }}
      >
        {/* bottom text — slides up */}
        <span style={{
          display: "block", fontSize: size, fontWeight: 900, lineHeight: 1.05,
          transform: on ? "translateY(-100%)" : "translateY(0)",
          transition: "transform .4s cubic-bezier(.23,1,.32,1)",
        }}>
          {text}
        </span>
        {/* top text (green) — also slides up */}
        <span style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          fontSize: size, fontWeight: 900, lineHeight: 1.05,
          color: "#16a34a", whiteSpace: "nowrap",
          transform: on ? "translateY(-100%)" : "translateY(0)",
          transition: "transform .4s cubic-bezier(.23,1,.32,1)",
        }}>
          {text}
        </span>
        {/* three stripes */}
        {[["#FBC138", 8, 0], ["#16a34a", 3, 0.05], ["#7c3aed", -2, 0.1]].map(([bg, bottom, delay]) => (
          <div key={bottom} style={{
            position: "absolute", left: 0, right: 0, height: 4, bottom,
            background: bg,
            transform: on ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: `transform .4s ease ${delay}s`,
          }} />
        ))}
      </div>
    </div>
  );
}

function ToolCard({ name, emoji, tag }) {
  const [on, set] = useState(false);
  return (
    <div style={{ position: "relative", userSelect: "none" }}>
      {/* front card */}
      <div
        onMouseEnter={() => set(true)}
        onMouseLeave={() => set(false)}
        style={{
          display: "flex", gap: "1.1rem", padding: "1.25rem 1.5rem",
          borderRadius: "1.5rem", height: "6.5rem", alignItems: "center",
          background: "#fff", border: "1.5px solid #000",
          position: "relative",
          top: on ? "-8px" : 0, left: on ? "-8px" : 0,
          transition: "top .18s ease, left .18s ease",
          zIndex: 3, cursor: "pointer",
        }}
      >
        <span style={{ fontSize: "2rem" }}>{emoji}</span>
        <div>
          <p style={{ fontWeight: 700, fontSize: ".9rem", margin: 0, color: "#0f172a" }}>{name}</p>
          <p style={{ fontSize: ".72rem", color: "#16a34a", fontWeight: 700, margin: "4px 0 0", letterSpacing: ".05em" }}>{tag}</p>
        </div>
      </div>
      {/* yellow bg layer */}
      <div style={{
        position: "absolute", inset: 0,
        background: on ? "#FBC138" : "#fff",
        border: "1.5px solid #000", borderRadius: "1.5rem", zIndex: 1,
        transition: "background .18s",
      }} />
      {/* green shadow layer */}
      <div style={{
        position: "absolute",
        top:    on ? "8px"  : "5px",
        left:   on ? "8px"  : "5px",
        right:  on ? "-8px" : "-5px",
        bottom: on ? "-8px" : "-5px",
        background:  on ? "#16a34a" : "#9ca3af",
        border: on ? "1.5px solid #14532d" : "1.5px solid #9ca3af",
        borderRadius: "1.5rem", zIndex: 0,
        transition: "all .18s ease",
      }} />
    </div>
  );
}

function PrincipleCard({ bg, title, icon, desc, flex = "1 1 45%", minH = "180px" }) {
  const [on, set] = useState(false);
  return (
    <div
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      style={{
        background: bg, borderRadius: "1.5rem", padding: "2rem",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        flex, minHeight: minH, cursor: "default",
        transition: "transform .3s ease",
        transform: on ? "translateY(-6px)" : "none",
      }}
    >
      <span style={{
        fontSize: "2.2rem", display: "inline-block",
        transition: "transform .3s",
        transform: on ? "scale(1.15) rotate(5deg)" : "scale(1)",
      }}>
        {icon}
      </span>
      <div style={{ marginTop: "1.5rem" }}>
        <p style={{
          fontSize: "clamp(1.1rem,2.2vw,1.6rem)",
          fontWeight: on ? 600 : 300,
          margin: 0, transition: "font-weight .3s", color: "#0f172a",
        }}>
          {title}
        </p>
        <p style={{ fontSize: ".82rem", opacity: .75, margin: ".4rem 0 0", color: "#374151" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function StockistLanding() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ fontFamily: "Inter, system-ui, sans-serif", background: "#FAFAF9", color: "#0f172a", overflowX: "hidden" }}>
      <style>{`
        @keyframes marq { from { transform:translateX(0) } to { transform:translateX(-50%) } }
        .ticker { display:inline-block; white-space:nowrap; animation:marq 40s linear infinite; }
        @keyframes popIn { from { opacity:0; transform:translateX(-50%) scale(.4) } to { opacity:1; transform:translateX(-50%) scale(1) } }
        * { box-sizing:border-box; }
        a { text-decoration:none; }
      `}</style>

      {/* ── TOP NAV ───────────────────────────────────────────────────── */}
      <nav style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "1rem 2.5rem",
        background: scrolled ? "rgba(250,250,249,.96)" : "transparent",
        backdropFilter: "blur(10px)",
        borderBottom: scrolled ? ".5px solid rgba(22,163,74,.15)" : "none",
        position: "sticky", top: 0, zIndex: 50,
        transition: "background .3s, border-bottom .3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
          <span style={{ fontSize: "1.5rem" }}>📊</span>
          <span style={{ fontWeight: 900, fontSize: ".9rem", color: "#14532d", letterSpacing: ".08em" }}>
            STOCKIST RESEARCH
          </span>
        </div>
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {["Tools", "Principles", "About"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ color: "#64748b", fontSize: ".9rem", fontWeight: 500, transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#16a34a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#64748b")}
            >
              {item}
            </a>
          ))}
          <a href="#telegram" style={{
            background: "#16a34a", color: "#fff",
            padding: ".45rem 1.25rem", borderRadius: "9999px",
            fontWeight: 700, fontSize: ".85rem", transition: "background .2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#14532d")}
            onMouseLeave={e => (e.currentTarget.style.background = "#16a34a")}
          >
            Join Telegram →
          </a>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section style={{
        minHeight: "calc(100vh - 60px)", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative", textAlign: "center",
        padding: "4rem 1.5rem 8rem", overflow: "hidden",
      }}>
        {/* grid background */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(22,163,74,.07) 1px,transparent 1px),linear-gradient(to right,rgba(22,163,74,.07) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%,black 20%,transparent 80%)",
        }} />

        <div style={{ zIndex: 1 }}>
          <span style={{
            color: "#16a34a", fontWeight: 700, letterSpacing: ".2em",
            fontSize: ".72rem", textTransform: "uppercase",
            display: "block", marginBottom: "1.5rem",
          }}>
            🇮🇳 Made for Indian retail investors · Jai Shri Ganesh 🙏
          </span>

          {/* STOCKIST */}
          <div style={{
            fontSize: "clamp(3.5rem,10vw,8rem)", fontWeight: 900, lineHeight: 1,
            display: "flex", justifyContent: "center", gap: ".01em",
            marginBottom: ".2rem", userSelect: "none",
          }}>
            {HERO_LETTERS.map((l, i) => <HoverLetter key={i} {...l} />)}
          </div>

          {/* RESEARCH */}
          <div style={{
            fontSize: "clamp(2rem,6vw,4.5rem)", fontWeight: 900, lineHeight: 1,
            display: "flex", justifyContent: "center", gap: ".01em",
            marginBottom: "2rem", userSelect: "none", opacity: .85,
          }}>
            {RESEARCH_LETTERS.map((l, i) => <HoverLetter key={i} {...l} />)}
          </div>

          <p style={{
            color: "#64748b", fontSize: "clamp(.95rem,1.8vw,1.15rem)",
            maxWidth: "520px", margin: "0 auto 2.5rem", lineHeight: 1.75,
          }}>
            Institutional-quality equity research for every Indian retail investor.
            Real-time BSE/NSE alerts · XBRL parsing · Smart scoring engine.
          </p>

          <div style={{ display: "flex", gap: ".875rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button style={{
              background: "#16a34a", color: "#fff", border: "none",
              padding: ".85rem 2rem", borderRadius: "9999px",
              fontWeight: 700, fontSize: ".95rem", cursor: "pointer",
              transition: "all .2s", fontFamily: "inherit",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#14532d"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.transform = "none"; }}
            >
              Explore tools →
            </button>
            <button style={{
              background: "transparent", color: "#0f172a",
              border: "2px solid #0f172a", padding: ".85rem 2rem",
              borderRadius: "9999px", fontWeight: 700, fontSize: ".95rem",
              cursor: "pointer", transition: "all .2s", fontFamily: "inherit",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#FBC138"; e.currentTarget.style.borderColor = "#FBC138"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "#0f172a"; }}
            >
              Join Telegram
            </button>
          </div>
        </div>

        {/* scrolling ticker */}
        <div style={{ position: "absolute", bottom: "1.5rem", width: "100%", overflow: "hidden", opacity: .2 }}>
          <div className="ticker" style={{ fontSize: ".7rem", fontWeight: 700, letterSpacing: ".12em", color: "#16a34a" }}>
            {(TICKER + " ").repeat(4)}
          </div>
        </div>
      </section>

      {/* ── TOOLS ────────────────────────────────────────────────────── */}
      <section id="tools" style={{ padding: "1rem 2rem 6rem", background: "#fff", overflow: "hidden" }}>
        <StripeHeading text="Tools" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))",
          gap: "3rem 2rem", maxWidth: "960px",
          margin: "0 auto", padding: "1rem 0 2rem",
        }}>
          {TOOLS.map((t, i) => <ToolCard key={i} {...t} />)}
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button style={{
            border: "2px solid #0f172a", background: "transparent",
            padding: ".65rem 1.75rem", borderRadius: "9999px",
            fontWeight: 700, fontSize: ".875rem", cursor: "pointer",
            transition: "all .2s", fontFamily: "inherit", display: "inline-flex",
            alignItems: "center", gap: ".5rem",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#0f172a"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0f172a"; }}
          >
            ＋ View all tools
          </button>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────── */}
      <section style={{ padding: "4rem 2rem", background: "#FAFAF9", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,2.25rem)", fontWeight: 800, maxWidth: "560px", margin: "0 auto 2.5rem", lineHeight: 1.25 }}>
          Trusted by Indian retail investors nationwide 🇮🇳
        </h2>
        <div style={{ display: "flex", gap: "1.25rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[["1,000+", "Filings tracked"], ["15+", "Alert categories"], ["6-tier", "Verdict engine"], ["Live", "BSE/NSE data"]].map(([num, label]) => (
            <div key={label} style={{
              padding: "1.25rem 1.75rem", background: "#fff",
              borderRadius: "1rem", border: ".5px solid #e5e7eb", minWidth: "135px",
            }}>
              <p style={{ fontSize: "2rem", fontWeight: 900, color: "#16a34a", margin: 0 }}>{num}</p>
              <p style={{ color: "#64748b", fontSize: ".8rem", margin: ".25rem 0 0", fontWeight: 500 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRINCIPLES ───────────────────────────────────────────────── */}
      <section id="principles" style={{ padding: "1rem 2rem 6rem", background: "#fff", overflow: "hidden" }}>
        <StripeHeading text="Principles" size="clamp(2.5rem,7vw,5rem)" />
        <div style={{ display: "flex", gap: "1.25rem", maxWidth: "1050px", margin: "0 auto", flexWrap: "wrap" }}>
          {/* left bento grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", flex: "2 1 580px" }}>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <PrincipleCard {...PRINCIPLES[0]} flex="1 1 52%" />
              <PrincipleCard {...PRINCIPLES[1]} flex="1 1 38%" />
            </div>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
              <PrincipleCard {...PRINCIPLES[2]} flex="1 1 38%" />
              <PrincipleCard {...PRINCIPLES[3]} flex="1 1 52%" />
            </div>
          </div>
          {/* tall right card */}
          <PrincipleCard {...TALL_PRINCIPLE} flex="1 1 200px" minH="320px" />
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────────────────── */}
      <section id="about" style={{ padding: "5rem 2rem", background: "#FAFAF9", textAlign: "center" }}>
        <p style={{ color: "#16a34a", fontWeight: 700, letterSpacing: ".15em", fontSize: ".75rem", textTransform: "uppercase", marginBottom: "1rem" }}>
          The mission
        </p>
        <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,2.25rem)", fontWeight: 800, maxWidth: "600px", margin: "0 auto 1.5rem", lineHeight: 1.25 }}>
          Democratizing institutional-quality research for Indian retail investors
        </h2>
        <p style={{ color: "#64748b", fontSize: "1rem", maxWidth: "500px", margin: "0 auto", lineHeight: 1.75 }}>
          Built from Nokha, Rajasthan. Every tool crafted to give the retail investor the same edge that institutions have — real-time filings, smart scoring, deep analysis.
        </p>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer style={{ background: "#0f1a0f", color: "#fff", padding: "3rem 2rem 2rem", textAlign: "center" }}>
        <div style={{ fontSize: "1.1rem", fontWeight: 900, color: "#FBC138", letterSpacing: ".1em", marginBottom: ".6rem" }}>
          📊 STOCKIST RESEARCH
        </div>
        <p style={{ color: "#6b7280", fontSize: ".82rem", marginBottom: "2rem" }}>
          Built with 💚 for Indian retail investors · Jai Shri Ganesh 🙏
        </p>
        <div style={{ display: "flex", gap: "2rem", justifyContent: "center", marginBottom: "2.5rem" }}>
          {["Telegram", "GitHub", "Twitter"].map(s => (
            <a key={s} href="#" style={{ color: "#9ca3af", fontSize: ".875rem", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#22c55e")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9ca3af")}
            >
              {s}
            </a>
          ))}
        </div>
        {/* footer marquee */}
        <div style={{ overflow: "hidden", opacity: .3, borderTop: "1px solid rgba(22,163,74,.2)", paddingTop: "1.5rem" }}>
          <div className="ticker" style={{ fontSize: ".65rem", fontWeight: 700, color: "#22c55e", letterSpacing: ".12em" }}>
            {("— STOCKIST RESEARCH — JAI SHRI GANESH 🙏 — MADE IN INDIA 🇮🇳 — NSE — BSE — XBRL — BLOCKBUSTER — MARVELLOUS — GREAT — GOOD — AVERAGE — POOR — DISASTER — ").repeat(4)}
          </div>
        </div>
      </footer>

      {/* ── FLOATING PILL NAV ─────────────────────────────────────────── */}
      <div style={{
        position: "fixed", bottom: "1.25rem", left: "50%",
        transform: "translateX(-50%)", zIndex: 100,
        display: "flex", justifyContent: "center",
      }}>
        <div style={{
          background: "rgba(15,26,15,.9)",
          backdropFilter: "blur(12px)",
          borderRadius: "9999px",
          padding: ".45rem .65rem",
          display: "flex", gap: ".2rem", alignItems: "center",
          border: "1px solid rgba(22,163,74,.3)",
          boxShadow: "0 8px 32px rgba(0,0,0,.3)",
        }}>
          {[["🏠", "#home"], ["Tools", "#tools"], ["Principles", "#principles"], ["About", "#about"], ["📱 Telegram", "#telegram"]].map(([label, href]) => (
            <a key={label} href={href} style={{
              color: "#d1fae5", padding: ".45rem .85rem",
              borderRadius: "9999px", fontSize: ".8rem", fontWeight: 500,
              transition: "background .2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(22,163,74,.25)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {label}
            </a>
          ))}
          <button style={{
            background: "#16a34a", border: "none", color: "#fff",
            padding: ".45rem 1.25rem", borderRadius: "9999px",
            cursor: "pointer", fontSize: ".8rem", fontWeight: 700,
            transition: "background .2s", fontFamily: "inherit",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#14532d")}
            onMouseLeave={e => (e.currentTarget.style.background = "#16a34a")}
          >
            Join now →
          </button>
        </div>
      </div>
    </main>
  );
}
