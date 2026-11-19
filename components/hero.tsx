'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/browse-menu?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/browse-menu');
    }
  };

  return (
    <section className="bg-gradient-to-br from-orange-50 via-amber-50/60 to-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        
        {/* Left Column: Text & Search */}
        <div className="space-y-6">
          <span className="inline-block rounded-full bg-red-100 px-3.5 py-1 text-xs font-semibold text-red-600">
            🔥 Hot & Fresh from Local Kitchens
          </span>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
            Pizza Perfected. <br />
            <span className="text-red-600">Order Now & Track!</span>
          </h1>

          <p className="max-w-lg text-base text-gray-600 sm:text-lg">
            Discover top-rated neighborhood pizzerias, customize your favorite toppings, and get oven-fresh delivery right to your doorstep.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex max-w-md flex-col gap-2.5 sm:flex-row"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pizzas, toppings, or shops..."
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 shadow-sm focus:border-red-500 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
            >
              Find Pizza
            </button>
          </form>

          {/* Quick Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-gray-600">
            <span>Popular:</span>
            <Link
              href="/browse-menu?q=Pepperoni"
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium hover:border-red-300 hover:text-red-600"
            >
              Pepperoni
            </Link>
            <Link
              href="/browse-menu?q=BBQ Chicken"
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium hover:border-red-300 hover:text-red-600"
            >
              BBQ Chicken
            </Link>
            <Link
              href="/browse-menu?q=Margherita"
              className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium hover:border-red-300 hover:text-red-600"
            >
              Margherita
            </Link>
          </div>
        </div>

        {/* Right Column: Hero Image + Floating Badges */}
        <div className="relative mx-auto w-full max-w-md md:max-w-none">
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80"
              alt="Fresh wood-fired pepperoni pizza"
              className="h-[360px] w-full object-cover sm:h-[420px]"
            />
          </div>

          {/* Floating Badge 1 */}
          <div className="absolute -bottom-4 left-4 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
            <p className="text-xs text-gray-500">Fast Delivery</p>
            <p className="text-sm font-bold text-gray-900">⚡ Under 30 Mins</p>
          </div>

          {/* Floating Badge 2 */}
          <div className="absolute -top-4 right-4 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-lg">
            <p className="text-xs text-gray-500">Customer Rating</p>
            <p className="text-sm font-bold text-gray-900">⭐ 4.9 / 5.0</p>
          </div>
        </div>

      </div>
    </section>
  );
}