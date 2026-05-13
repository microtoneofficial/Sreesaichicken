# 🐓 SREE SAI TRADERS — Poultry Business Advertisement Platform

A professional full-stack web application with gated content behind UPI payment.

---

## 🗂️ Project Structure

```
sree-sai-traders/
├── backend/          ← Node.js + Express API
│   ├── server.js
│   └── package.json
└── frontend/         ← React + Vite + TailwindCSS
    ├── src/
    │   ├── App.jsx
    │   ├── index.css
    │   └── components/
    │       ├── LoadingScreen.jsx
    │       ├── AdvertisementPage.jsx
    │       ├── PaymentPage.jsx
    │       └── UnlockedContent.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## 🚀 How to Run

### Step 1: Install & Start Backend

```bash
cd backend
npm install
npm start
# Runs on http://localhost:3001
```

### Step 2: Install & Start Frontend (new terminal)

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser.

---

## 💳 Payment Flow

1. **Loading Screen** → Animated intro (3 seconds)
2. **Advertisement** → Shows teaser content with "I'm Interested" button
3. **Payment Page** → Displays UPI QR code (your business name only, no phone/UPI shown publicly)
4. **Verify** → User enters transaction ID after paying
5. **Unlocked Content** → Full details revealed: address, phone, email, WhatsApp

---

## 🔐 Privacy & Security

- **UPI ID and phone number are NEVER exposed to the frontend**
- Only business name `SREE SAI TRADERS` appears on the payment screen
- QR code is generated from server-side UPI string
- Content locked behind server-side session + access token verification

---

## ⚙️ Customization

All sensitive data lives in `backend/server.js` in `BUSINESS_CONFIG`:

```js
const BUSINESS_CONFIG = {
  name: 'SREE SAI TRADERS',
  upiId: 'dhirubhaisairaj-1@oksbi',
  gpay: '7305419024',
  amount: 50,
};
```

Full content lives in `AD_FULL_CONTENT` (also in server.js).

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Styling | TailwindCSS v3 |
| Backend | Node.js + Express |
| Payment | UPI / Google Pay QR |
| Fonts | Playfair Display + Nunito |

