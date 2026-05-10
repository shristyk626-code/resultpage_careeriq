"use client";
import { CheckCircle2, XCircle, GraduationCap } from "lucide-react";

export default function EducationAlignment({ alignment = [] }: { alignment: { criterion: string, required: string, actual: string, met: boolean }[] }) {
  return (
    <div className="card flex flex-col h-full" style={{ padding: '1.5rem', minHeight: '300px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
        <GraduationCap size={18} /> Education Alignment
      </h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              <th style={{ padding: '0.75rem 0', fontWeight: 600 }}>Criterion</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Required</th>
              <th style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>Actual</th>
              <th style={{ padding: '0.75rem 0', fontWeight: 600, textAlign: 'center' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {alignment.map((item, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '0.875rem' }}>
                <td style={{ padding: '1rem 0', fontWeight: 500, color: 'var(--text-primary)' }}>{item.criterion}</td>
                <td style={{ padding: '1rem 1rem', color: 'var(--text-secondary)' }}>{item.required}</td>
                <td style={{ padding: '1rem 1rem', color: 'var(--text-secondary)' }}>{item.actual}</td>
                <td style={{ padding: '1rem 0', textAlign: 'center' }}>
                  {item.met ? (
                    <CheckCircle2 size={18} color="#10b981" style={{ display: 'inline' }} />
                  ) : (
                    <XCircle size={18} color="#ef4444" style={{ display: 'inline' }} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
