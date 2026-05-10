"use client";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { BarChart3 } from "lucide-react";

export default function SkillCategoryCoverage({ scores }: { scores: { education: number, experience: number, skills: number, softSkills: number, certification: number } }) {
  const data = [
    { category: 'Technical Skills', value: scores.skills, color: 'var(--info)' },
    { category: 'Soft Skills', value: scores.softSkills, color: 'var(--success)' },
    { category: 'Certification', value: scores.certification, color: 'var(--warning)' },
    { category: 'Education', value: scores.education, color: 'var(--primary)' },
    { category: 'Experience', value: scores.experience, color: 'var(--danger)' },
  ];

  return (
    <div className="card flex flex-col h-full" style={{ padding: '1.5rem', minHeight: '300px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <BarChart3 size={20} color="var(--primary)" /> Skill Category Coverage
      </h3>
      <div style={{ flex: 1, minHeight: '200px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart layout="vertical" data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis type="number" domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
            <YAxis dataKey="category" type="category" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} width={140} />
            <Tooltip
              contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '8px', boxShadow: '0 0 15px rgba(201, 64, 255, 0.15)' }}
              formatter={(value) => [`${value}%`, 'Coverage']}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}