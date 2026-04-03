import React from 'react';
import Logo from '../logo/Logo';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-5 mt-10">
      <div className="container mx-auto text-gray-300 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Section */}
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-4 text-gray-400 leading-relaxed text-[15px]">
              BD Game Ghor (BDGameGhor) is a trusted online store in Bangladesh offering game top-up
              services, digital products, and various gaming accessories. We provide fast delivery
              and secure payment options including bKash, Nagad, and Rocket.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Game Top-Up
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Digital Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Gaming Accessories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-5">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Refund Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-5">Contact Us</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="text-gray-400">Phone / WhatsApp</p>
                <p className="text-white font-medium">+880 17XX-XXXXXX</p>
              </div>
              <div>
                <p className="text-gray-400">Email</p>
                <p className="text-white font-medium">support@bdgameghor.com</p>
              </div>
              <div>
                <p className="text-gray-400">Working Hours</p>
                <p className="text-white">10:00 AM - 10:00 PM (Everyday)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2026 BD Game Ghor. All Rights Reserved.</p>
          <p>Made with for Bangladeshi Gamers</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 transition-colors">
              Facebook
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              Instagram
            </a>
            <a href="#" className="hover:text-gray-400 transition-colors">
              TikTok
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
