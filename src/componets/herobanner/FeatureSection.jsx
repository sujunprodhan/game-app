
import { ArrowBigLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import BlurCircle from '../blurecircle/BlurCircle';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const FeatureSection = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className=" mt-20 container mx-auto">
      <div className="flex justify-end max-w-400 mx-auto ">
        <BlurCircle></BlurCircle>
      </div>
      <div className="flex justify-between">
        <p className="text-gray-300 font-bold text-2xl"> Now Showing</p>
        <button className="group flex items-center gap-2 text-xl text-gray-300">
          <Link href="/game" className="cursor-pointer hover:animate-pulse">
            View All
          </Link>
          <ArrowRight className=" group-hover:translate-x-0.5 transition w-4.5 h-4.5 text-xl animate-pulse" />
        </button>
      </div>
    </div>
  );
};

export default FeatureSection;