/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-primary-dark">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-6 group">
            <span className="font-display font-bold text-3xl tracking-tighter text-white">OMBRA</span>
            <div className="w-12 h-[1px] bg-gold opacity-50 group-hover:w-20 transition-all duration-700"></div>
          </div>
          <p className="text-white/40 text-sm leading-relaxed max-w-[240px]">
            Observatoire Mondial des Beautés et Résistances Artistiques. L'art comme témoin des enjeux mondiaux.
          </p>
        </div>
        
        <div>
          <h4 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-xs">Exploration</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><button className="hover:text-gold transition-colors">Galerie I — Pauvreté</button></li>
            <li><button className="hover:text-gold transition-colors">Galerie II — Faim</button></li>
            <li><button className="hover:text-gold transition-colors">Galerie III — Santé</button></li>
            <li><button className="hover:text-gold transition-colors">Galerie IV — Éducation</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-xs">Interactions</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><button className="hover:text-gold transition-colors">Quiz Interprétatif</button></li>
            <li><button className="hover:text-gold transition-colors">L'Oracle</button></li>
            <li><button className="hover:text-gold transition-colors">Musée Virtuel 3D</button></li>
            <li><button className="hover:text-gold transition-colors">À propos</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white mb-6 uppercase tracking-widest text-xs">Contact</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li className="flex items-center gap-2">
              <span className="text-gold">Spatial.io:</span> 
              <span className="truncate">Nissas-Next-Scene</span>
            </li>
            <li>Paris, France</li>
            <li>© 2026 OMBRA</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-white/5 text-center text-[10px] text-white/20 uppercase tracking-[0.2em]">
        Tous droits réservés — Créé pour l'humanité et la résistance
      </div>
    </footer>
  );
}
