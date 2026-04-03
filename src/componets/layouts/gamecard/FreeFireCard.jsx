'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const FreeFireCard = ({ game }) => {
  const [selected, setSelected] = useState(game?.reRecharge?.[0]);

  return (
    <div
      className="relative container mx-auto rounded-2xl overflow-hidden group 
      bg-white/5 backdrop-blur-lg border border-white/10 
      shadow-lg hover:shadow-pink-500/40 transition duration-500"
    >
      {/* Glow Effect (FIXED) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-500 
        bg-linear-to-r from-pink-500/20 via-purple-500/20 to-transparent blur-xl"
      />

      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={game?.image}
          alt="game image"
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 flex flex-col gap-2">
        {/* Title */}
        <h2 className="text-white text-lg font-semibold">{game?.title}</h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm">{game?.subTitle}</p>

        {/* Price */}
        <p className="text-pink-500 font-medium text-sm mt-1">
          ৳ {selected?.price || game?.price}
        </p>

        {/* Recharge Options */}
        {game?.reRecharge && (
          <div className="flex flex-wrap gap-2 mt-2">
            {game.reRecharge.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`text-xs px-2 py-1 rounded-md transition ${
                  selected?.id === item.id
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.dymond}
              </button>
            ))}
          </div>
        )}

        {/* Rules */}
        {game?.Rules && (
          <ul className="text-[11px] text-gray-400 mt-2 space-y-1">
            {game.Rules.slice(0, 2).map((rule, i) => (
              <li key={i}>• {rule}</li>
            ))}
          </ul>
        )}

        {/* Button */}
        <Link href={`/game/${game?.id}`}>
          <button className="mt-3 bg-pink-600 hover:bg-pink-700 text-white py-2 px-3 rounded-md text-sm transition">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FreeFireCard;