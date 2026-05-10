import { Target } from "lucide-react";

export default function SkillMatch({ matchedSkills, missingSkills }: { matchedSkills: string[], missingSkills: string[] }) {
  return (
    <div className="card flex flex-col h-full" style={{ padding: '1.5rem', minHeight: '300px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
        <Target size={18} /> Matched VS Missing Skills
      </h3>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {matchedSkills.map((skill, i) => (
          <span key={`matched-${i}`} style={{ 
            background: 'rgba(16, 185, 129, 0.15)', 
            padding: '0.375rem 1rem', 
            borderRadius: '100px', 
            fontSize: '0.875rem', 
            color: '#10b981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            fontWeight: 500
          }}>
            {skill}
          </span>
        ))}
        {missingSkills.map((skill, i) => (
          <span key={`missing-${i}`} style={{ 
            background: 'rgba(239, 68, 68, 0.15)', 
            padding: '0.375rem 1rem', 
            borderRadius: '100px', 
            fontSize: '0.875rem', 
            color: '#ef4444',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            fontWeight: 500
          }}>
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-6 mt-auto">
        <div className="flex items-center gap-2">
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#10b981', opacity: 0.8 }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Matched</span>
        </div>
        <div className="flex items-center gap-2">
          <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#ef4444', opacity: 0.8 }}></div>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Missing</span>
        </div>
      </div>
    </div>
  );
}
