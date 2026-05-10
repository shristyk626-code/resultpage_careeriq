export default function ReadinessScore({ score, total, success, gaps }: { score: number, total: number, success: number, gaps: number }) {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="card flex flex-col justify-between" style={{ padding: '0', overflow: 'hidden' }}>
      
      <div className="flex flex-col items-center justify-center" style={{ flex: 1, padding: '3rem 2rem' }}>
        <div style={{ position: 'relative', width: '240px', height: '240px' }}>
          
          {/* Main SVG Circle */}
          <svg fill="none" viewBox="0 0 240 240" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle 
              cx="120" cy="120" r={radius} 
              stroke="rgba(255, 255, 255, 0.05)" strokeWidth="16" fill="none" 
            />
            {/* Gradient definition for neon pink-to-purple progress */}
            <defs>
              <linearGradient id="readinessGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--primary-light)" />
              </linearGradient>
            </defs>
            <circle 
              cx="120" cy="120" r={radius} 
              stroke="url(#readinessGrad)" strokeWidth="16" fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
            />
          </svg>
          
          <div className="flex flex-col items-center justify-center" style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '4rem', fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1 }}>
                {score}
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                %
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '0.5rem', fontWeight: 600 }}>
              Readiness
            </span>
          </div>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        borderTop: '1px solid var(--border)',
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '1.5rem 0',
        margin: '0 1.5rem 1.5rem 1.5rem',
        borderRadius: '16px'
      }}>
        <div className="flex flex-col items-center justify-center text-center">
          <div style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1 }}>{total}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem', fontWeight: 700 }}>Total</div>
        </div>
        <div className="flex flex-col items-center justify-center text-center" style={{ borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)' }}>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1, color: 'var(--primary)' }}>{success}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem', fontWeight: 700 }}>Success</div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <div style={{ fontSize: '1.75rem', fontWeight: 700, lineHeight: 1, color: 'var(--info)' }}>{gaps}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.5rem', fontWeight: 700 }}>Gaps</div>
        </div>
      </div>

    </div>
  );
}
