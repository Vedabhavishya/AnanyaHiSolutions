"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";

function PlansContent() {
  const searchParams = useSearchParams();
  const packageTitle = searchParams.get("package") || "Selected Package";

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header activePage="packages" />
      
      <section className="pt-[140px] pb-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-[#051e36] mb-6">
          {packageTitle} Plans
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
          Thank you for your interest! Below are the 3 different package plans. (This is a dummy placeholder page to be designed later).
        </p>
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Plan 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col">
            <h3 className="text-2xl font-bold text-[#051e36] mb-4">Basic Plan</h3>
            <div className="text-4xl font-extrabold text-[#f58220] mb-6">$199<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="text-left text-gray-600 space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">✅ Essential features</li>
              <li className="flex items-center gap-3">✅ Standard support</li>
              <li className="flex items-center gap-3">✅ Basic analytics</li>
            </ul>
            <button className="w-full py-4 rounded-full font-bold text-white bg-[#051e36] hover:bg-[#0f75bc] transition-colors">
              Choose Basic
            </button>
          </div>

          {/* Plan 2 */}
          <div className="bg-[#051e36] rounded-2xl shadow-xl p-8 border border-[#0f75bc] flex flex-col transform md:-translate-y-4 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f58220] text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase">Most Popular</div>
            <h3 className="text-2xl font-bold text-white mb-4">Pro Plan</h3>
            <div className="text-4xl font-extrabold text-[#f58220] mb-6">$399<span className="text-lg text-gray-300 font-normal">/mo</span></div>
            <ul className="text-left text-gray-300 space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">✅ All Basic features</li>
              <li className="flex items-center gap-3">✅ Priority support</li>
              <li className="flex items-center gap-3">✅ Advanced analytics</li>
              <li className="flex items-center gap-3">✅ Custom integrations</li>
            </ul>
            <button className="w-full py-4 rounded-full font-bold text-white bg-[#f58220] hover:bg-[#e0701b] transition-colors">
              Choose Pro
            </button>
          </div>

          {/* Plan 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex flex-col">
            <h3 className="text-2xl font-bold text-[#051e36] mb-4">Enterprise Plan</h3>
            <div className="text-4xl font-extrabold text-[#f58220] mb-6">$899<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="text-left text-gray-600 space-y-4 mb-8 flex-grow">
              <li className="flex items-center gap-3">✅ All Pro features</li>
              <li className="flex items-center gap-3">✅ 24/7 Dedicated support</li>
              <li className="flex items-center gap-3">✅ Custom reporting</li>
              <li className="flex items-center gap-3">✅ API Access</li>
            </ul>
            <button className="w-full py-4 rounded-full font-bold text-white bg-[#051e36] hover:bg-[#0f75bc] transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PlansPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PlansContent />
    </Suspense>
  );
}
