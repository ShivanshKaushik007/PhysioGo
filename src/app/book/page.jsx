"use client";
import React, { useState } from "react";

function BookYourPhysio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    issue: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a dummy appointment ID for this example
    const appointmentId = Math.random().toString(36).substr(2, 9);
    
    // Redirect to payment page with appointment details
    const searchParams = new URLSearchParams({
      appointmentId: appointmentId,
      amount: '50', // Example: $50 consultation fee
      date: formData.date,
      time: formData.time,
      physiotherapistId: 'default', // You can update this based on selected physiotherapist
    });

    console.log('Redirecting to payment with params:', Object.fromEntries(searchParams));
    window.location.href = `/payment?${searchParams.toString()}`;
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md">
          <h2 className="text-3xl font-bold text-teal-700 mb-4">
            Booking Confirmed! 🎉
          </h2>
          <p className="text-gray-700 mb-6">
            Thank you, <span className="font-semibold">{formData.name}</span>! <br />
            We’ll reach out to you shortly at{" "}
            <span className="font-semibold">{formData.email}</span> to confirm
            your appointment.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition font-semibold"
          >
            Book Another Session
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-2xl">
        <h2 className="text-4xl font-bold text-center text-teal-700 mb-8">
          Book Your Physiotherapy Session
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Preferred Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Preferred Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Describe Your Problem
            </label>
            <textarea
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              rows="4"
              placeholder="E.g., back pain, shoulder stiffness, post-surgery recovery..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-teal-500 outline-none"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookYourPhysio;
