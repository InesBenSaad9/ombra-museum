/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { GALLERIES } from '../data';

interface GalleryWingsProps {
  onGalleryClick: (id: number) => void;
}

export default function GalleryWings({ onGalleryClick }: GalleryWingsProps) {
  return (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="font-display font-medium text-11px uppercase tracking-widest text-gold mb-2">Immersion</h2>
          <h3 className="font-display font-bold text-5xl text-white">Nos Galeries</h3>
        </div>
        <button className="text-gold flex items-center gap-2 font-medium hover:gap-4 transition-all">
          Voir toutes <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {GALLERIES.map((gallery) => (
          <motion.div
            key={gallery.id}
            whileHover={{ y: -8 }}
            onClick={() => onGalleryClick(gallery.id)}
            className="group relative cursor-pointer"
          >
            <div className="glass rounded-[20px] overflow-hidden flex flex-col h-full border-t-4" style={{ borderColor: gallery.color }}>
              <div className="h-48 overflow-hidden">
                <img 
                  src={gallery.artworks[0]?.image || `https://picsum.photos/seed/gallery${gallery.id}/600/400`}
                  alt={gallery.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div 
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white self-start mb-4"
                  style={{ backgroundColor: gallery.color }}
                >
                  {gallery.oddBadge}
                </div>
                <h4 className="font-display font-medium text-2xl text-white mb-2 leading-tight">
                  {gallery.name}
                </h4>
                <p className="text-white/50 text-sm mb-8 flex-grow">
                  {gallery.count} œuvres à découvrir
                </p>
                <button className="text-gold font-bold flex items-center gap-2 group-hover:gap-4 transition-all mt-auto">
                  Explorer <ArrowRight size={18} />
                </button>
              </div>
            </div>
            
            {/* Glow on hover */}
            <div 
              className="absolute -inset-2 opacity-0 group-hover:opacity-20 transition-opacity blur-2xl rounded-3xl -z-10"
              style={{ backgroundColor: gallery.color }}
            ></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
