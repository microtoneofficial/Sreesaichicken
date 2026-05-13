require('dotenv').config();

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

const paymentSessions = new Map();

const BUSINESS_CONFIG = {
  name: 'SREE SAI TRADERS',
  upiId: process.env.UPI_ID,
  gpay: process.env.GPAY_NUMBER,
  amount: 50,
};

const AD_FULL_CONTENT = {
  headline: 'Come, let us become millionaires by engaging in the Poultry Business!',
  subheadline: 'Greetings to everyone — here is some good news for the people of our nation!',
  details: {
    businessName: 'SREE SAI TRADERS',
    tagline: 'Your Trusted Poultry Business Partner',
    description: 'We are offering an extraordinary opportunity to join one of the fastest-growing agricultural sectors in India. The poultry industry is booming with consistent demand and strong profit margins. Whether you are a first-time entrepreneur or an experienced businessperson, our program provides everything you need to succeed.',
    opportunity: [
      'Minimum investment with maximum returns',
      'Complete training & support provided',
      'Ready market and buyer network',
      'Government subsidy assistance',
      'Modern farming techniques training',
      'End-to-end business guidance',
    ],
    earnings: '₹50,000 – ₹2,00,000 per month (depending on scale)',
    address: '123, Main Market Road, Anna Nagar, Chennai – 600 040, Tamil Nadu, India',
    phone: '+91 73054 19024',
    email: 'sreesaitraders@gmail.com',
    timings: 'Monday – Saturday: 9:00 AM to 6:00 PM',
    whatsapp: '7305419024',
  },
};

app.post('/api/payment/create-session', (req, res) => {
  const sessionId = crypto.randomBytes(16).toString('hex');
  const expiresAt = Date.now() + 15 * 60 * 1000;
  paymentSessions.set(sessionId, { status: 'pending', amount: BUSINESS_CONFIG.amount, createdAt: Date.now(), expiresAt });
  res.json({
    success: true,
    sessionId,
    businessName: BUSINESS_CONFIG.name,
    amount: BUSINESS_CONFIG.amount,
    upiString: `upi://pay?pa=${BUSINESS_CONFIG.upiId}&pn=${encodeURIComponent(BUSINESS_CONFIG.name)}&am=${BUSINESS_CONFIG.amount}&cu=INR&tn=${encodeURIComponent('Poultry Business Info')}`,
    expiresAt,
  });
});

app.post('/api/payment/verify', (req, res) => {

  const { sessionId, transactionId } = req.body;

  if (!sessionId || !paymentSessions.has(sessionId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid session'
    });
  }

  if (!transactionId || transactionId.trim().length < 8) {
    return res.status(400).json({
      success: false,
      message: 'Enter a valid transaction ID'
    });
  }

  const session = paymentSessions.get(sessionId);

  if (session.status === 'pending_verification') {
    return res.status(400).json({
      success: false,
      message: 'Payment already submitted and awaiting verification'
    });
  }

  if (session.status === 'paid') {
    return res.status(400).json({
      success: false,
      message: 'Payment already approved'
    });
  }

  if (Date.now() > session.expiresAt) {

    paymentSessions.delete(sessionId);

    return res.status(400).json({
      success: false,
      message: 'Session expired'
    });
  }

  // DO NOT MARK AS PAID HERE

  session.status = 'pending_verification';

  session.transactionId = transactionId;

  session.submittedAt = Date.now();

  paymentSessions.set(sessionId, session);

  res.json({
    success: false,
    pending: true,
    message: 'Your payment is under verification. Our team will verify and unlock the content shortly.'
  });

});

app.post('/api/admin/approve-payment', (req, res) => {

  const { sessionId, adminSecret } = req.body;

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized'
    });
  }

  if (!sessionId || !paymentSessions.has(sessionId)) {
    return res.status(400).json({
      success: false,
      message: 'Session not found'
    });
  }

  const session = paymentSessions.get(sessionId);

  session.status = 'paid';

  session.paidAt = Date.now();

  session.accessToken = crypto.randomBytes(32).toString('hex');

  paymentSessions.set(sessionId, session);

  res.json({
    success: true,
    accessToken: session.accessToken,
    message: 'Payment approved successfully'
  });

});

app.post('/api/content/unlock', (req, res) => {
  const { sessionId, accessToken } = req.body;
  if (!sessionId || !paymentSessions.has(sessionId)) return res.status(403).json({ success: false, message: 'Access denied' });
  const session = paymentSessions.get(sessionId);
  if (session.status !== 'paid' || session.accessToken !== accessToken) return res.status(403).json({ success: false, message: 'Payment not verified' });
  res.json({ success: true, content: AD_FULL_CONTENT });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Sree Sai Traders backend running on port ${PORT}`));
