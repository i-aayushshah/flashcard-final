import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="text-gray-600">
            © 2024 FlashSaaS. All rights reserved.
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-800">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
