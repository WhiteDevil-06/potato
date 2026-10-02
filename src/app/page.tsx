"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import PhotoMasonry from "@/components/PhotoMasonry";
import FightSimulator from "@/components/FightSimulator";
import EmotionalTransition from "@/components/EmotionalTransition";
import RandomTease from "@/components/RandomTease";

export default function Home() {
// ... same as before
  const [step, setStep] = useState(0);
  const [systemInitialized, setSystemInitialized] = useState(false);
  const [argumentWon, setArgumentWon] = useState(false);

  useEffect(() => {
    if (systemInitialized) return;

    // Automated sequence progression
    const timers = [
      setTimeout(() => setStep(1), 1500), // Show scanning...
      setTimeout(() => setStep(2), 3500), // Name detected
      setTimeout(() => setStep(3), 5500), // Known aliases
      setTimeout(() => setStep(4), 7500), // Relationship
      setTimeout(() => setStep(5), 10000), // Error
      setTimeout(() => setStep(6), 11500), // True relationship
      setTimeout(() => setStep(7), 13500), // Transition out of terminal
    ];

    return () => timers.forEach(clearTimeout);
  }, [systemInitialized]);

  return (
    <main className={clsx(
      "flex-1 flex flex-col items-center justify-center relative min-h-screen w-full",
      !systemInitialized && "overflow-hidden"
    )}>
      <AnimatePresence mode="wait">
         {!systemInitialized ? (
           <motion.div 
             key="intro-sequence" 
             className="w-full flex flex-col justify-center items-center flex-1 p-6 md:p-12"
            exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }} 
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <AnimatePresence mode="wait">
              {step < 7 ? (
                <motion.div
                  key="terminal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="font-mono text-sm md:text-base text-foreground/80 max-w-lg w-full flex flex-col gap-6"
                >
                  {step >= 1 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      SCANNING...
                    </motion.div>
                  )}

                  {step >= 2 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="text-foreground/50">Name detected:</div>
                      <div className="font-bold text-foreground text-lg">SHRAAVYA M S</div>
                    </motion.div>
                  )}

                  {step >= 3 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="text-foreground/50">Known aliases:</div>
                      <ul className="list-disc list-inside">
                        <li>Drama Queen</li>
                        <li className="font-bold">Potato</li>
                        <li>Peddhu</li>
                        <li>Dumbso</li>
                      </ul>
                    </motion.div>
                  )}

                  {step >= 4 && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="text-foreground/50">Relationship detected:</div>
                      <div>Friend</div>
                    </motion.div>
                  )}

                  {step >= 5 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-red-600/90 mt-4 border border-red-600/20 p-2 rounded bg-red-600/5 font-bold"
                    >
                      ...ERROR.
                    </motion.div>
                  )}

                  {step >= 6 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <div className="text-foreground/50">Relationship:</div>
                      <div className="font-bold text-accent text-2xl uppercase tracking-wider">AKKAAWWW</div>
                      <div className="text-foreground/50 text-xs mt-1">Confidence: 100%</div>
                    </motion.div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="editorial"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center text-center max-w-2xl w-full"
                >
                  <div className="flex mb-8 overflow-hidden py-2">
                    {"POTATO.EXE".split("").map((char, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ 
                          delay: 1 + i * 0.15, 
                          duration: 0
                        }}
                        className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-foreground"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 1.5 }}
                    className="text-xl md:text-2xl text-foreground/80 font-serif italic"
                  >
                    Okay.
                    <br />
                    <span className="mt-4 block">That makes more sense.</span>
                  </motion.p>

                  <motion.button
                    onClick={() => setSystemInitialized(true)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4, duration: 1 }}
                    className="mt-16 px-8 py-3 border border-foreground/20 rounded-full text-sm tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors duration-500 ease-out cursor-pointer"
                  >
                    Initialize System
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            key="masonry-system" 
            className="w-full flex flex-col" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 1, delay: 0.5 }}
          >
            <PhotoMasonry />
            <RandomTease />
            <FightSimulator onArgumentWon={() => setArgumentWon(true)} />
            
            {argumentWon && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-full flex flex-col"
              >
                <EmotionalTransition />
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
