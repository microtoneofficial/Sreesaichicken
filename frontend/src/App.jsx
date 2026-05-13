import React, { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen.jsx';
import AdvertisementPage from './components/AdvertisementPage.jsx';
import PaymentPage from './components/PaymentPage.jsx';
import UnlockedContent from './components/UnlockedContent.jsx';

// STAGE: 'loading' | 'advertisement' | 'payment' | 'unlocked'
export default function App() {
  const [stage, setStage] = useState('loading');
  const [paymentSession, setPaymentSession] = useState(null);
  const [unlockedContent, setUnlockedContent] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setStage('advertisement'), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen font-body">
      {stage === 'loading' && <LoadingScreen />}
      {stage === 'advertisement' && (
        <AdvertisementPage onInterested={() => setStage('payment')} />
      )}
      {stage === 'payment' && (
        <PaymentPage
          onSuccess={(content) => { setUnlockedContent(content); setStage('unlocked'); }}
          onBack={() => setStage('advertisement')}
        />
      )}
      {stage === 'unlocked' && unlockedContent && (
        <UnlockedContent content={unlockedContent} />
      )}
    </div>
  );
}
