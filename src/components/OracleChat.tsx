/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ArrowLeft, Loader2, Sparkles, User, HelpCircle } from 'lucide-react';
import { askOracle } from '../services/oracleService';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export default function OracleChat({ onExit }: { onExit: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      parts: [{ text: "🕯 Bienvenue, visiteur des ombres... Je suis le gardien de ces galeries. Quelle œuvre vous trouble l'âme ce soir ?" }]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Parle-moi du Cri de Munch",
    "Qu'est-ce que l'ODD 3 ?",
    "Quelle est l'œuvre la plus sombre ?",
    "Comment l'art résiste-t-il ?",
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', parts: [{ text }] };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ 
      role: m.role, 
      parts: m.parts 
    }));

    const response = await askOracle(text, history);
    
    setMessages(prev => [...prev, { role: 'model', parts: [{ text: response }] }]);
    setIsLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[80vh] flex flex-col glass rounded-[32px] overflow-hidden border-gold/20 shadow-2xl shadow-gold/5">
      {/* Header */}
      <div className="p-6 border-b border-gold/10 flex items-center justify-between bg-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
            🕯
          </div>
          <div>
            <h2 className="font-display font-bold text-white tracking-wide">L'Oracle de l'OMBRA</h2>
            <p className="text-[10px] text-gold/60 uppercase tracking-widest font-bold">Gardien des Galeries</p>
          </div>
        </div>
        <button onClick={onExit} className="text-white/40 hover:text-white transition-colors">
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-gold/20"
      >
        <AnimatePresence initial={false}>
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-5 rounded-2xl relative ${
                  m.role === 'user' 
                    ? 'bg-gold text-primary-dark font-medium rounded-tr-none' 
                    : 'glass text-white/90 border-gold/10 font-serif italic text-lg rounded-tl-none'
                }`}
              >
                {m.role === 'model' && <span className="absolute -left-10 top-0 text-xl">🕯</span>}
                {m.parts[0].text}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="glass p-5 rounded-2xl rounded-tl-none flex items-center gap-2">
                <Loader2 size={16} className="animate-spin text-gold" />
                <span className="text-white/40 text-sm italic">L'Oracle consulte les ombres...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-gold/10 bg-white/5">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestedPrompts.map((p, i) => (
            <button 
              key={i} 
              onClick={() => handleSend(p)}
              className="text-[11px] px-3 py-1.5 glass rounded-full text-white/50 hover:text-gold hover:border-gold transition-all"
            >
              {p}
            </button>
          ))}
        </div>
        <div className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Interrogez l'Oracle..."
            className="w-full bg-surface border border-gold/20 rounded-full py-4 pl-6 pr-14 text-white focus:outline-none focus:border-gold transition-colors placeholder:text-white/20"
          />
          <button 
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold text-primary-dark flex items-center justify-center disabled:opacity-50 hover:bg-gold-light transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
