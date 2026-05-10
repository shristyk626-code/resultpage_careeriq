"use client";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Target } from "lucide-react";

export default function RadarChartReport({ scores }: { scores: { education: number, experience: number, skills: number, softSkills: number, certification: number } }) {
  const data = [
    { subject: 'Skills', A: scores.skills, fullMark: 100 },
    { subject: 'Experience', A: scores.experience, fullMark: 100 },
    { subject: 'Education', A: scores.education, fullMark: 100 },
    { subject: 'Soft Skills', A: scores.softSkills, fullMark: 100 },
    { subject: 'Certification', A: scores.certification, fullMark: 100 },
  ];

  return (
    <div className="card flex flex-col h-full" style={{ padding: '1.5rem', minHeight: '300px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Target size={20} /> Overall Report
      </h3>
      <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResponsiveContainer width="100%" height={280}>
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <defs>
              <linearGradient id="colorRadar" x1="0" y1="0" x2="1" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0.8}/>
              </linearGradient>
            </defs>
            <PolarGrid stroke="rgba(255,255,255,0.15)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)', fontSize: 13, fontWeight: 500 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,20,30,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Radar name="Score" dataKey="A" stroke="url(#colorRadar)" strokeWidth={3} fill="url(#colorRadar)" fillOpacity={0.5} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
