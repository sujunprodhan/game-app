'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const NetFlexCard = ({ item }) => {
  const [selected, setSelected] = useState(item?.reRecharge?.[0]);
  return (
    <div
      className="relative container mx-auto rounded-2xl overflow-hidden group 
      bg-white/5 backdrop-blur-lg border border-white/10 
      shadow-lg hover:shadow-pink-500/40 transition duration-500"
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 
        bg-linear-to-r from-pink-500/20 via-purple-500/20 to-transparent blur-xl"
      />

      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={item?.image}
          alt="game image"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative p-4 flex flex-col gap-2 z-10">
        {/* Title */}
        <h2 className="text-white text-lg font-semibold tracking-wide">{item?.title}</h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm">{item?.subTitle}</p>

        {/* Price */}
        <p className="text-pink-400 font-semibold text-sm mt-1">৳ {selected?.price}</p>

        {/* Recharge Options */}
        <div className="flex flex-wrap gap-2 mt-2">
          {item?.reRecharge?.map((rechargeItem) => (
            <button
              key={rechargeItem.id}
              onClick={() => setSelected(rechargeItem)}
              className={`text-xs px-3 py-1 rounded-full transition duration-300 ${
                selected?.id === rechargeItem.id
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-500/40'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {rechargeItem.dymond}
            </button>
          ))}
        </div>

        {/* Rules */}
        <ul className="text-[11px] text-gray-400 mt-2 space-y-1">
          {item?.Rules?.slice(0, 2).map((rule, i) => (
            <li key={i}>• {rule}</li>
          ))}
        </ul>

        {/* Button */}
        <Link href={`/item/${item?.id}`}>
          <button
            className=" mt-3 bg-linear-to-r from-pink-600 to-purple-600 
            hover:from-pink-700 hover:to-purple-700 
            text-white py-2 px-3 rounded-lg text-sm 
            transition duration-300 shadow-md hover:shadow-pink-500/40"
          >
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NetFlexCard;
