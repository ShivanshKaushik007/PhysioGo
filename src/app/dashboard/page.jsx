"use client";

import { useUser } from "@clerk/nextjs";
import { motion } from 'framer-motion';
import { Calendar, Heart } from 'lucide-react';
import Link from 'next/link';

function BookingCard({ date, title, status = "upcoming" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm transition-all duration-200"
    >
      <div className="text-gray-500 text-sm">{date}</div>
      <div className="text-gray-900 mt-1 font-medium">{title}</div>
      <div className="mt-2">
        <span className="inline-block px-2 py-1 text-xs rounded bg-teal-100 text-teal-700 font-medium">
          {status}
        </span>
      </div>
    </motion.div>
  );
}

function HealthProfile({ condition, painLevel, expertise }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm"
    >
      <h3 className="text-xl text-gray-900 font-semibold mb-4">My Health Profile</h3>
      
      <div className="space-y-4">
        <div>
          <label className="text-gray-600 block mb-1 text-sm">Condition</label>
          <div className="text-gray-900 font-medium">{condition}</div>
        </div>

        <div>
          <label className="text-gray-600 block mb-1 text-sm">Pain Level</label>
          <div className="flex items-center gap-2">
            <div className="text-gray-900 font-medium">{painLevel}</div>
            <div className="text-gray-500">/10</div>
          </div>
        </div>

        <div>
          <label className="text-gray-600 block mb-1 text-sm">Preferred Expertise</label>
          <div className="text-gray-900 font-medium">{expertise}</div>
        </div>
        <Link href="/AiMatcher">
        <motion.button
          whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 py-2 px-4 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors shadow-sm"
        >
          Update Profile
        </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function DashboardPage() {
  const { user } = useUser();
  const username = user?.username || user?.firstName || 'there';

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {username}'s Dashboard
            </h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your account.</p>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              href="/book"
              className="bg-teal-600 text-white px-6 py-2.5 rounded-lg hover:bg-teal-700 transition shadow-sm hover:shadow-lg font-medium"
            >
              Book a New Session
            </Link>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Bookings Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-teal-600" />
              <h2 className="text-xl font-semibold text-gray-900">My Bookings</h2>
            </div>
            
            <div className="space-y-4">
              <BookingCard
                date="November 1, 2025 at 11:51 PM"
                title="Pain Relief with Dr. Al Recommended"
              />
              <BookingCard
                date="October 31, 2025 at 10:13 AM"
                title="Pain Relief with Dr. Al Recommended"
              />
              <BookingCard
                date="October 30, 2025 at 11:26 PM"
                title="Pain Relief with Dr. Al Recommended"
              />
            </div>
          </div>

          {/* Health Profile Section */}
          <div>
            <HealthProfile
              condition="knee injury"
              painLevel="4"
              expertise="SPORTS"
            />
          </div>
        </div>
      </div>
    </div>
  );
}