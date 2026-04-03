'use client';
import React, { useState, useMemo } from 'react';
import gameData from '@/data/freefire.json';
import FreeFireCard from '../gamecard/FreeFireCard';

const ITEMS_PER_PAGE =6;

const Game = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animating, setAnimating] = useState(false);

  const totalPages = Math.ceil(gameData.length / ITEMS_PER_PAGE);

  const currentGames = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return gameData.slice(start, end);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || animating) return;

    setAnimating(true);

    setTimeout(() => {
      setCurrentPage(page);
      setAnimating(false); 
      window.scrollTo({ behavior: 'smooth' });
    }, 300); 
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">All Games</h1>
        <p className="text-gray-400">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{' '}
          {Math.min(currentPage * ITEMS_PER_PAGE, gameData.length)} of {gameData.length} games
        </p>
      </div>

      {/* Games Grid with fade animation */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300 ${
          animating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {currentGames.map((game) => (
          <FreeFireCard key={game.id} game={game} />
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-12">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || animating}
            className="px-5 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 rounded-xl font-medium transition-all flex items-center gap-2"
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-11 h-11 rounded-xl font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-500/50'
                    : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || animating}
            className="px-5 py-3 bg-gray-800 hover:bg-gray-700 disabled:bg-gray-900 disabled:text-gray-600 rounded-xl font-medium transition-all flex items-center gap-2"
          >
            Next →
          </button>
        </div>
      )}

      {/* small screens */}
      <div className="text-center text-gray-500 text-sm mt-6">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Game;
