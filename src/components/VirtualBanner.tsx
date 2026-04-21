/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export default function VirtualBanner() {
  return (
    <section className="relative h-[600px] w-full flex items-center justify-center overflow-hidden my-32">
      {/* Background with dimmed museum photo */}
      <div className="absolute inset-0">
        <img 
          src="https://picsum.photos/seed/museum_interior/1920/1080?blur=4" 
          alt="Museum Interior"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative glass max-w-2xl p-12 text-center rounded-[32px] border-gold/40 backdrop-blur-[24px]"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center text-gold">
             <span className="text-3xl">🏛</span>
          </div>
        </div>
        <h2 className="font-display font-bold text-4xl text-white mb-6">Visitez l'OMBRA en 3D</h2>
        <p className="text-white/70 text-lg mb-10 leading-relaxed">
          Explorez les galeries en immersion totale sur Spatial.io. Une expérience unique où l'art et les enjeux mondiaux se rencontrent dans un espace virtuel d'exception.
        </p>
        <a 
          href="https://www.spatial.io/s/Nissas-Next-Scene-69d278aaa7d7dcc7b3ab3321?share=2611753376635350311"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gold text-primary-dark px-10 py-4 rounded-full font-bold text-lg hover:bg-gold-light transition-all inline-flex items-center gap-3"
        >
          Entrer dans le Musée 3D <ExternalLink size={20} />
        </a>
      </motion.div>
    </section>
  );
}
