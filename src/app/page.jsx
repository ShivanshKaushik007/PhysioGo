import Link from "next/link"; 
import React from "react";
import { User, Home, Clock, MapPin, Calendar, Check } from "lucide-react";

function ServiceCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      <div className="mb-4 flex justify-center">
        <div className="p-4 rounded-full bg-teal-100">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold text-center mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="bg-white">
      
      <section className="bg-gray-50 ">
        <div className="max-w-7xl mx-auto px-4 pt-20 lg:py-32 grid md:grid-cols-2 gap-12 items-center">
         
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6">
              Clinical Excellence in the Comfort of Your {" "}
              <span className="text-teal-600">Home.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-lg">
              Book certified physiotherapists who come to your home.
              Convenient, professional, and personalized care.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/book"
                className="bg-teal-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-teal-700 transition shadow-md hover:shadow-lg"
              >
                Book Now
              </Link>
            </div>
          </div>

        
          <div>
            <div className="bg-gray-200 h-auto rounded-lg shadow-lg flex items-center justify-center">
              {/* Changed: Image path */}
              <img src="/hero.png" alt="Physiotherapy at home" />
            </div>
          </div>
        </div>
      </section>

     
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We provide a seamless, professional, and compassionate healthcare
              experience right where you are.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard
              icon={<User className="w-12 h-12 text-teal-600" />}
              title="Certified Professionals"
              description="All our physiotherapists are certified and experienced"
            />
            <ServiceCard
              icon={<Home className="w-12 h-12 text-teal-600" />}
              title="Home Visits"
              description="Convenient sessions in the comfort of your home"
            />
            <ServiceCard
              icon={<Clock className="w-12 h-12 text-teal-600" />}
              title="Flexible Scheduling"
              description="Book appointments that fit your schedule"
            />
          </div>
        </div>
      </section>

      {/* ========================================
        NEW: "How It Works" Section
        ========================================
      */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Getting started is as easy as 1-2-3.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-5 bg-teal-100 rounded-full">
                  <MapPin className="w-10 h-10 text-teal-600" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-2">
                1. Book Your Visit
              </h3>
              <p className="text-gray-600 text-center">
                Select a time, tell us your location, and describe your needs.
              </p>
            </div>
            {/* Step 2 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-5 bg-teal-100 rounded-full">
                  <Calendar className="w-10 h-10 text-teal-600" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-2">
                2. We Come To You
              </h3>
              <p className="text-gray-600 text-center">
                A certified physiotherapist arrives at your home at the
                appointed time.
              </p>
            </div>
            {/* Step 3 */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-5 bg-teal-100 rounded-full">
                  <Check className="w-10 h-10 text-teal-600" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-center mb-2">
                3. Get Treated & Recover
              </h3>
              <p className="text-gray-600 text-center">
                Receive personalized one-on-one care to start your recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="bg-white py-24">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Recovery?
          </h2>
          <p className="text-xl text-gray-600 mb-10">
            Don't wait. Book your appointment today and let our experts help
            you feel your best.
          </p>
          <Link
            href="/book" 
            className="bg-teal-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-teal-700 transition shadow-lg hover:shadow-xl"
          >
            Book an Appointment Now
          </Link>
        </div>
      </section>
    </div>
  );
}