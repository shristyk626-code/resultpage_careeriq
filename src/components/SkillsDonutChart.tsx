"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Target } from "lucide-react";

export default function SkillsDonutChart({ matched, missing }: { matched: number, missing: number }) {
  const data = [
    { name: 'Matched', value: matched, color: '#10b981' },
    { name: 'Missing', value: missing, color: '#ef4444' },
  ];

  return (
    <div className="card flex flex-col h-full" style={{ padding: '1.5rem', minHeight: '300px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
        <Target size={18} /> Skills Match Ratio
      </h3>
      
      <div style={{ flex: 1, minHeight: '200px', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15,20,30,0.9)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
