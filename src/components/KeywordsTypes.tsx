import { KeywordTypeItem } from "@/utils/analyzer";
import { Tag } from "lucide-react";

export default function KeywordsTypes({ items }: { items: KeywordTypeItem[] }) {
  return (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Tag size={20} /> Matched / Unmatched Skills
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {items.map((item, idx) => (
          <div key={idx}>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{item.category}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {item.keywords.map((kw, i) => (
                <span key={i} style={{ 
                  background: 'rgba(255,255,255,0.05)', 
                  padding: '0.375rem 0.875rem', 
                  borderRadius: '100px', 
                  fontSize: '0.875rem', 
                  color: 'var(--text-primary)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontWeight: 500
                }}>
                  {kw}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
