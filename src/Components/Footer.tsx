import React from 'react';

const Footer = () => {
  return (
    <footer className="h-48 p-4 bg-gray-200">
      <div className="flex justify-center mb-4">
        <a href="#" className="px-4 py-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-700">
          About Us
        </a>
        <a href="#" className="px-4 py-2 ml-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-700">
          Contact Us
        </a>
        <a href="#" className="px-4 py-2 ml-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-700">
          Terms of Service
        </a>
        <a href="#" className="px-4 py-2 ml-2 font-bold text-white bg-orange-500 rounded hover:bg-orange-700">
          Privacy Policy
        </a>
      </div>
      <p className="text-center text-gray-600">
        &copy; 2023 Job Portal. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;