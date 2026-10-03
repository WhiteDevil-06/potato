"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import clsx from "clsx";

type FightPhase = "PEACEFUL" | "UNACCEPTABLE" | "WEAPON_SELECT" | "RESULT";

const WEAPONS = [
  "Pointless issue",
  "Unnecessary teasing",
  "Misunderstood message",
  "\"I know I'm right\"",
  "Something completely stupid"
];

export default function FightSimulator({ onArgumentWon }: { onArgumentWon?: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const [phase, setPhase] = useState<FightPhase>("PEACEFUL");
  const [peaceProgress, setPeaceProgress] = useState(0);
  const [selectedWeapon, setSelectedWeapon] = useState<string | null>(null);

  // Fake random numbers for the result
  const [brotherConfidence, setBrotherConfidence] = useState(0);
  const [sisterConfidence, setSisterConfidence] = useState(0);
  const [bondStrength, setBondStrength] = useState(0);

  useEffect(() => {
    if (phase === "PEACEFUL" && isInView) {
      // Add a small delay so it doesn't trigger during initial layout calculation
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setPeaceProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setTimeout(() => setPhase("UNACCEPTABLE"), 500);
              return 100;
            }
            return prev + 1;
          });
        }, 30);
        return () => clearInterval(interval);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [phase, isInView]);

  const startFight = () => {
    setPhase("WEAPON_SELECT");
  };

  const executeFight = (weapon: string) => {
    setSelectedWeapon(weapon);
    setBrotherConfidence(Math.floor(Math.random() * 40) + 50); // 50-90%
    setSisterConfidence(Math.floor(Math.random() * 20) + 80); // 80-100% (always higher)
    setBondStrength(Math.floor(Math.random() * 5) + 3); // +3 to +7
    setPhase("RESULT");
    if (onArgumentWon) onArgumentWon();
  };

  const resetSimulator = () => {
    setPeaceProgress(0);
    setPhase("PEACEFUL");
  };

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto my-12 md:my-24 p-6 md:p-10 border border-foreground/10 rounded-2xl bg-foreground/[0.02]">
      <div className="text-center mb-10 border-b border-foreground/10 pb-10">
        <h3 className="font-mono text-[10px] tracking-[0.3em] text-foreground/40 uppercase mb-4">Module 01: Dispute Engine</h3>
        <h2 className="font-serif text-4xl md:text-6xl italic tracking-tighter text-foreground font-light">Argument Simulator</h2>
      </div>

      <div className="min-h-[250px] flex flex-col items-center justify-center relative">
        <AnimatePresence mode="wait">
          {(phase === "PEACEFUL" || phase === "UNACCEPTABLE") && (
            <motion.div
              key="peaceful"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-foreground/70 font-mono mb-4">
                {phase === "PEACEFUL" ? "Everything seems peaceful..." : "Everything seems peaceful."}
              </div>
              
              <div className="w-full max-w-md h-2 bg-foreground/10 rounded-full overflow-hidden mb-8">
                <motion.div 
                  className="h-full bg-[#8fb996]" // calm green
                  style={{ width: `${peaceProgress}%` }}
                />
              </div>

              {phase === "UNACCEPTABLE" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="font-serif text-2xl italic text-red-800/80 mb-6">
                    This is unacceptable.
                  </div>
                  <button
                    onClick={startFight}
                    className="px-8 py-3 border border-foreground/30 font-mono text-xs uppercase tracking-[0.2em] hover:bg-foreground hover:text-background transition-all duration-500"
                  >
                    START AN ARGUMENT
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {phase === "WEAPON_SELECT" && (
            <motion.div
              key="weapon-select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center"
            >
              <div className="font-serif text-4xl md:text-5xl italic mb-12 font-light text-foreground/80">Choose your weapon.</div>
              <div className="flex flex-col gap-3 w-full max-w-sm">
                {WEAPONS.map((weapon, i) => (
                  <motion.button
                    key={weapon}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => executeFight(weapon)}
                    className="p-5 text-xs md:text-sm font-mono border border-foreground/20 hover:border-foreground hover:bg-foreground hover:text-background transition-all duration-700 text-left tracking-widest uppercase"
                  >
                    {weapon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {phase === "RESULT" && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full font-mono text-sm max-w-lg bg-background border-x border-b border-foreground/20 p-5 md:p-12 shadow-2xl relative"
            >
              {/* Receipt-style jagged top */}
              <div className="absolute top-0 left-0 w-full h-2 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwb2x5Z29uIHBvaW50cz0iMCwwIDQsOCA4LDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')] -mt-1" style={{ backgroundSize: '8px 8px' }}></div>

              <div className="text-red-700 font-bold mb-6 border-b border-foreground/10 pb-2">
                ARGUMENT INITIATED
              </div>
              
              <div className="space-y-4 text-foreground/80">
                <div className="flex justify-between">
                  <span>Brother confidence:</span>
                  <span className="font-bold">{brotherConfidence}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Sister confidence:</span>
                  <span className="font-bold">{sisterConfidence}%</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-foreground/5">
                  <span>Actual issue:</span>
                  <span className="text-right">Nobody remembers</span>
                </div>
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="text-right">Neither apologised</span>
                </div>
                <div className="flex justify-between font-bold text-accent pt-2 border-t border-foreground/5">
                  <span>Bond strength:</span>
                  <span>+{bondStrength}</span>
                </div>
              </div>

              <div className="mt-8 text-center font-serif italic text-foreground/60">
                Relationship restored.
              </div>

              <div className="mt-6 flex justify-center">
                <button 
                  onClick={resetSimulator}
                  className="text-xs uppercase tracking-widest text-foreground/40 hover:text-foreground transition-colors underline underline-offset-4"
                >
                  Reset Simulator
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
