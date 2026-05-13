import React, { useEffect, useState } from 'react';

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: Math.random() * 12 + 6,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 3,
  shape: i % 3,
}));

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const texts = ['Preparing your opportunity...', 'Loading business details...', 'Almost ready...'];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + Math.random() * 18 + 5, 100));
    }, 280);
    const textInterval = setInterval(() => {
      setTextIndex(i => (i + 1) % texts.length);
    }, 1000);
    return () => { clearInterval(interval); clearInterval(textInterval); };
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #7c2d12 0%, #c2410c 40%, #ea580c 70%, #f97316 100%)' }}>

      {/* Animated particles */}
      {particles.map(p => (
        <div key={p.id} className="particle"
          style={{
            left: `${p.left}%`,
            width: p.size, height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            background: p.shape === 0 ? 'rgba(255,255,255,0.3)' : p.shape === 1 ? 'rgba(251,191,36,0.4)' : 'rgba(254,215,170,0.35)',
            borderRadius: p.shape === 2 ? '50%' : '2px',
            transform: p.shape === 1 ? 'rotate(45deg)' : 'none',
          }} />
      ))}

      {/* Rotating ring */}
      <div className="absolute w-72 h-72 rounded-full border-4 border-white/10 animate-spin-slow" />
      <div className="absolute w-56 h-56 rounded-full border-2 border-orange-200/20"
        style={{ animation: 'spin 5s linear infinite reverse' }} />

      {/* Logo circle */}
      <div className="relative z-10 mb-8 flex flex-col items-center">
        <div className="w-28 h-28 rounded-full bg-white/15 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center mb-6 shadow-2xl"
          style={{ animation: 'float 3s ease-in-out infinite' }}>
          <span className="text-5xl">🐓</span>
        </div>

        <h1 className="font-display text-3xl md:text-4xl font-bold text-white text-center mb-1 tracking-wide"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
          SREE SAI TRADERS
        </h1>
        <p className="text-orange-200 text-sm tracking-widest uppercase font-semibold">
          Poultry Business Excellence
        </p>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-72 md:w-96">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-3">
          <div className="h-full rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #fbbf24, #fff)',
              boxShadow: '0 0 12px rgba(251,191,36,0.8)',
            }} />
        </div>
        <p className="text-center text-white/80 text-sm font-medium animate-pulse">
          {texts[textIndex]}
        </p>
      </div>

      {/* Decorative dots */}
      <div className="absolute bottom-10 flex gap-3">
        {[0,1,2].map(i => (
          <div key={i} className="w-2 h-2 rounded-full bg-white/50"
            style={{ animation: `bounce 1s ${i * 0.2}s infinite` }} />
        ))}
      </div>
    </div>
  );
}
