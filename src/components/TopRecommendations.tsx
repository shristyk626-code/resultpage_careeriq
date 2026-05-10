"use client";
import { Lightbulb, AlertTriangle } from "lucide-react";

export default function TopRecommendations({ missingSkills, missingCertifications }: { missingSkills: string[], missingCertifications: string[] }) {
  const hasRecommendations = missingSkills.length > 0 || missingCertifications.length > 0;

  return (
    <div className="card flex flex-col h-full" style={{ padding: '1.5rem', minHeight: '300px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
        <Lightbulb size={18} color="#eab308" /> Top Recommendations
      </h3>
      
      {!hasRecommendations ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          <p>Great job! You meet all listed requirements.</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                <th style={{ padding: '0.75rem 0', fontWeight: 600 }}>Type</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Missing Requirement</th>
                <th style={{ padding: '0.75rem 0', fontWeight: 600 }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {missingSkills.map((skill, i) => (
                <tr key={`skill-${i}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.875rem' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-secondary)' }}>Skill</td>
                  <td style={{ padding: '1rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertTriangle size={14} color="#ef4444" />
                      {skill}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0', color: '#ef4444', fontWeight: 600 }}>High</td>
                </tr>
              ))}
              {missingCertifications.map((cert, i) => (
                <tr key={`cert-${i}`} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.875rem' }}>
                  <td style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-secondary)' }}>Certification</td>
                  <td style={{ padding: '1rem 1rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertTriangle size={14} color="#f59e0b" />
                      {cert}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0', color: '#f59e0b', fontWeight: 600 }}>Medium</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
