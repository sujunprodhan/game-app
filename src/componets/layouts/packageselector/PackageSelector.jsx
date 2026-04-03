'use client';

import React, { useState } from 'react';

const PackageSelector = ({ packages, type = 'game' }) => {
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [playerId, setPlayerId] = useState('');

  return (
    <div className="mt-4">
      <h3 className="mb-2 font-semibold">Select Package:</h3>

      {/* Packages */}
      <div className="flex flex-wrap gap-2">
        {packages?.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSelected(item);
              setQty(1);
            }}
            className={`px-3 py-1 rounded text-sm ${
              selected?.id === item.id ? 'bg-pink-600 text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {item.dymond} - ৳ {item.price}
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-4 p-4 bg-gray-700 rounded-lg flex flex-col gap-3">
          {/* Only for game */}
          {type === 'game' && (
            <input
              type="text"
              placeholder="Enter Player ID"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              className="px-3 py-2 rounded bg-gray-800 border border-gray-600 outline-none focus:border-pink-500"
            />
          )}

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <button onClick={() => setQty((p) => Math.max(1, p - 1))}>-</button>
            <span>{qty}</span>
            <button onClick={() => setQty((p) => p + 1)}>+</button>
          </div>

          {/* Total */}
          <p className="text-pink-400 font-medium">Total: ৳ {selected.price * qty}</p>

          <button className="bg-pink-600 py-2 rounded">Add Now</button>
        </div>
      )}
    </div>
  );
};

export default PackageSelector;
