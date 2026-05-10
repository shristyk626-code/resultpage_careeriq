"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart2 } from "lucide-react";

export default function RequirementVsMetChart({ data }: { data: { category: string, required: number, met: number }[] }) {
  return (
    <div className="card flex flex-col h-full" style={{ padding: '1.5rem', minHeight: '350px' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase' }}>
        <BarChart2 size={18} color="var(--primary)" /> Requirements vs Met
      </h3>
      
      <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="category" tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)', borderRadius: '8px', color: '#fff', boxShadow: '0 0 15px rgba(201, 64, 255, 0.15)' }}
              itemStyle={{ color: '#fff' }}
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '12px', color: 'var(--text-secondary)' }} />
            <Bar dataKey="required" name="Required" fill="var(--info)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            <Bar dataKey="met" name="Met" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
