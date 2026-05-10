import { Target, CheckCircle2, AlertTriangle, GraduationCap, Clock } from "lucide-react";
import React from "react";

const Card = ({ icon: Icon, value, label }: { icon: React.ElementType, value: string | number, label: string }) => (
  <div className="card flex flex-col justify-center gap-2" style={{ padding: '1.25rem' }}>
    <div className="flex items-center gap-3">
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-secondary)'
      }}>
        <Icon size={20} />
      </div>
      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{label}</div>
    </div>
    <div style={{ fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.2, color: 'var(--text-primary)', marginTop: '0.25rem' }}>{value}</div>
  </div>
);

export default function StatCards({ 
  overallMatch, 
  skillsMatched, 
  experienceGap, 
  educationFit, 
  missingKeywords 
}: { 
  overallMatch: number, 
  skillsMatched: number, 
  experienceGap: number, 
  educationFit: string, 
  missingKeywords: number 
}) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
      <Card icon={Target} value={`${overallMatch}%`} label="OVERALL MATCH" />
      <Card icon={CheckCircle2} value={skillsMatched} label="SKILLS MATCHED" />
      <Card icon={AlertTriangle} value={missingKeywords} label="MISSING KEYWORDS" />
      <Card icon={Clock} value={`${experienceGap} Yrs`} label="EXPERIENCE GAP" />
      <div style={{ gridColumn: 'span 2' }}>
        <Card icon={GraduationCap} value={educationFit} label="EDUCATION FIT" />
      </div>
    </div>
  );
}
