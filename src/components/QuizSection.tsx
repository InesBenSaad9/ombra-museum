/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, Trophy, Flame, ArrowLeft } from 'lucide-react';
import { Artwork, Question } from '../types';

interface QuizSectionProps {
  artwork: Artwork;
  onComplete: (score: number, flames: number) => void;
  onExit: () => void;
}

export default function QuizSection({ artwork, onComplete, onExit }: QuizSectionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [flamePoints, setFlamePoints] = useState(0);
  const [comboCount, setComboCount] = useState(0);

  const currentQuestion = artwork.quiz[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / artwork.quiz.length) * 100;

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correctIndex;
    
    if (isCorrect) {
      setScore(prev => prev + 1);
      const points = 10 * (comboCount + 1);
      setFlamePoints(prev => prev + points);
      setComboCount(prev => prev + 1);
    } else {
      setComboCount(0);
    }
    
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < artwork.quiz.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      onComplete(score, flamePoints);
    }
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto p-12 glass rounded-[32px] text-center border-gold"
      >
        <Trophy size={64} className="text-gold mx-auto mb-6" />
        <h2 className="font-display font-bold text-4xl text-white mb-2">Quiz Terminé !</h2>
        <p className="text-white/60 mb-8">Votre exploration de "{artwork.title}" a porté ses fruits.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="bg-white/5 rounded-2xl p-6">
            <p className="text-gold text-sm font-bold tracking-widest uppercase mb-1">Score</p>
            <p className="text-4xl text-white font-display font-bold">{score}/{artwork.quiz.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-6">
            <p className="text-gold text-sm font-bold tracking-widest uppercase mb-1">Flammes</p>
            <p className="text-4xl text-white font-display font-bold">+{flamePoints} 🔥</p>
          </div>
        </div>

        <button 
          onClick={onExit}
          className="bg-gold text-primary-dark w-full py-4 rounded-full font-bold hover:bg-gold-light transition-all"
        >
          Continuer l'exploration
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6">
      <div className="flex items-center justify-between mb-8">
        <button onClick={onExit} className="text-white/60 hover:text-white flex items-center gap-2">
          <ArrowLeft size={20} /> Retour
        </button>
        <div className="flex items-center gap-2 text-gold">
          <Flame size={20} />
          <span className="font-bold">{flamePoints} Flammes</span>
          {comboCount > 1 && (
            <span className="bg-gold text-primary-dark px-2 py-0.5 rounded text-[10px] font-bold">
              COMBO ×{comboCount}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Artwork Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass rounded-2xl aspect-[3/4] overflow-hidden group">
            <img 
              src={artwork.image} 
              alt={artwork.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="p-4">
             <h3 className="font-display font-bold text-white text-xl">{artwork.title}</h3>
             <p className="text-white/50 text-sm">{artwork.artist}, {artwork.year}</p>
          </div>
        </div>

        {/* Right: Quiz Content */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="flex justify-between text-xs text-white/40 mb-2 font-bold uppercase tracking-widest">
              <span>Question {currentQuestionIndex + 1} / {artwork.quiz.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 lg:h-2 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${progress}%` }}
                 className="h-full bg-gold"
               />
            </div>
          </div>

          <h2 className="font-display font-medium text-2xl md:text-3xl text-white mb-10 min-h-[80px]">
            {currentQuestion.text}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentQuestion.correctIndex;
              const isWrong = isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionSelect(idx)}
                  className={`relative p-6 rounded-2xl text-left border transition-all ${
                    selectedOption === null 
                      ? 'glass border-gold/10 hover:border-gold hover:bg-gold/5' 
                      : isCorrect 
                        ? 'bg-green-500/10 border-green-500/50 text-green-100'
                        : isWrong
                          ? 'bg-red-500/10 border-red-500/50 text-red-100'
                          : 'bg-white/5 border-white/5 text-white/30'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg capitalize">{option}</span>
                    {selectedOption !== null && isCorrect && <CheckCircle2 className="text-green-500" size={24} />}
                    {isWrong && <XCircle className="text-red-500" size={24} />}
                  </div>
                </button>
              );
            })}
          </div>

          <AnimatePresence>
            {showExplanation && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-12 p-8 glass border-gold/20 rounded-2xl"
              >
                <div className="flex items-center gap-2 text-gold mb-4 uppercase tracking-tighter text-xs font-bold font-display">
                  <span>🕯 L'Oracle nous dit...</span>
                </div>
                <p className="font-serif italic text-lg text-white/80 leading-relaxed mb-8">
                  {currentQuestion.explanation}
                </p>
                <button 
                  onClick={handleNext}
                  className="bg-gold text-primary-dark ml-auto px-8 py-3 rounded-full font-bold text-sm tracking-widest flex items-center gap-2 hover:bg-gold-light transition-all"
                >
                  Suivant <ChevronRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
