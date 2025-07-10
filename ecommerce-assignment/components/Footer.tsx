import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-[var(--whitetext)] px-6 py-10  relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 justify-items-center">
        <div>
          <h4 className="text-lg font-semibold mb-4">Filters</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>All Products</li>
            <li>Popular</li>
            <li>Electronics</li>
            <li>Books</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">About</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Company</li>
            <li>Contact</li>
            <li>Careers</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram].map((Icon, idx) => (
              <div
                key={idx}
                className="bg-blue-500 p-2 rounded-full hover:ring-2 hover:ring-white hover:bg-blue-600 hover:scale-110 transition-all cursor-pointer"
              >
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10">
        &copy; {new Date().getFullYear()} Whatbytes. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
