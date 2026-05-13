import React, { useState } from 'react';

const API = import.meta.env.VITE_API_URL;

export default function PaymentPage({ onSuccess, onBack }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  async function handlePayment() {

    try {

      setLoading(true);
      setError('');



      // CREATE ORDER

      const orderRes = await fetch(`${API}/api/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {

        setError('Unable to create order');
        setLoading(false);
        return;
      }



      // OPEN RAZORPAY

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: orderData.order.amount,

        currency: orderData.order.currency,

        name: 'SREE SAI TRADERS',

        description: 'Unlock Premium Advertisement',

        order_id: orderData.order.id,



        handler: async function (response) {

          try {

            const verifyRes = await fetch(`${API}/api/verify-payment`, {

              method: 'POST',

              headers: {
                'Content-Type': 'application/json'
              },

              body: JSON.stringify(response)

            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {

              onSuccess(verifyData.content);

            } else {

              setError('Payment verification failed');

            }

          } catch {

            setError('Verification failed');

          }

        },



        modal: {

          ondismiss: function () {

            setLoading(false);

          }

        },



        prefill: {

          name: 'Customer'

        },



        theme: {

          color: '#ea580c'

        }

      };



      const razorpay = new window.Razorpay(options);



      razorpay.on('payment.failed', function (response) {

        setError(response.error.description);

      });



      razorpay.open();

      setLoading(false);

    } catch (error) {

      console.log(error);

      setError('Payment failed');
      setLoading(false);

    }

  }



  return (

    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: 'linear-gradient(160deg, #fff7ed, #ffedd5 50%, #fff7ed)'
      }}
    >

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">

          <div
            className="p-6 text-center border-b border-orange-100"
            style={{
              background: 'linear-gradient(135deg, #fff7ed, #ffedd5)'
            }}
          >

            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-3 border border-green-200">
              🔒 Secured by Razorpay
            </div>

            <h2 className="font-display text-2xl font-extrabold text-orange-900 mb-1">
              SREE SAI TRADERS
            </h2>

            <p className="text-orange-500 text-sm font-medium mb-3">
              Poultry Business Information
            </p>

            <div className="text-4xl font-extrabold text-gradient font-display">
              ₹50
            </div>

            <p className="text-gray-400 text-xs mt-1">
              One-time payment for full details
            </p>

          </div>



          <div className="p-6 flex flex-col items-center">

            <div className="text-7xl mb-5">
              💳
            </div>

            <p className="text-gray-500 text-sm mb-6 text-center">
              Pay securely using UPI, Cards, Net Banking, Wallets and more.
            </p>



            {error && (

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 w-full">
                <p className="text-red-600 text-sm font-medium text-center">
                  {error}
                </p>
              </div>

            )}



            <button

              onClick={handlePayment}

              disabled={loading}

              className="w-full py-4 rounded-2xl text-white font-bold text-base transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-105 shadow-lg"

              style={{
                background: 'linear-gradient(135deg, #c2410c, #ea580c)',
                boxShadow: '0 8px 25px rgba(194,65,12,0.4)'
              }}

            >

              {loading
                ? 'Processing...'
                : '💳 Pay ₹50 & Unlock Content'}

            </button>



            <button

              onClick={onBack}

              className="w-full py-2 mt-3 rounded-xl text-orange-600 text-sm font-medium hover:bg-orange-50 transition-colors"

            >

              ← Back

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}