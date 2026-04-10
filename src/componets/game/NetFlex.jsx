'use client';
import React, { useState, useMemo } from 'react';
import netData from '@/data/primeumdata.json';
import NetFlexCard from '../gamecard/NetFlexCard';

const ITEMS_PER_PAGE = 3;

const NetFlex = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animating, setAnimating] = useState(false);

  const totalPages = Math.ceil(netData.length / ITEMS_PER_PAGE);

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return netData.slice(start, end);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || animating) return;

    // Start animation
    setAnimating(true);

    setTimeout(() => {
      setCurrentPage(page);
      setAnimating(false);
      window.scrollTo({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-white mb-10 text-center">Our Subscriptions</h1>

      {/* Cards Grid with animation */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
          animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {currentItems.map((premium) => (
          <NetFlexCard key={premium.id} premium={premium} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || animating}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 rounded-xl font-medium transition-all"
          >
            ← Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-xl font-semibold transition-all ${
                currentPage === page
                  ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/50'
                  : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || animating}
            className="px-5 py-2 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 rounded-xl font-medium transition-all"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default NetFlex;
