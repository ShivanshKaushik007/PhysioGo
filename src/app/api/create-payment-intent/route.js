import Stripe from 'stripe';

// Initialize Stripe with API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16' // Using a specific API version
});

export async function POST(request) {
  try {
    // Log the Stripe secret key presence (not the actual key)
    console.log('Stripe secret key present:', !!process.env.STRIPE_SECRET_KEY);

    const body = await request.json();
    console.log('Received request body:', body);

    const { amount, appointmentDetails } = body;

    // Validate amount
    if (!amount) {
      console.error('Missing amount in request');
      return Response.json(
        { error: 'Amount is required' },
        { status: 400 }
      );
    }

    if (isNaN(amount) || amount <= 0) {
      console.error('Invalid amount:', amount);
      return Response.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    // Log the incoming request data
    console.log('Creating payment intent for:', {
      amount,
      appointmentDetails,
      amountInCents: Math.round(amount * 100)
    });

    // Create a payment intent with automatic payment methods
    const paymentIntentData = {
      amount: Math.round(amount * 100), // Stripe expects amount in cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        appointmentId: appointmentDetails?.id || 'unknown',
        physiotherapistId: appointmentDetails?.physiotherapistId || 'unknown',
        date: appointmentDetails?.date || 'unknown',
        time: appointmentDetails?.time || 'unknown',
      },
    };

    console.log('Payment intent request data:', paymentIntentData);

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentData);

    console.log('Payment intent created:', {
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      status: paymentIntent.status,
      clientSecret: !!paymentIntent.client_secret // Log presence, not the actual secret
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      status: paymentIntent.status
    });
  } catch (error) {
    console.error('Stripe API Error:', error);
    return Response.json(
      { 
        error: error.message || 'Error creating payment intent',
        code: error.code,
        type: error.type,
        stripeError: true
      },
      { status: error.statusCode || 500 }
    );
  }
}