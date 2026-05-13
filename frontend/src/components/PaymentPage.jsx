import React, { useState, useEffect } from 'react';
import qrImage from '../assets/Qrcode.jpg'

const API = import.meta.env.VITE_API_URL;

export default function PaymentPage({ onSuccess, onBack }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState('qr'); // 'qr' | 'verify' | 'verifying'
  const [txnId, setTxnId] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(900);

  useEffect(() => {
    createSession();
  }, []);

  useEffect(() => {
    if (!session) return;
    const t = setInterval(() => setTimer(s => {
      if (s <= 1) { clearInterval(t); return 0; }
      return s - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [session]);



  async function createSession() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/payment/create-session`, { method: 'POST', headers: { 'Content-Type': 'application/json' } });
      const data = await res.json();
      if (data.success) setSession(data);
      else setError('Failed to create payment session. Please try again.');
    } catch {
      setError('Cannot connect to server. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  }

  async function verifyPayment() {
    if (!txnId.trim()) { setError('Please enter your UPI Transaction ID'); return; }
    setStep('verifying');
    setError('');
    try {
      const res = await fetch(`${API}/api/payment/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: session.sessionId, transactionId: txnId.trim() }),
      });
      const data = await res.json();
      if (data.pending) {

        setStep('verify');

        alert(
          'Payment submitted successfully. Our team will verify your payment and unlock the advertisement shortly.'
        );

        setTxnId('');

        return;
      }

      if (!data.success) {

        setError(data.message || 'Verification failed');

        setStep('verify');

        return;
      }

      // Unlock content only after admin approval

      const unlock = await fetch(`${API}/api/content/unlock`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.sessionId,
          accessToken: data.accessToken
        }),
      });


      const unlockData = await unlock.json();
      if (unlockData.success) onSuccess(unlockData.content);
      else { setError('Content unlock failed'); setStep('verify'); }
    } catch {
      setError('Verification error. Please try again.'); setStep('verify');
    }
  }

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #fff7ed, #ffedd5)' }}>
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-orange-600 font-semibold">Preparing secure payment...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg, #fff7ed, #ffedd5 50%, #fff7ed)' }}>
      {/* Header */}
      <header className="glass border-b border-orange-200/50 shadow-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={onBack} className="text-orange-600 hover:text-orange-800 transition-colors p-2 rounded-xl hover:bg-orange-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-base"
              style={{ background: 'linear-gradient(135deg,#ea580c,#f97316)' }}>🐓</div>
            <div>
              <h1 className="font-display font-bold text-orange-800 text-sm">SREE SAI TRADERS</h1>
              <p className="text-orange-400 text-xs">Secure Payment Portal</p>
            </div>
          </div>
          {session && (
            <div className={`flex items-center gap-1.5 text-sm font-bold px-3 py-1 rounded-full ${timer < 120 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" d="M12 6v6l4 2" strokeWidth="2" />
              </svg>
              {formatTime(timer)}
            </div>
          )}
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {/* Progress steps */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {['View Ad', 'Pay ₹50', 'Unlock'].map((label, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i === 0 ? 'bg-orange-500 text-white' : i === 1 ? 'bg-orange-500 text-white animate-pulse-orange' : 'bg-orange-200 text-orange-400'}`}>
                    {i === 0 ? '✓' : i + 1}
                  </div>
                  <span className={`text-xs font-medium ${i <= 1 ? 'text-orange-600' : 'text-orange-300'}`}>{label}</span>
                </div>
                {i < 2 && <div className={`w-10 h-0.5 mb-4 rounded ${i === 0 ? 'bg-orange-500' : 'bg-orange-200'}`} />}
              </React.Fragment>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
              <span className="text-red-500 text-lg">⚠️</span>
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}

          {session && step === 'qr' && (
            <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
              {/* Payment header */}
              <div className="p-6 text-center border-b border-orange-100"
                style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)' }}>
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-green-200">
                  🔒 Secured by UPI
                </div>
                <h2 className="font-display text-2xl font-extrabold text-orange-900 mb-1">
                  {session.businessName}
                </h2>
                <p className="text-orange-500 text-sm font-medium mb-3">Poultry Business Information</p>
                <div className="text-4xl font-extrabold text-gradient font-display">₹{session.amount}</div>
                <p className="text-gray-400 text-xs mt-1">One-time payment for full details</p>
              </div>

              {/* QR Code */}
              <div className="p-6 flex flex-col items-center">
                <p className="text-gray-500 text-sm mb-4 font-medium">Scan QR code with any UPI app</p>
                <div className="relative p-4 rounded-2xl border-2 border-orange-200 bg-white shadow-inner mb-4 flex justify-center">
                  <img src={qrImage} alt="UPI QR Code" className="rounded-xl w-72 h-72 object-contain" />
                </div>

                {/* UPI apps */}
                <p className="text-gray-400 text-xs mb-3 font-medium">Accepts all UPI apps</p>
                <div className="flex gap-3 mb-6">
                  {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                    <span key={app} className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded-lg font-semibold">{app}</span>
                  ))}
                </div>

                <button
                  onClick={() => setStep('verify')}
                  className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 hover:scale-105 shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #c2410c, #ea580c)', boxShadow: '0 8px 25px rgba(194,65,12,0.4)' }}>
                  ✅ I've Completed the Payment
                </button>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  After paying, click above and enter your Transaction ID
                </p>
              </div>
            </div>
          )}

          {session && (step === 'verify' || step === 'verifying') && (
            <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
              <div className="p-6 text-center border-b border-orange-100"
                style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)' }}>
                <div className="text-4xl mb-2">🧾</div>
                <h2 className="font-display text-xl font-extrabold text-orange-900">Confirm Your Payment</h2>
                <p className="text-gray-500 text-sm mt-1">Enter your UPI Transaction ID to unlock content</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">UPI Transaction ID *</label>
                  <input
                    type="text"
                    value={txnId}
                    onChange={e => setTxnId(e.target.value)}
                    placeholder="e.g., 407913521234"
                    disabled={step === 'verifying'}
                    className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 outline-none text-gray-800 font-mono text-sm bg-orange-50/50 transition-all"
                  />
                  <p className="text-xs text-gray-400 mt-1">Find this in your UPI app's transaction history</p>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
                  <span>💡</span>
                  <p className="text-xs text-amber-700 font-medium">After entering your transaction ID, our team will manually verify your payment and unlock the full business details for you shortly.</p>
                </div>

                <button
                  onClick={verifyPayment}
                  disabled={step === 'verifying' || !txnId.trim()}
                  className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #16a34a, #22c55e)', boxShadow: '0 8px 25px rgba(22,163,74,0.4)' }}>
                  {step === 'verifying' ? (
                    <><div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Verifying...</>
                  ) : '🔓 Verify & Unlock Content'}
                </button>
                <button onClick={() => setStep('qr')} disabled={step === 'verifying'}
                  className="w-full py-2 rounded-xl text-orange-600 text-sm font-medium hover:bg-orange-50 transition-colors">
                  ← Back to QR Code
                </button>
              </div>
            </div>
          )}

          {/* Security note */}
          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">🔒 Secure</span>
            <span>·</span>
            <span className="flex items-center gap-1">✅ UPI Verified</span>
            <span>·</span>
            <span className="flex items-center gap-1">🏢 Business Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple QR code drawer using canvas (no external library needed)
function drawQR(canvas, text) {
  const ctx = canvas.getContext('2d');
  const size = 200;
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);

  // Generate a simple pattern based on text hash
  const hash = Array.from(text).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const modules = 25;
  const cellSize = Math.floor((size - 24) / modules);
  const offset = 12;

  // Fixed positioning squares (QR finder patterns)
  const drawSquare = (x, y, s, fill = '#1a1a1a') => {
    ctx.fillStyle = fill;
    ctx.fillRect(offset + x * cellSize, offset + y * cellSize, s * cellSize - 1, s * cellSize - 1);
  };

  // Fill data modules
  ctx.fillStyle = '#1a1a1a';
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      const seed = (r * 31 + c * 17 + hash) % 7;
      const isFinderZone = (r < 8 && c < 8) || (r < 8 && c >= modules - 8) || (r >= modules - 8 && c < 8);
      if (!isFinderZone && seed < 3) {
        ctx.fillRect(offset + c * cellSize, offset + r * cellSize, cellSize - 1, cellSize - 1);
      }
    }
  }

  // Draw finder patterns
  const fp = (x, y) => {
    drawSquare(x, y, 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(offset + x * cellSize + cellSize, offset + y * cellSize + cellSize, 5 * cellSize - 1, 5 * cellSize - 1);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(offset + x * cellSize + 2 * cellSize, offset + y * cellSize + 2 * cellSize, 3 * cellSize - 1, 3 * cellSize - 1);
  };
  fp(0, 0); fp(modules - 7, 0); fp(0, modules - 7);

  // UPI text below
  ctx.fillStyle = '#ea580c';
  ctx.font = 'bold 10px Nunito, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('SREE SAI TRADERS · ₹50', size / 2, size - 2);
}
