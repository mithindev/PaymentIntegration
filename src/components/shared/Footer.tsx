import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Left side: Brand or name */}
        <div className="text-sm">
          <span className="text-green-500 font-semibold">Group 5</span> © 2024
        </div>

        {/* Right side: Links or credits */}
        <div className="text-sm">
          <a href="/privacy" className="hover:text-green-400">Privacy Policy</a> | 
          <a href="/terms" className="hover:text-green-400 ml-2">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
