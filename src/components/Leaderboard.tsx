/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Flame, User } from 'lucide-react';

export default function Leaderboard({ userFlames }: { userFlames: number }) {
  const leaders = [
    { name: "Oracle Leila", flames: 4200, rank: "🥇", color: "#C9A84C" },
    { name: "Gardien Yasmine", flames: 3100, rank: "🥈", color: "#D46A1A" },
    { name: "Témoin Rami", flames: 2400, rank: "🥉", color: "#8B1A1A" },
    { name: "Visiteur Nour", flames: 1800, rank: "4.", color: "#185FA5" },
    { name: "Visiteur Ines", flames: 1200, rank: "5.", color: "#C9891A" },
  ];

  const maxFlames = Math.max(...leaders.map(l => l.flames));

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-16">
        <Trophy size={48} className="text-gold mx-auto mb-4" />
        <h2 className="font-display font-bold text-5xl text-white mb-2">Les Gardiens de l'OMBRA</h2>
        <p className="text-white/50 tracking-widest uppercase text-xs font-bold">Cette semaine</p>
      </div>

      <div className="space-y-4 mb-20">
        {leaders.map((leader, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl flex items-center gap-6 group hover:border-gold/40 transition-all"
          >
            <div className="w-12 font-display font-bold text-2xl text-gold flex-shrink-0">{leader.rank}</div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-lg text-white">{leader.name}</span>
                <span className="flex items-center gap-2 text-gold font-bold">
                  {leader.flames.toLocaleString()} <Flame size={16} />
                </span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(leader.flames / maxFlames) * 100}%` }}
                  className="h-full bg-gold opacity-50 group-hover:opacity-100 transition-all"
                  style={{ backgroundColor: leader.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass p-8 rounded-[32px] border-gold bg-gold/5 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full border-2 border-gold flex items-center justify-center text-gold text-3xl font-display">
             #12
          </div>
          <div>
            <h3 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Votre Rang Actuel</h3>
            <p className="text-3xl font-display font-bold text-white mb-1">Témoin de l'OMBRA</p>
            <div className="flex items-center gap-2 text-gold">
               <Flame size={18} fill="currentColor" />
               <span className="font-bold text-xl">{userFlames.toLocaleString()} 🔥</span>
            </div>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-white/40 text-sm mb-2">Encore 160 🔥 pour devenir "Gardien des Flammes"</p>
          <div className="w-64 h-3 bg-white/10 rounded-full overflow-hidden border border-white/5">
             <div className="h-full bg-gold w-2/3 shadow-[0_0_10px_rgba(201,168,76,0.5)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
