/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import GalleryWings from './components/GalleryWings';
import VirtualBanner from './components/VirtualBanner';
import ArtworkDetail from './components/ArtworkDetail';
import QuizSection from './components/QuizSection';
import OracleChat from './components/OracleChat';
import Leaderboard from './components/Leaderboard';
import Footer from './components/Footer';
import { Artwork, Gallery } from './types';
import { GALLERIES } from './data';

type View = 'home' | 'quiz' | 'oracle' | 'leaderboard' | 'gallery';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  const [userFlames, setUserFlames] = useState(340);
  const [isQuizMode, setIsQuizMode] = useState(false);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    setSelectedArtwork(null);
    setSelectedGallery(null);
    setIsQuizMode(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleArtworkClick = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
  }, []);

  const handleGalleryClick = useCallback((id: number) => {
    const gallery = GALLERIES.find(g => g.id === id);
    if (gallery) {
      setSelectedGallery(gallery);
      setCurrentView('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleQuizComplete = useCallback((score: number, flames: number) => {
    setUserFlames(prev => prev + flames);
  }, []);

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <HeroCarousel onArtworkClick={handleArtworkClick} />
            <GalleryWings onGalleryClick={handleGalleryClick} />
            <VirtualBanner />
          </motion.div>
        );

      case 'gallery':
        return selectedGallery && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-32 px-6 max-w-7xl mx-auto pb-32"
          >
             <button 
              onClick={() => setCurrentView('home')}
              className="text-gold flex items-center gap-2 mb-12 hover:gap-4 transition-all"
             >
                <motion.span animate={{ rotateY: 180 }}>→</motion.span> Retour à l'accueil
             </button>

             <div className="mb-20">
               <div className="flex items-center gap-4 mb-4">
                 <div className="px-4 py-1 rounded-full text-xs font-bold text-white uppercase tracking-widest" style={{ backgroundColor: selectedGallery.color }}>
                   {selectedGallery.oddBadge}
                 </div>
                 <div className="h-[1px] flex-grow bg-white/10"></div>
               </div>
               <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-6">
                 {selectedGallery.name}
               </h1>
               <p className="font-serif italic text-2xl text-white/50 max-w-2xl">
                 "{selectedGallery.subtitle}"
               </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {selectedGallery.artworks.map((artwork) => (
                 <motion.div
                   key={artwork.id}
                   whileHover={{ y: -10 }}
                   onClick={() => handleArtworkClick(artwork)}
                   className="glass rounded-3xl overflow-hidden group cursor-pointer border-white/5"
                 >
                   <div className="aspect-[4/5] overflow-hidden">
                     <img 
                       src={artwork.image} 
                       alt={artwork.title}
                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                       referrerPolicy="no-referrer"
                     />
                   </div>
                   <div className="p-8">
                     <h3 className="font-display font-medium text-2xl text-white mb-1 leading-tight group-hover:text-gold transition-colors">
                       {artwork.title}
                     </h3>
                     <p className="text-white/40 text-sm mb-6">{artwork.artist}, {artwork.year}</p>
                     <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#C9A84C]">Voir l'œuvre →</span>
                        <div className="flex items-center gap-1 text-gold/40">
                           <span className="text-[10px] font-bold">QUIZ</span>
                           <div className="w-1 h-1 rounded-full bg-gold/40"></div>
                        </div>
                     </div>
                   </div>
                 </motion.div>
               ))}
             </div>
          </motion.div>
        );

      case 'quiz':
      return selectedArtwork ? (
     <div className="pt-32 pb-32">
       <QuizSection 
         artwork={selectedArtwork} 
         onComplete={handleQuizComplete}
         onExit={() => {
           setIsQuizMode(false);
           setSelectedArtwork(null);
           setCurrentView('home'); // Always go back to home when exiting quiz
         }}
       />
     </div>
  ) : (
    <div className="pt-40 text-center h-[100vh]">
      <p className="text-white/40 mb-8">Veuillez sélectionner une œuvre dans une galerie pour commencer un quiz.</p>
      <button onClick={() => setCurrentView('home')} className="bg-gold text-primary-dark px-10 py-4 rounded-full font-bold">Retour aux Galeries</button>
    </div>
  );

      case 'oracle':
        return (
          <div className="pt-32 pb-32 px-6">
            <OracleChat onExit={() => setCurrentView('home')} />
          </div>
        );

      case 'leaderboard':
        return (
          <div className="pt-32 pb-32">
            <Leaderboard userFlames={userFlames} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen selection:bg-gold/30">
      <Navbar onNavigate={handleNavigate} currentView={currentView} />
      
      <main>
        <AnimatePresence mode="wait">
          {renderCurrentView()}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Hero-like Artwork Detail Overlay */}
      <AnimatePresence>
        {selectedArtwork && !isQuizMode && currentView !== 'quiz' && (
          <ArtworkDetail 
            artwork={selectedArtwork} 
            onClose={() => setSelectedArtwork(null)}
            onNext={() => {
              const allArtworks = GALLERIES.flatMap(g => g.artworks);
              const idx = allArtworks.findIndex(a => a.id === selectedArtwork.id);
              setSelectedArtwork(allArtworks[(idx + 1) % allArtworks.length]);
            }}
            onPrev={() => {
              const allArtworks = GALLERIES.flatMap(g => g.artworks);
              const idx = allArtworks.findIndex(a => a.id === selectedArtwork.id);
              setSelectedArtwork(allArtworks[(idx - 1 + allArtworks.length) % allArtworks.length]);
            }}
            onStartQuiz={(artwork) => {
              setIsQuizMode(true);
              setCurrentView('quiz');
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
