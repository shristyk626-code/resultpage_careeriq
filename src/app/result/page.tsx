"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Dashboard from "@/components/Dashboard";

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("careeriqResult");
      if (stored) {
        setResult(JSON.parse(stored));
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    }
  }, []);

  if (error) {
    return (
      <div style={{ backgroundColor: "#0a0a14", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "Inter, sans-serif" }}>
        <p style={{ fontSize: "18px", color: "#94a3b8", marginBottom: "24px" }}>No analysis data found.</p>
        <button
          onClick={() => router.push("/upload")}
          style={{ padding: "14px 36px", borderRadius: "999px", background: "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white", fontSize: "15px", fontWeight: 700, border: "none", cursor: "pointer" }}>
          ← Go to Upload
        </button>
      </div>
    );
  }

  if (!result) {
    return (
      <div style={{ backgroundColor: "#0a0a14", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontFamily: "Inter, sans-serif" }}>
        <p style={{ color: "#94a3b8", fontSize: "16px" }}>Loading your results...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#0a0a14", minHeight: "100vh", color: "white", fontFamily: "Inter, sans-serif" }}>

      {/* NAVBAR */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, backgroundColor: "rgba(10,10,20,0.98)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(139,92,246,0.15)", height: "68px", display: "flex", alignItems: "center" }}>
        <nav style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => router.push("/")} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px", cursor: "pointer" }}>
            <img src="/logo.png" alt="CareerIQ" style={{ width: "50px", height: "42px", objectFit: "cover" }} />
            
          </div>
          <button
            onClick={() => { sessionStorage.removeItem("careeriqResult"); router.push("/upload"); }}
            style={{ padding: "10px 24px", borderRadius: "999px", background: "linear-gradient(135deg, #7c3aed, #ec4899)", color: "white", fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer" }}>
            Analyze Another ↑
          </button>
        </nav>
      </header>

      {/* CONTENT */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 40px 80px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, margin: "0 0 8px" }}>Your Career Readiness Report</h2>
          <p style={{ color: "#64748b", fontSize: "15px", margin: 0 }}>Here's how your resume matches the job description</p>
        </div>

        <Dashboard result={result} />
      </div>
    </div>
  );
}