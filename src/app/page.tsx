"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function HomePage() {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [hoveredFor, setHoveredFor] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

 useEffect(() => {
    setVisible(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <main style={{ backgroundColor: "#0a0a14", minHeight: "100vh", color: "white", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>

      {/* ── STARS BACKGROUND ── */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        {[
          { w: 1.5, h: 1.5, op: 0.3, t: 10, l: 20, d: 2 },
          { w: 2, h: 2, op: 0.5, t: 25, l: 45, d: 3 },
          { w: 1, h: 1, op: 0.2, t: 40, l: 70, d: 2.5 },
          { w: 2.5, h: 2.5, op: 0.4, t: 55, l: 15, d: 4 },
          { w: 1.5, h: 1.5, op: 0.3, t: 70, l: 85, d: 3 },
          { w: 2, h: 2, op: 0.5, t: 15, l: 60, d: 2 },
          { w: 1, h: 1, op: 0.2, t: 80, l: 30, d: 3.5 },
          { w: 2.5, h: 2.5, op: 0.4, t: 35, l: 90, d: 2 },
          { w: 1.5, h: 1.5, op: 0.3, t: 60, l: 50, d: 4 },
          { w: 2, h: 2, op: 0.5, t: 90, l: 75, d: 2.5 },
          { w: 1, h: 1, op: 0.2, t: 5, l: 35, d: 3 },
          { w: 2.5, h: 2.5, op: 0.4, t: 45, l: 5, d: 2 },
          { w: 1.5, h: 1.5, op: 0.3, t: 20, l: 95, d: 4.5 },
          { w: 2, h: 2, op: 0.5, t: 75, l: 40, d: 2 },
          { w: 1, h: 1, op: 0.2, t: 30, l: 65, d: 3 },
          { w: 2.5, h: 2.5, op: 0.4, t: 85, l: 10, d: 2.5 },
          { w: 1.5, h: 1.5, op: 0.3, t: 50, l: 55, d: 4 },
          { w: 2, h: 2, op: 0.5, t: 65, l: 80, d: 2 },
          { w: 1, h: 1, op: 0.2, t: 95, l: 25, d: 3.5 },
          { w: 2.5, h: 2.5, op: 0.4, t: 8, l: 48, d: 2 },
        ].map((star, i) => (
          <div key={i} style={{
            position: "absolute",
            width: star.w + "px",
            height: star.h + "px",
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: star.op,
            top: star.t + "%",
            left: star.l + "%",
            animation: `twinkle ${star.d}s infinite alternate`,
          }}/>
        ))}
      </div>

      <style>{`
        @keyframes twinkle { from { opacity: 0.1; } to { opacity: 0.6; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.3); } 50% { box-shadow: 0 0 40px rgba(139,92,246,0.6); } }
      `}</style>

      {/* ── NAVBAR ── */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: scrolled ? "rgba(10,10,20,0.95)" : "rgba(10,10,20,0.7)", backdropFilter: "blur(20px)", borderBottom: scrolled ? "1px solid rgba(139,92,246,0.2)" : "1px solid transparent", height: "70px", display: "flex", alignItems: "center", transition: "all 0.3s" }}>
        <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer" }} onClick={() => router.push("/")}>
          <img src="/logo.png" alt="CareerIQ" style={{ width: "50px", height: "42px", borderRadius: "0px", objectFit: "cover", border: "none", outline: "none" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
            {["Home", "How It Works", "Features", "For You"].map(item => (
              <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                style={{ color: "#94a3b8", fontSize: "15px", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "white")}
                onMouseLeave={e => (e.currentTarget.style.color = "#94a3b8")}
              >{item}</a>
            ))}
          </div>
          <a href="/upload" style={{ textDecoration: "none" }}>
            <button onClick={() => router.push("/upload")}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "11px 24px", borderRadius: "999px", background: "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(124,58,237,0.5)", transition: "all 0.3s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(124,58,237,0.7)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(124,58,237,0.5)"; }}>
              ⬆ Upload Resume
            </button>
          </a>
        </nav>
      </header>

      {/* ── HERO ── */}
      <section id="home" style={{ minHeight: "100vh", paddingTop: "70px", display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div style={{ position: "absolute", top: "20%", left: "20%", width: "500px", height: "500px", background: "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)", pointerEvents: "none", animation: "float 6s ease-in-out infinite" }}/>
        <div style={{ position: "absolute", bottom: "10%", right: "10%", width: "400px", height: "400px", background: "radial-gradient(ellipse, rgba(236,72,153,0.15) 0%, transparent 70%)", pointerEvents: "none" }}/>

        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 40px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-80px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", backgroundColor: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", width: "fit-content" }}>
              <span style={{ fontSize: "14px" }}>✦</span>
              <span style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase" as const }}>AI-Powered Career Intelligence</span>
            </div>

            <h1 style={{ fontSize: "54px", fontWeight: 900, lineHeight: 1.1, margin: 0, color: "white" }}>
              Career Readiness<br />
              <span style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                &amp; Skill Intelligence
              </span><br />
              System
            </h1>

            <p style={{ color: "#94a3b8", fontSize: "17px", lineHeight: 1.8, margin: 0, maxWidth: "440px" }}>
              Analyze your resume against job roles using advanced AI. Get a readiness score, identify skill gaps, and clear your path to employment.
            </p>
            <a href="/upload" style={{ textDecoration: "none" }}>
              <button onClick={() => router.push("/upload")}
                style={{ alignSelf: "flex-start", padding: "18px 40px", borderRadius: "999px", background: "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white", fontSize: "20px", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 8px 30px rgba(124,58,237,0.5)", transition: "all 0.3s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05) translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 16px 40px rgba(124,58,237,0.7)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1) translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(124,58,237,0.5)"; }}>
                Check Career Readiness →
              </button>
            </a>
          </div>

          {/* Hero Image */}
          <div style={{ position: "relative", display: "flex", justifyContent: "center", opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(80px)", transition: "opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s" }}>
            <img src="/dashboard.png" alt="CareerIQ Dashboard"
              style={{ width: "100%", maxWidth: "560px", borderRadius: "24px", boxShadow: "0 30px 80px rgba(124,58,237,0.4)", animation: "float 6s ease-in-out infinite" }} />
            <div style={{ position: "absolute", inset: "-20px", borderRadius: "30px", background: "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)", zIndex: -1 }}/>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: "120px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(124,58,237,0.15) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "70px" }}>
            <h2 style={{ fontSize: "42px", fontWeight: 800, margin: "0 0 16px", color: "white" }}>
              How It <span style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Works</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "17px", margin: 0 }}>Transform your resume into actionable career insights in four simple steps.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { num: "01", emoji: "⬆", title: "Upload Resume", desc: "Securely upload your PDF or DOCX resume." },
              { num: "02", emoji: "📄", title: "Add Job Role", desc: "Paste the job description you are targeting." },
              { num: "03", emoji: "⚙", title: "AI Analysis", desc: "Our engine maps your skills to the requirements." },
              { num: "04", emoji: "📈", title: "Get Insights", desc: "Receive your score and improvement plan." },
            ].map(({ num, emoji, title, desc }) => (
              <div key={num}
                onMouseEnter={() => setHoveredCard(num)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", padding: "32px 20px", borderRadius: "20px", backgroundColor: hoveredCard === num ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${hoveredCard === num ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.06)"}`, transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", transform: hoveredCard === num ? "translateY(-8px)" : "translateY(0)", boxShadow: hoveredCard === num ? "0 20px 40px rgba(124,58,237,0.2)" : "none", cursor: "default" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: "72px", height: "72px", borderRadius: "20px", backgroundColor: hoveredCard === num ? "rgba(139,92,246,0.25)" : "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", transition: "all 0.3s" }}>{emoji}</div>
                  <div style={{ position: "absolute", top: "-8px", right: "-8px", width: "26px", height: "26px", borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 800, color: "white", border: "2px solid #0a0a14" }}>{num}</div>
                </div>
                <h4 style={{ fontSize: "15px", fontWeight: 700, color: "white", margin: 0 }}>{title}</h4>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ padding: "120px 40px", backgroundColor: "rgba(139,92,246,0.03)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "70px" }}>
            <h2 style={{ fontSize: "42px", fontWeight: 800, margin: "0 0 16px", color: "white" }}>
              Powerful <span style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Features</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "17px", margin: 0 }}>Everything you need to bridge the gap between education and employment</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {[
              { icon: "🎯", title: "Career Readiness Score", desc: "Get an instant, quantifiable score showing how prepared you are for your target role." },
              { icon: "📊", title: "Skill Gap Analysis", desc: "Identify exactly which technical and soft skills you need to develop for your dream job." },
              { icon: "✅", title: "Matched vs Missing", desc: "A clear, visual breakdown of your strengths and specific areas for improvement." },
              { icon: "📚", title: "Learning Recommendations", desc: "Personalized course and resource suggestions to directly close your skill gaps." },
              { icon: "📉", title: "Visual Dashboards", desc: "Beautiful interactive charts and graphs to track your career progress over time." },
              { icon: "🤖", title: "AI-Powered Insights", desc: "Smart recommendations based on real-time industry trends and your unique profile." },
            ].map(({ icon, title, desc }) => (
              <div key={title}
                onMouseEnter={() => setHoveredFeature(title)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{ padding: "32px", borderRadius: "20px", backgroundColor: hoveredFeature === title ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${hoveredFeature === title ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.06)"}`, transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", transform: hoveredFeature === title ? "translateY(-8px)" : "translateY(0)", boxShadow: hoveredFeature === title ? "0 20px 40px rgba(124,58,237,0.2)" : "none", cursor: "default" }}>
                <div style={{ width: "52px", height: "52px", borderRadius: "14px", backgroundColor: hoveredFeature === title ? "rgba(139,92,246,0.3)" : "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "20px", transition: "all 0.3s" }}>{icon}</div>
                <h4 style={{ fontSize: "16px", fontWeight: 700, color: "white", margin: "0 0 12px" }}>{title}</h4>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <section id="for-you" style={{ padding: "120px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(236,72,153,0.12) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "70px" }}>
            <h2 style={{ fontSize: "42px", fontWeight: 800, margin: 0, color: "white" }}>
              Who Is This <span style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>For?</span>
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
            {[
              { icon: "🎓", title: "Students", desc: "Prepare for your first job with confidence." },
              { icon: "👥", title: "Freshers", desc: "Stand out in competitive job applications." },
              { icon: "🔍", title: "Job Seekers", desc: "Optimize your profile for ATS and recruiters." },
              { icon: "🔄", title: "Career Switchers", desc: "Plan your transition into a new field effectively." },
            ].map(({ icon, title, desc }) => (
              <div key={title}
                onMouseEnter={() => setHoveredFor(title)}
                onMouseLeave={() => setHoveredFor(null)}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "16px", padding: "40px 24px", borderRadius: "20px", backgroundColor: hoveredFor === title ? "rgba(139,92,246,0.12)" : "rgba(255,255,255,0.03)", border: `1px solid ${hoveredFor === title ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.06)"}`, transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)", transform: hoveredFor === title ? "translateY(-8px)" : "translateY(0)", boxShadow: hoveredFor === title ? "0 20px 40px rgba(124,58,237,0.2)" : "none", cursor: "default" }}>
                <span style={{ fontSize: "40px" }}>{icon}</span>
                <h4 style={{ fontSize: "17px", fontWeight: 700, color: "white", margin: 0 }}>{title}</h4>
                <p style={{ fontSize: "14px", color: "#64748b", margin: 0, lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "60px 40px 120px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ borderRadius: "28px", padding: "70px 60px", textAlign: "center", background: "linear-gradient(135deg, #3b1080 0%, #6d1a6d 100%)", boxShadow: "0 30px 80px rgba(124,58,237,0.4)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(236,72,153,0.2)" }}/>
            <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "150px", height: "150px", borderRadius: "50%", background: "rgba(139,92,246,0.2)" }}/>
            <h2 style={{ fontSize: "38px", fontWeight: 800, color: "white", margin: "0 0 16px", lineHeight: 1.2, position: "relative" }}>Ready to Analyze Your Career Readiness?</h2>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "17px", margin: "0 0 40px", lineHeight: 1.6, position: "relative" }}>
              Join thousands of professionals who have improved their career prospects with our AI-powered insights.
            </p>
            <a href="/upload" style={{ textDecoration: "none" }}>
              <button onClick={() => router.push("/upload")}
                style={{ padding: "16px 48px", borderRadius: "999px", backgroundColor: "white", color: "#1a1a2e", fontSize: "16px", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 8px 30px rgba(0,0,0,0.3)", transition: "all 0.3s", position: "relative" }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)"; }}>
                  Upload Resume Now →
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "64px 40px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img src="/logo.png" alt="CareerIQ" style={{ width: "50px", height: "42px", borderRadius: "0px", objectFit: "cover", border: "none", outline: "none" }} />
                
              </div>
              <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.7, margin: 0, maxWidth: "280px" }}>
                CareerIQ bridges the gap between talent and opportunity using advanced AI skill intelligence
              </p>
              <div style={{ display: "flex", gap: "10px" }}>
                {[0.6, 0.35, 0.15].map((op, i) => (
                  <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: `rgba(139,92,246,${op + 0.2})` }}/>
                ))}
              </div>
            </div>
            <div>
              <h5 style={{ color: "white", fontSize: "14px", fontWeight: 700, margin: "0 0 20px", letterSpacing: "0.5px" }}>Platform</h5>
              {["Features", "About Us"].map(item => (
                <div key={item} style={{ marginBottom: "12px" }}>
                  <a href="#" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                  >{item}</a>
                </div>
              ))}
            </div>
            <div>
              <h5 style={{ color: "white", fontSize: "14px", fontWeight: 700, margin: "0 0 20px", letterSpacing: "0.5px" }}>Resources</h5>
              {["Career Guide", "Support", "Contact"].map(item => (
                <div key={item} style={{ marginBottom: "12px" }}>
                  <a href="#" style={{ color: "#475569", fontSize: "14px", textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#a78bfa")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#475569")}
                  >{item}</a>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "28px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <div style={{ display: "flex", gap: "24px", color: "#374151", fontSize: "13px" }}>
              <span>© 2026 CareerIQ. All rights reserved.</span>
              <span>Incubated at IIT Patna</span>
            </div>
            <p style={{ color: "#1f2937", fontSize: "12px", margin: 0 }}>Disclaimer: For educational and self-assessment purposes only</p>
          </div>
        </div>
      </footer>

    </main>
  );
}