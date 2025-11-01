'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

// Initialize Stripe
const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function BookingConfirmation() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState('loading');
  const router = useRouter();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      // Get the payment_intent and payment_intent_client_secret from the URL
      const clientSecret = searchParams.get('payment_intent_client_secret');
      const redirect_status = searchParams.get('redirect_status');

      // If we have a redirect_status, use that directly
      if (redirect_status) {
        setStatus(redirect_status === 'succeeded' ? 'succeeded' : 'failed');
        return;
      }
      
      if (!clientSecret) {
        console.error('No client secret in URL');
        setStatus('failed');
        return;
      }

      if (!stripe) {
        console.error('Stripe not loaded');
        setStatus('failed');
        return;
      }

      try {
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
        console.log('Payment intent status:', paymentIntent.status);
        setStatus(paymentIntent.status === 'succeeded' ? 'succeeded' : 'failed');
      } catch (err) {
        console.error('Error checking payment status:', err);
        setStatus('failed');
      }
    };

    checkPaymentStatus();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          {status === 'loading' ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              <p className="mt-4 text-gray-600">Verifying payment status...</p>
            </div>
          ) : status === 'succeeded' ? (
            <>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Booking Confirmed!</h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully booked and payment processed.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Failed</h2>
              <p className="text-gray-600 mb-6">
                There was an issue processing your payment. Please try again.
              </p>
            </>
          )}

          <div className="space-y-4">
            <Link 
              href="/book"
              className="block w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              {status === 'succeeded' ? 'Book Another Appointment' : 'Try Again'}
            </Link>
            <Link 
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}