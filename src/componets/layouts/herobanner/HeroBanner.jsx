// components/HeroBanner.tsx
'use client';

import { Calendar, ClockIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const HeroBanner = () => {
  return (
    <div className="flex items-center justify-center px-6 md:px-16 lg:px-36 bg-cover bg-center h-[85vh]">
      {/* Background Image */}
      <Image
        src="/backgroundImage.png"
        alt="Hero Background"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full text-white">
        <div className="max-w-xl space-y-3">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">BDGameGhor</h1>

          <p className="text-lg md:text-xl text-gray-200 font-medium">
            Ultimate Destination for Gamers
          </p>

          <p className="text-sm md:text-base text-gray-300">
            Discover the latest games, reviews, and gaming news all in one place.
          </p>

          {/* Info */}
          <div className="flex flex-wrap items-center gap-4 text-gray-200 text-sm md:text-base pt-1">
            <span>Action | Adventure | Sci-Fi</span>

            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-pink-500" /> 2026
            </div>

            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4 text-pink-500" /> 2h 8m
            </div>
          </div>

          {/* Button */}
          <div className="pt-2">
            <Link href='explorer' className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 transition rounded-full font-medium">
              <button>
                Explore Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;

  {
    /* <div className="flex gap-3 items-center justify-center">
          <span className="mt-4 text-sm md:text-lg text-gray-200">Action | Adventure | Sci-Fi</span>
          <div className="flex gap-2 items-center  mt-4 font-semibold md:text-xl text-gray-200">
            <Calendar className="w-4.5 h-4.5 text-pink-700" /> 2026
          </div>
          <div className="flex gap-2 items-center  mt-4 font-semibold md:text-xl text-gray-200">
            <ClockIcon className="w-4.5 h-4.5 text-xl text-pink-700" /> 2h 8m
          </div>
        </div> */
  }
  {
    /* <div className='flex justify-between'>
          <div className='flex-1'>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Build Your Dream Website 🚀
            </h1>

            <p className="mt-4 text-sm md:text-lg text-gray-200">
              Create modern, fast and scalable web apps using Next.js & Tailwind CSS.
            </p>
          </div>
          <div className='flex-1'>
            <h1>Hero Banner</h1>
          </div>
        </div> */
  }

  {
    /* Buttons */
  }
  {
    /* <div className="mt-6 flex gap-4">
          <button className="px-6 py-2 bg-pink-600 hover:bg-pink-500 transition rounded-full font-medium">
            Get Started
          </button>

          <button className="px-6 py-2 border border-white hover:bg-white hover:text-black transition rounded-full">
            Learn More
          </button>
        </div> */
  }
