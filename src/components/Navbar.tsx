/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Globe, ExternalLink } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: any) => void;
  currentView: string;
}

export default function Navbar({ onNavigate, currentView }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Galeries', view: 'home' },
    { label: 'Quiz', view: 'quiz' },
    { label: 'Oracle', view: 'oracle' },
    { label: 'Leaderboard', view: 'leaderboard' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-primary-dark/90 backdrop-blur-md h-16' : 'bg-transparent h-24'}`}>
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <span className="font-display font-bold text-2xl tracking-tighter text-white">OMBRA</span>
          <div className="w-12 h-[1px] bg-gold opacity-50 group-hover:w-20 transition-all duration-700"></div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => onNavigate(link.view)}
              className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                currentView === link.view ? 'text-gold' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
              {currentView === link.view && (
                <motion.div 
                  layoutId="nav-underline" 
                  className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
                />
              )}
            </button>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <button className="text-white/60 hover:text-white flex items-center gap-1 text-xs px-2 py-1 rounded border border-white/10">
              <Globe size={14} /> FR/EN
            </button>
            <a 
              href="https://www.spatial.io/s/Nissas-Next-Scene-69d278aaa7d7dcc7b3ab3321?share=2611753376635350311"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-primary-dark px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-gold-light transition-colors"
            >
              Musée 3D <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface border-b border-gold/20 p-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  onNavigate(link.view);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-lg font-medium text-left ${currentView === link.view ? 'text-gold' : 'text-white/70'}`}
              >
                {link.label}
              </button>
            ))}
            <a 
              href="https://www.spatial.io/s/Nissas-Next-Scene-69d278aaa7d7dcc7b3ab3321?share=2611753376635350311"
              className="bg-gold text-primary-dark px-6 py-3 rounded-full text-center font-bold"
            >
              Musée 3D
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
