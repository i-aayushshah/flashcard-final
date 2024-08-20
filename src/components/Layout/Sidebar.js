import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavItem = ({ href, children, onClick }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center px-6 py-2 mt-4 duration-200 border-l-4 ${
        isActive
          ? 'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100'
          : 'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        className="fixed top-4 left-4 z-20 md:hidden"
        onClick={toggleSidebar}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 md:z-0`}
      >
        <div className="flex flex-col h-full w-64 bg-gray-800">
          <div className="flex items-center justify-center h-20 shadow-md">
            <h1 className="text-3xl font-bold text-white">FlashSaaS</h1>
          </div>
          <div className="overflow-y-auto overflow-x-hidden flex-grow">
            <nav className="flex flex-col py-4">
              <NavItem href="/dashboard" onClick={toggleSidebar}>Dashboard</NavItem>
              <NavItem href="/dashboard/create" onClick={toggleSidebar}>Create Flashcard</NavItem>
              <NavItem href="/dashboard/study" onClick={toggleSidebar}>Study Session</NavItem>
              <NavItem href="/dashboard/analytics" onClick={toggleSidebar}>Analytics</NavItem>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
