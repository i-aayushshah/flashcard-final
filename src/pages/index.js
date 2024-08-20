import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChalkboardTeacher, FaPalette, FaChartBar, FaBook, FaUsers, FaHeadset, FaMoon, FaSun, FaArrowRight, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';


const IndexPage = () => {
  const { isAuthenticated } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0); // Ensure this state is defined

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSignIn = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
  };

  const features = [
    { icon: <FaChalkboardTeacher />, title: "Interactive Learning", description: "Engage with dynamic flashcards that adapt to your learning style." },
    { icon: <FaPalette />, title: "Customizable Decks", description: "Create and organize flashcards tailored to your specific needs." },
    { icon: <FaChartBar />, title: "Progress Tracking", description: "Visualize your improvement with detailed analytics and insights." },
    { icon: <FaBook />, title: "Vast Library", description: "Access a wide range of pre-made decks on various subjects." },
    { icon: <FaUsers />, title: "Collaborative Study", description: "Share decks and study with friends for better retention." },
    { icon: <FaHeadset />, title: "24/7 Support", description: "Get help whenever you need it with our dedicated support team." }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Header */}
        <header className="fixed w-full z-10 bg-white dark:bg-gray-900 shadow-lg">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
            >
              FlashSaaS
            </motion.div>
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
              {isAuthenticated ? (
                <a href="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Dashboard</a>
              ) : (
                <a href="/signin" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Sign In</a>
              )}
              <a href="pricing" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Pricing</a>
            </nav>
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              {!isAuthenticated && (
                <a
                  href="/signup"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  Sign Up
                </a>
              )}
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-colors text-sm font-semibold"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 md:pt-40 md:pb-28">
          <div className="container mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
            >
              Revolutionize Your Learning with <span className="text-blue-600 dark:text-blue-400">FlashSaaS</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Harness the power of advanced flashcard technology to accelerate your learning, boost retention, and achieve your educational goals faster than ever before.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center space-x-6"
            >
              <a
                href="/signup"
                className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                Get Started Free <FaArrowRight className="ml-2" />
              </a>
              <a
                href="#learn-more"
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-block"
              >
                Learn More
              </a>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Powerful Features to Accelerate Your Learning</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="text-4xl text-blue-600 dark:text-blue-400 mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-100 py-6">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm">&copy; 2024 FlashSaaS. All rights reserved.</p>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <FaInstagram />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-300 transition-colors">
                  <FaLinkedinIn />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IndexPage;
