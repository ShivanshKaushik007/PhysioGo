"use client"; 

import React, { useState } from "react";
import Link from "next/link"; // Changed: Use next/link
import { getAiRecommendation } from "./actions"; // Import the Server Action

function AIMatcher() {
  const [condition, setCondition] = useState("");
  const [painLevel, setPainLevel] = useState(5);
  const [expertise, setExpertise] = useState("");
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // This function is now much simpler!
  const handleMatch = async () => {
    setRecommendation(null);
    setError(null);
    setIsLoading(true);

    // Call the Server Action
    const result = await getAiRecommendation(condition, painLevel, expertise);

    if (result.error) {
      setError(result.error);
    } else {
      setRecommendation(result.data);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex items-center justify-center px-6 py-12">
      <div className="grid md:grid-cols-2 gap-10 max-w-6xl w-full">
        {/* Left Card (Form) */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-teal-700">
             AI Physio Matcher
          </h2>
          <p className="text-gray-600 mb-6 text-sm">
            Answer a few questions and our AI will recommend the best type of
            physiotherapist for your needs.
          </p>

          <label className="block mb-2 text-gray-800 text-sm font-medium">
            Describe your condition
          </label>
          <textarea
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            placeholder="e.g., severe back pain or difficulty walking..."
            className="w-full p-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:border-teal-500 focus:ring-teal-500 focus:ring-1 outline-none mb-4"
            rows="3"
          />

          <label className="block mb-2 text-gray-800 text-sm font-medium">
            Pain Level: {painLevel}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={painLevel}
            onChange={(e) => setPainLevel(e.target.value)}
            className="w-full mb-6 accent-teal-600"
          />

          <label className="block mb-2 text-gray-800 text-sm font-medium">
            Preferred Expertise (optional)
          </label>
          <input
            type="text"
            value={expertise}
            onChange={(e) => setExpertise(e.target.value)}
            placeholder="e.g., Sports injuries, geriatrics"
            className="w-full p-3 rounded-lg bg-gray-50 text-gray-900 border border-gray-300 focus:border-teal-500 focus:ring-teal-500 focus:ring-1 outline-none mb-6"
          />

          <button
            onClick={handleMatch}
            disabled={isLoading || !condition}
            className={`w-full text-white py-3 rounded-lg font-semibold transition ${
              isLoading || !condition
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {isLoading ? "Matching..." : "Save and Get Matched"}
          </button>

          {/* Changed: Use next/link and assumed a /dashboard route */}
          <Link href="/dashboard" className="block w-full">
            <button className="w-full bg-white hover:bg-gray-100 text-teal-600 py-3 rounded-lg mt-3 border border-teal-500 font-semibold transition">
              Go to My Dashboard
            </button>
          </Link>
        </div>

        {/* Right Card (Results) */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200">
          <h2 className="text-2xl font-bold mb-2 text-teal-700">
             AI Recommendation
          </h2>

          {isLoading && (
            <div className="mt-4 flex items-center text-teal-600">
              <svg /* ... your spinner svg ... */></svg>
              <span>Analyzing your condition...</span>
            </div>
          )}

          {error && (
            <p className="text-red-500 mt-4 font-medium">❌ Error: {error}</p>
          )}

          {!recommendation && !isLoading && !error ? (
            <p className="text-gray-600 mt-4">
              Your AI recommendation will appear here...
            </p>
          ) : null}

          {recommendation && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-teal-700 mb-1">
                Recommended Physio Type
              </h3>
              <p className="text-xl font-semibold text-gray-800 mb-4">
                {recommendation.type}
              </p>
              <h4 className="text-gray-800 font-medium mb-2">Rationale</h4>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                {recommendation.rationale}
              </p>
              {/* Changed: Use next/link */}
              <Link
                href="/book"
                className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition text-center block"
              >
                Book a Recommended Therapist
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default AIMatcher;