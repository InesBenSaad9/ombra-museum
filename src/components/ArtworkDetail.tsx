/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Maximize2, MoreHorizontal, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Artwork } from '../types';

interface ArtworkDetailProps {
  artwork: Artwork;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  onStartQuiz: (artwork: Artwork) => void;
}

export default function ArtworkDetail({ artwork, onClose, onPrev, onNext, onStartQuiz }: ArtworkDetailProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      {/* Blurred background overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={onClose}></div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="relative glass w-full max-w-5xl rounded-[32px] overflow-hidden flex flex-col md:flex-row h-auto md:h-[85vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-gold transition-colors"
        >
          <X size={20} />
        </button>

        {/* Artwork Side (Left on Desktop) */}
        <div className="md:w-3/5 relative bg-black/20 flex flex-col items-center justify-center p-8 border-r border-white/10 group">
          <div className="relative w-full h-full flex items-center justify-center">
            <img 
              src={artwork.image} 
              alt={artwork.title}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              referrerPolicy="no-referrer"
            />
            {/* Overlay buttons like in ArtMuseum reference */}
            <button className="absolute top-4 left-1/2 -translate-x-1/2 glass px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={14} /> Expand
            </button>
            <button className="absolute top-4 right-4 glass w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal size={14} />
            </button>
          </div>
          
          {/* Navigation Arrows inside image area */}
          <div className="absolute inset-y-0 left-0 flex items-center px-4">
            <button onClick={onPrev} className="w-12 h-12 rounded-full glass flex items-center justify-center transition-transform hover:scale-110">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center px-4">
            <button onClick={onNext} className="w-12 h-12 rounded-full glass flex items-center justify-center transition-transform hover:scale-110">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Content Side (Right on Desktop) */}
        <div className="md:w-2/5 p-8 md:p-12 overflow-y-auto bg-surface/50 backdrop-blur-md flex flex-col">
          <div className="mb-8">
            <div 
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold text-white mb-6 uppercase tracking-wider"
              style={{ backgroundColor: artwork.oddColor }}
            >
              {artwork.oddLabel} — {artwork.oddBadge || `ODD ${artwork.odd}`}
            </div>
            <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-2 leading-tight">
              {artwork.title}
            </h2>
            <p className="text-gold font-medium mb-8">{artwork.year}</p>
            
            <p className="font-serif italic text-2xl text-white/90 leading-relaxed mb-8">
              "{artwork.quote}"
            </p>

            <div className="space-y-4 pt-8 border-t border-white/10 text-sm">
              <div className="flex justify-between items-center py-2">
                <span className="text-white/40">Artiste</span>
                <span className="text-white font-medium">{artwork.artist}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-white/40">Medium</span>
                <span className="text-white font-medium">{artwork.medium}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-white/40">Dimensions</span>
                <span className="text-white font-medium">{artwork.dimensions}</span>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-10 border-t border-white/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden border border-white/20">
                <img 
                  src={`https://picsum.photos/seed/${artwork.artist}/100/100`} 
                  alt={artwork.artist}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-xs text-white/50 font-display">ARTISTE</p>
                <p className="font-medium text-sm text-white">{artwork.artist}</p>
              </div>
            </div>
            
            <button 
              onClick={() => onStartQuiz(artwork)}
              className="bg-gold text-primary-dark px-6 py-3 rounded-full font-bold text-sm tracking-widest flex items-center gap-2 hover:bg-gold-light transition-all active:scale-95"
            >
              <Play size={16} fill="currentColor" /> JOUER LE QUIZ
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
