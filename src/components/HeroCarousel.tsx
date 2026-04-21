/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { GALLERIES } from '../data';
import { Artwork } from '../types';

interface HeroCarouselProps {
  onArtworkClick: (artwork: Artwork) => void;
}

export default function HeroCarousel({ onArtworkClick }: HeroCarouselProps) {
  const allArtworks = GALLERIES.flatMap(g => g.artworks);
  const [centerIndex, setCenterIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCenterIndex((prev) => (prev + 1) % allArtworks.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [allArtworks.length]);

  const getPositionStyles = (index: number) => {
    const diff = (index - centerIndex + allArtworks.length) % allArtworks.length;
    
    // We want 5 visible cards: center (0), neighbors (1, -1), far neighbors (2, -2)
    // Map diff to [-2, -1, 0, 1, 2]
    let pos = diff;
    if (pos > allArtworks.length / 2) pos -= allArtworks.length;

    if (Math.abs(pos) > 2) return { opacity: 0, zIndex: 0, x: 0, scale: 0, rotateY: 0 };

    const xOffsets = [-400, -200, 0, 200, 400];
    const scales = [0.6, 0.8, 1, 0.8, 0.6];
    const rotations = [45, 25, 0, -25, -45];
    const opacities = [0.3, 0.7, 1, 0.7, 0.3];

    const idx = pos + 2; // -2 -> 0, -1 -> 1, 0 -> 2, 1 -> 3, 2 -> 4

    return {
      x: xOffsets[idx],
      scale: scales[idx],
      rotateY: rotations[idx],
      opacity: opacities[idx],
      zIndex: 10 - Math.abs(pos),
    };
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-primary-dark">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-6 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-bold text-6xl md:text-8xl text-white leading-none mb-2"
        >
          L'art résiste.
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-display font-bold text-6xl md:text-8xl text-white leading-none mb-2 ml-8 md:ml-16"
        >
          Le monde souffre.
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display font-bold text-6xl md:text-8xl text-gold leading-none"
        >
          OMBRA témoigne.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <button className="bg-gold text-primary-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all transform hover:scale-105 flex items-center gap-2">
            Explorer les Galeries <ArrowRight size={20} />
          </button>
          <button className="border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
            Visiter le Musée 3D
          </button>
        </motion.div>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full h-[500px] perspective-1000 flex items-center justify-center">
        {allArtworks.map((artwork, index) => {
          const styles = getPositionStyles(index);
          return (
            <motion.div
              key={artwork.id}
              initial={false}
              animate={styles}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="absolute w-[320px] h-[420px] cursor-pointer group"
              onClick={() => Math.abs((index - centerIndex + allArtworks.length) % allArtworks.length) === 0 ? onArtworkClick(artwork) : setCenterIndex(index)}
            >
              <div className="relative w-full h-full rounded-[20px] overflow-hidden shadow-2xl shadow-black/80">
                <img 
                  src={artwork.image} 
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100"></div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div 
                    className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white mb-2"
                    style={{ backgroundColor: artwork.oddColor }}
                  >
                    {artwork.oddBadge || `ODD ${artwork.odd}`}
                  </div>
                  <h3 className="font-display font-medium text-2xl text-white leading-tight">
                    {artwork.title}
                  </h3>
                  <p className="text-white/60 text-sm mt-1">{artwork.artist}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
