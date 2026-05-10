"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const wordCount = jobDesc.trim() ? jobDesc.trim().split(/\s+/).length : 0;

  const handleFile = (f: File) => {
    if (f.type !== "application/pdf") { setError("Only PDF files allowed!"); return; }
    if (f.size > 5 * 1024 * 1024) { setError("File size must be under 5MB!"); return; }
    setFile(f); setError("");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleAnalyze = async () => {
    if (!file) { setError("Please upload your resume!"); return; }
    if (!jobDesc.trim()) { setError("Please paste the job description!"); return; }
    setLoading(true); setError("");

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_description", jobDesc);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
      const res = await fetch(`${apiUrl}/api/analyze`, { method: "POST", body: formData });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Analysis failed. Try again!");
      }

      const data = await res.json();

      // ✅ FIXED: Correct keys matching backend response
      const matched = data.matched_skills || [];
      const missing = data.missing_skills || [];
      const scores  = data.scores || {};
      const education = data.education_analysis || {};
      const experience = data.experience_analysis || {};

      const mappedResult = {
        readinessScore:        Math.round(data.career_readiness_score ?? 0),
        totalRequirements:     matched.length + missing.length,
        requirementsFulfilled: matched.length,
        requirementsMissing:   missing.length,
        unusedDepth:           0,
        skillsMatched:         matched,
        skillsMissing:         missing,
        categoryScores: {
          education:     Math.round(scores.education_fit_score    ?? 0),
          experience:    Math.round(scores.experience_match_score ?? 0),
          skills:        Math.round(scores.skill_match_score      ?? 0),
          softSkills:    70,
          certification: 50,
        },
        educationAlignment: [
          {
            criterion: "Degree",
            required:  education.required_education  ?? "Not specified",
            actual:    education.candidate_education ?? "Not found",
            met:       (education.education_fit ?? 0) >= 70,
          }
        ],
        requirementVsMet: [
          { category: "Skills",    required: matched.length + missing.length, met: matched.length },
          { category: "Education", required: 1, met: (education.education_fit ?? 0) >= 70 ? 1 : 0 },
          { category: "Experience", required: experience.required_experience ?? 0, met: experience.candidate_experience ?? 0 },
        ],
        missingCertifications: [],
        recommendations: data.recommendations || [],
      };

      sessionStorage.setItem("careeriqResult", JSON.stringify(mappedResult));
      router.push("/result");

    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ backgroundColor: "#0a0a14", minHeight: "100vh", color: "white", fontFamily: "Inter, sans-serif" }}>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
      `}</style>

      {/* NAVBAR */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: scrolled ? "rgba(10,10,20,0.98)" : "rgba(10,10,20,0.7)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,92,246,0.15)", height: "68px", display: "flex", alignItems: "center" }}>
        <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => router.push("/")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer" }}>
            <img src="/logo.png" alt="CareerIQ" style={{ width: "50px", height: "42px", objectFit: "cover" }} />
          </div>
          <div style={{ display: "flex", gap: "32px" }}>
            <span onClick={() => router.push("/")} style={{ color: "#94a3b8", fontSize: "15px", cursor: "pointer" }}>Home</span>
            <span style={{ color: "#a78bfa", fontSize: "15px", fontWeight: 600 }}>Upload</span>
          </div>
        </nav>
      </header>

      <div style={{ paddingTop: "68px", minHeight: "100vh", position: "relative", zIndex: 1, animation: "fadeUp 0.6s ease forwards" }}>

        {/* BG Glows */}
        <div style={{ position: "fixed", top: "10%", left: "10%", width: "400px", height: "400px", background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }}/>
        <div style={{ position: "fixed", bottom: "10%", right: "10%", width: "350px", height: "350px", background: "radial-gradient(ellipse, rgba(236,72,153,0.1) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }}/>

        {/* HERO TEXT */}
        <div style={{ textAlign: "center", padding: "50px 40px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 18px", borderRadius: "999px", backgroundColor: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.3)", marginBottom: "20px" }}>
            <span style={{ fontSize: "12px" }}>✦</span>
            <span style={{ color: "#a78bfa", fontSize: "12px", fontWeight: 700, letterSpacing: "1.5px" }}>AI-POWERED ANALYSIS</span>
          </div>
          <h1 style={{ fontSize: "44px", fontWeight: 900, margin: "0 0 16px", lineHeight: 1.2 }}>
            Upload Your Resume &amp;<br />
            <span style={{ background: "linear-gradient(135deg, #a78bfa, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Paste the Job Description
            </span>
          </h1>
          <p style={{ color: "#64748b", fontSize: "16px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
            Our AI compares your resume against the job description and generates a real-time readiness score.
          </p>
        </div>

        {/* MAIN CARDS */}
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px 40px", display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "0", alignItems: "start" }}>

          {/* Resume Card */}
          <div style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(139,92,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>📄</div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, margin: 0 }}>Your Resume</h3>
            </div>
            <p style={{ color: "#475569", fontSize: "13px", margin: "0 0 20px" }}>PDF only, max 5MB</p>

            <div
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onClick={() => fileInputRef.current?.click()}
              style={{ border: `2px dashed ${dragOver ? "#a78bfa" : file ? "#22c55e" : "rgba(139,92,246,0.35)"}`, borderRadius: "16px", padding: "50px 24px", textAlign: "center", cursor: "pointer", backgroundColor: file ? "rgba(34,197,94,0.05)" : "rgba(139,92,246,0.03)", transition: "all 0.25s" }}>
              <div style={{ fontSize: "44px", marginBottom: "14px", animation: "float 3s ease-in-out infinite" }}>☁️</div>
              {file ? (
                <div>
                  <p style={{ color: "#22c55e", fontWeight: 700, fontSize: "15px", margin: "0 0 6px" }}>✓ {file.name}</p>
                  <p style={{ color: "#475569", fontSize: "12px", margin: 0 }}>Click to change</p>
                </div>
              ) : (
                <div>
                  <p style={{ color: "#e2e8f0", fontWeight: 600, fontSize: "15px", margin: "0 0 6px" }}>Drag &amp; drop your resume here</p>
                  <p style={{ color: "#475569", fontSize: "13px", margin: "0 0 20px" }}>or</p>
                  <button style={{ padding: "11px 28px", borderRadius: "999px", background: "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}>
                    Browse Files
                  </button>
                </div>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept=".pdf" style={{ display: "none" }}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          </div>

          {/* Middle icon */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0 24px", marginTop: "200px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(236,72,153,0.3))", border: "1px solid rgba(139,92,246,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>⚡</div>
          </div>

          {/* Job Description Card */}
          <div style={{ backgroundColor: "rgba(139,92,246,0.05)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: "20px", padding: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(236,72,153,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>💼</div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, margin: 0 }}>Job Description</h3>
            </div>
            <p style={{ color: "#475569", fontSize: "13px", margin: "0 0 16px" }}>Paste up to 2000 words</p>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              placeholder="Paste the full job description here — responsibilities, required skills, qualifications..."
              style={{ width: "100%", height: "290px", backgroundColor: "rgba(0,0,0,0.25)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: "12px", padding: "16px", color: "white", fontSize: "14px", lineHeight: 1.65, resize: "none", outline: "none", boxSizing: "border-box", fontFamily: "Inter, sans-serif" }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
              <span style={{ fontSize: "12px", color: wordCount > 1800 ? "#f87171" : "#475569" }}>{wordCount} / 2000 words</span>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ maxWidth: "600px", margin: "0 auto 20px", padding: "14px 20px", backgroundColor: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.25)", borderRadius: "12px", textAlign: "center", color: "#f87171", fontSize: "14px" }}>
            ⚠ {error}
          </div>
        )}

        {/* Analyze Button */}
        <div style={{ textAlign: "center", paddingBottom: "80px" }}>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{ padding: "18px 60px", borderRadius: "999px", background: loading ? "rgba(124,58,237,0.4)" : "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white", fontSize: "18px", fontWeight: 700, border: "none", cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 8px 30px rgba(124,58,237,0.5)", transition: "all 0.3s" }}
          >
            {loading ? (
              <span style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ display: "inline-block", width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }}/>
                Analyzing...
              </span>
            ) : "Analyze My Resume →"}
          </button>
          {loading && (
            <p style={{ color: "#475569", fontSize: "13px", marginTop: "12px" }}>
              ⏳ Analyzing your resume, please wait...
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
