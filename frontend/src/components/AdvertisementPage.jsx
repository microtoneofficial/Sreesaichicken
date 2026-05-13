import React, { useEffect, useState } from 'react';

export default function AdvertisementPage({ onInterested }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #fff7ed 0%, #ffedd5 50%, #fff7ed 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-orange-200/50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
              style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)' }}>
              🐓
            </div>
            <div>
              <h1 className="font-display font-bold text-orange-800 text-base leading-tight">SREE SAI TRADERS</h1>
              <p className="text-orange-500 text-xs tracking-wide">Business Opportunity</p>
            </div>
          </div>
          <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 uppercase tracking-wider">
            🔥 Hot Offer
          </span>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8 md:py-14">
        {/* Hero section */}
        <div className={`text-center mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-300 rounded-full px-4 py-1.5 mb-5">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            <span className="text-orange-700 text-sm font-semibold tracking-wide uppercase">Exclusive Opportunity</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4"
            style={{ color: '#9a3412', lineHeight: '1.15' }}>
            Come, Let Us Become<br />
            <span className="text-gradient">Millionaires!</span>
          </h2>

          <p className="text-xl md:text-2xl text-orange-700 font-semibold mb-2 font-display italic">
            By Engaging in the Poultry Business
          </p>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            Greetings to everyone — here is some <strong className="text-orange-700">good news</strong> for the people of our nation!
          </p>
        </div>

        {/* Main card */}
        <div className={`grid md:grid-cols-2 gap-8 items-center mb-12 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Chicken illustration */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 70%)',
                  transform: 'scale(1.3)',
                }} />
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-bounce-slow">
                💰 ₹50,000/month
              </div>
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-orange-300 shadow-2xl"
                style={{
                  background: 'linear-gradient(135deg, #ffedd5, #fed7aa)',
                  animation: 'float 4s ease-in-out infinite',
                }}>
                {/* Stylized chicken SVG */}
                <svg viewBox="0 0 320 320" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  {/* Background farm scene */}
                  <rect width="320" height="320" fill="url(#skyGrad)" />
                  <defs>
                    <radialGradient id="skyGrad" cx="50%" cy="40%" r="70%">
                      <stop offset="0%" stopColor="#fed7aa" />
                      <stop offset="100%" stopColor="#fdba74" />
                    </radialGradient>
                  </defs>
                  {/* Ground */}
                  <ellipse cx="160" cy="280" rx="130" ry="22" fill="#a3a314" opacity="0.3" />
                  <ellipse cx="160" cy="278" rx="125" ry="18" fill="#86a32c" opacity="0.4" />
                  {/* Grass blades */}
                  {[60,90,120,150,185,215,245,270].map((x,i) => (
                    <line key={i} x1={x} y1="268" x2={x-4} y2="252" stroke="#5a8a1a" strokeWidth="2.5" strokeLinecap="round" />
                  ))}
                  {/* Body */}
                  <ellipse cx="160" cy="210" rx="68" ry="62" fill="#f5f0e8" />
                  <ellipse cx="160" cy="210" rx="68" ry="62" fill="none" stroke="#d4a843" strokeWidth="2" opacity="0.5" />
                  {/* Wing left */}
                  <path d="M102 195 Q75 190 68 215 Q75 230 100 228 Z" fill="#e8e0d0" stroke="#c9a840" strokeWidth="1.5" />
                  {/* Wing right */}
                  <path d="M218 195 Q245 190 252 215 Q245 230 220 228 Z" fill="#e8e0d0" stroke="#c9a840" strokeWidth="1.5" />
                  {/* Tail feathers */}
                  <path d="M225 175 Q260 150 270 130 Q255 155 240 170 Z" fill="#d4a843" />
                  <path d="M222 165 Q262 130 278 105 Q258 138 237 158 Z" fill="#e8b84d" />
                  <path d="M218 158 Q260 115 280 88 Q255 125 232 152 Z" fill="#f5c842" />
                  {/* Neck */}
                  <ellipse cx="160" cy="158" rx="28" ry="32" fill="#f5f0e8" />
                  {/* Head */}
                  <circle cx="160" cy="120" r="38" fill="#f5f0e8" />
                  <circle cx="160" cy="120" r="38" fill="none" stroke="#d4a843" strokeWidth="2" opacity="0.4" />
                  {/* Comb */}
                  <path d="M150 84 Q148 70 155 63 Q158 58 160 63 Q162 55 167 60 Q170 55 173 62 Q176 55 178 62 Q180 70 178 84 Z" fill="#dc2626" />
                  {/* Wattle */}
                  <ellipse cx="157" cy="138" rx="8" ry="12" fill="#dc2626" />
                  {/* Beak */}
                  <path d="M148 121 L134 127 L148 134 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                  {/* Eye */}
                  <circle cx="167" cy="114" r="9" fill="#1a1a1a" />
                  <circle cx="167" cy="114" r="6" fill="#2d1a00" />
                  <circle cx="170" cy="111" r="2.5" fill="white" />
                  {/* Chest patch */}
                  <ellipse cx="158" cy="220" rx="28" ry="30" fill="#faf8f2" opacity="0.6" />
                  {/* Legs */}
                  <rect x="140" y="265" width="10" height="22" rx="4" fill="#f59e0b" />
                  <rect x="165" y="265" width="10" height="22" rx="4" fill="#f59e0b" />
                  {/* Feet */}
                  <path d="M135 285 L125 292 M140 287 L138 295 M150 286 L152 295 M155 285 L162 292" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                  <path d="M160 285 L150 292 M165 287 L163 295 M175 286 L177 295 M180 285 L187 292" stroke="#d97706" strokeWidth="3" strokeLinecap="round" />
                  {/* Sparkles */}
                  <text x="50" y="100" fontSize="16" opacity="0.6">✨</text>
                  <text x="250" y="90" fontSize="14" opacity="0.5">⭐</text>
                  <text x="55" y="240" fontSize="12" opacity="0.4">💫</text>
                </svg>
              </div>
            </div>
          </div>

          {/* Benefits preview */}
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-orange-800 mb-4">Why Poultry Business?</h3>
            {[
              { icon: '💰', text: 'High returns on investment' },
              { icon: '📈', text: 'Consistently growing market demand' },
              { icon: '🤝', text: 'Full business support & training' },
              { icon: '🏛️', text: 'Government subsidy benefits' },
              { icon: '🔒', text: 'Complete details after payment' },
            ].map((item, i) => (
              <div key={i}
                className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm border border-orange-100 hover:shadow-md hover:border-orange-300 transition-all duration-300"
                style={{ animationDelay: `${i * 100}ms` }}>
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <span className="text-gray-700 font-medium">{item.text}</span>
                {i === 4 && <span className="ml-auto text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded-full border border-orange-200">🔐 Locked</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Stats bar */}
        <div className={`grid grid-cols-3 gap-4 mb-10 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: '₹50K', label: 'Monthly Potential' },
            { value: '100+', label: 'Happy Partners' },
            { value: '50+', label: 'Years Experience' },
          ].map((stat, i) => (
            <div key={i} className="text-center bg-white rounded-2xl p-5 shadow-md border border-orange-100">
              <p className="font-display text-3xl font-extrabold text-gradient mb-1">{stat.value}</p>
              <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block bg-white rounded-3xl p-8 shadow-xl border border-orange-200 max-w-md w-full">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-2xl">🔐</span>
              <p className="text-gray-600 font-semibold">Unlock Full Details</p>
            </div>
            <p className="text-gray-400 text-sm mb-6">
              Pay a one-time fee of ₹50 to access complete contact info, address & business details
            </p>
            <button
              onClick={onInterested}
              className="w-full py-4 px-8 rounded-2xl text-white text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{
                background: 'linear-gradient(135deg, #c2410c, #ea580c, #f97316)',
                boxShadow: '0 8px 30px rgba(234,88,12,0.45)',
                animation: 'pulseOrange 2s ease-in-out infinite',
              }}>
              🌟 Yes, I'm Interested! — ₹50 Only
            </button>
            <p className="text-xs text-gray-400 mt-3">Secure UPI payment · Instant access after payment</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-orange-100 mt-8">
        <p className="text-orange-300 text-sm font-medium">© 2026 SREE SAI TRADERS · All Rights Reserved</p>
      </footer>
    </div>
  );
}
