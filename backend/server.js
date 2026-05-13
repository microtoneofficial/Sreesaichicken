require('dotenv').config();

const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const Razorpay = require('razorpay');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const AD_FULL_CONTENT = {
  headline: 'Come, let us become millionaires by engaging in the Poultry Business!',
  subheadline: 'Greetings to everyone — here is some good news for the people of our nation!',
  details: {
    businessName: 'SREE SAI TRADERS',
    tagline: 'Your Trusted Poultry Business Partner',
    description:
      'We are ready to offer franchise opportunities,allowing you to partner with us and share in our business venture. Whether you are educated or uneducated,male or female whoever you may be you are welcome to get in touch with us. You may contact us from anywhere across the entire state of Tamil Nadu.',
    opportunity: [
      'Minimum investment with maximum returns',
      'Complete training & support provided',
      'Ready market and buyer network',
      'Government subsidy assistance',
      'Modern farming techniques training',
      'End-to-end business guidance',
    ],
    earnings: '₹50,000 – ₹2,00,000 per month',
    address: '6/179,Directly Opposite the Indian Petrol Pump,Jayanagar,Sithalapakkam,Chennai-131',
    phone: '+91 9600156191 / +91 7397719024',
    email: 'dhirubhaisairaj@gmail.com',
    timings: 'Monday – Sunday: 6AM – 9:30PM',
    whatsapp: '9600156191',
  },
};



// CREATE ORDER

app.post('/api/create-order', async (req, res) => {

  try {

    const options = {
      amount: 5000,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Unable to create order'
    });

  }

});



// VERIFY PAYMENT

app.post('/api/verify-payment', async (req, res) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment details'
      });
    }

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    const isAuthentic =
      expectedSignature === razorpay_signature;

    if (!isAuthentic) {

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });

    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      content: AD_FULL_CONTENT
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: 'Server error'
    });

  }

});



const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Sree Sai Traders Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});