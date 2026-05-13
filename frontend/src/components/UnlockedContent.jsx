import React, { useEffect, useState } from 'react';

export default function UnlockedContent({ content }) {
  const [visible, setVisible] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const { details } = content;

  useEffect(() => {
    const pieces = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ['#f97316','#fbbf24','#ea580c','#fed7aa','#ffffff'][Math.floor(Math.random() * 5)],
      size: Math.random() * 8 + 4,
      delay: Math.random() * 1.5,
      duration: Math.random() * 2 + 2,
    }));
    setConfetti(pieces);
    setTimeout(() => setVisible(true), 200);
    setTimeout(() => setConfetti([]), 4000);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, #fff7ed, #ffedd5 40%, #fff7ed)' }}>
      {/* Confetti */}
      {confetti.map(c => (
        <div key={c.id} className="fixed pointer-events-none z-50"
          style={{
            left: `${c.x}%`, top: '-20px',
            width: c.size, height: c.size,
            background: c.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `particleFly ${c.duration}s ${c.delay}s ease-in forwards`,
          }} />
      ))}

      {/* Header */}
      <header className="glass border-b border-orange-200/50 shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
            style={{ background: 'linear-gradient(135deg, #ea580c, #f97316)' }}>🐓</div>
          <div className="flex-1">
            <h1 className="font-display font-bold text-orange-800 text-base">{details.businessName}</h1>
            <p className="text-orange-400 text-xs">{details.tagline}</p>
          </div>
          <div className="flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Unlocked
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Success banner */}
        <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="text-center mb-10 p-8 rounded-3xl relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #9a3412, #c2410c, #ea580c)' }}>
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />
            <div className="relative z-10">
              <div className="text-5xl mb-3 animate-bounce-slow">🎉</div>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-2">
                Payment Successful!
              </h2>
              <p className="text-orange-200 text-lg">Welcome to the family, future millionaire! 🚀</p>
            </div>
          </div>
        </div>

        {/* Main headline */}
        <div className={`text-center mb-10 transition-all duration-700 delay-100 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="font-display text-3xl md:text-4xl font-extrabold text-orange-900 mb-3 leading-snug">
            {content.headline}
          </h3>
          <p className="text-xl text-orange-600 font-semibold font-display italic">
            {content.subheadline}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* About */}
          <div className={`bg-white rounded-3xl p-7 shadow-lg border border-orange-100 transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h4 className="font-display text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-base">📋</span>
              About This Opportunity
            </h4>
            <p className="text-gray-600 leading-relaxed text-sm">{details.description}</p>
            <div className="mt-4 p-3 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-xs text-orange-600 font-semibold uppercase tracking-wide mb-1">Earning Potential</p>
              <p className="text-2xl font-extrabold text-gradient font-display">{details.earnings}</p>
            </div>
          </div>

          {/* Opportunities */}
          <div className={`bg-white rounded-3xl p-7 shadow-lg border border-orange-100 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h4 className="font-display text-xl font-bold text-orange-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-base">✨</span>
              What We Offer
            </h4>
            <ul className="space-y-3">
              {details.opportunity.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact details - FULL */}
          <div className={`md:col-span-2 bg-white rounded-3xl p-7 shadow-lg border border-orange-200 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            style={{ boxShadow: '0 0 0 3px rgba(249,115,22,0.15), 0 20px 40px rgba(0,0,0,0.08)' }}>
            <h4 className="font-display text-xl font-bold text-orange-800 mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-base">📞</span>
              Contact Information
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: '🏢', label: 'Business Name', value: details.businessName },
                { icon: '📍', label: 'Address', value: details.address },
                { icon: '📱', label: 'Phone Number', value: details.phone },
                { icon: '📧', label: 'Email Address', value: details.email },
                { icon: '⏰', label: 'Business Hours', value: details.timings },
                { icon: '💬', label: 'WhatsApp', value: `+91 ${details.whatsapp}` },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100 hover:border-orange-300 hover:shadow-sm transition-all">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-gray-800 font-semibold text-sm break-words">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`tel:${details.phone}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm transition-all hover:scale-105 shadow-md"
                style={{ background: 'linear-gradient(135deg, #c2410c, #ea580c)' }}>
                📞 Call Now
              </a>
              <a href={`https://wa.me/91${details.whatsapp}`} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm transition-all hover:scale-105 shadow-md"
                style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)' }}>
                💬 WhatsApp
              </a>
              <a href={`mailto:${details.email}`}
                className="flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-sm transition-all hover:scale-105 shadow-md"
                style={{ background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' }}>
                📧 Email Us
              </a>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className={`mt-8 text-center transition-all duration-700 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-orange-300 text-sm">© 2024 SREE SAI TRADERS · Thank you for your interest!</p>
        </div>
      </div>
    </div>
  );
}
