'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuIcon, SearchIcon, X } from 'lucide-react';
import Logo from '../logo/Logo';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Contact', path: '/contact' },
  { name: 'Game', path: '/game' },
  { name: 'Install', path: '/install' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-4 max-w-400 mx-auto ">
      {/* Logo */}
      <Logo/>

      {/*  Desktop Menu */}
      <nav className="hidden md:flex items-center gap-6 px-6 py-2 rounded-full backdrop-blur bg-white/10 border border-gray-300/20">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className={`relative px-3 py-1 transition ${
              pathname === item.path
                ? 'text-pink-500 font-semibold'
                : 'text-white hover:text-pink-500'
            }`}
          >
            {item.name}

            {pathname === item.path && (
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-pink-500 rounded"></span>
            )}
          </Link>
        ))}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <SearchIcon className="hidden md:block w-6 h-6 cursor-pointer text-gray-700" />

        <button className="px-4 py-1 sm:px-6 sm:py-2 bg-pink-600 text-white hover:bg-pink-500 transition rounded-full font-medium">
          Login
        </button>

        {/*  Hamburger */}
        <MenuIcon className="md:hidden w-6 h-6 cursor-pointer" onClick={() => setIsOpen(true)} />
      </div>

      {/*  Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-screen w-full bg-black backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/*  X Icon */}
        <X
          className="absolute top-6 right-6 w-8 h-8 text-white cursor-pointer"
          onClick={() => setIsOpen(false)}
        />

        {/* Mobile Nav */}
        <nav className="flex flex-col items-center gap-6 text-xl text-white">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={() => setIsOpen(false)}
              className={`${
                pathname === item.path ? 'text-pink-400 font-semibold' : 'hover:text-pink-300'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Buttons */}
        <button className="px-6 py-2 bg-pink-600 text-white rounded-full">Login</button>
      </div>
    </header>
  );
};

export default Navbar;
