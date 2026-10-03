"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import confetti from "canvas-confetti";

const FINAL_MESSAGE = "If I had been given an elder sister, I think I'd want her to be you. \nI'm glad life gave me you instead. \n\nCome what may, I'm not giving up on you. \nThat's what a brother does.";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";

export default function EmotionalTransition() {
  // Flashlight state
  const flashlightRef = useRef<HTMLDivElement>(null);
  const [lightsOn, setLightsOn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Decoder state
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptionProgress, setDecryptionProgress] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showFinal, setShowFinal] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (lightsOn || !flashlightRef.current) return;
    const rect = flashlightRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Confetti Effect when Receipt Mounts
  useEffect(() => {
    if (showFinal) {
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 7,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.8 },
          colors: ['#d4a373', '#ffffff', '#222222']
        });
        confetti({
          particleCount: 7,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.8 },
          colors: ['#d4a373', '#ffffff', '#222222']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [showFinal]);

  const hasFinishedRef = useRef(false);

  // Decoder Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    // Stop the progress logic if we've already hit 100
    if (hasFinishedRef.current) return;

    if (decryptionProgress >= 100) {
      hasFinishedRef.current = true;
      setDisplayedText(FINAL_MESSAGE);
      
      // Wait 3 seconds for her to read, then start 3-2-1 countdown
      const timeout = setTimeout(() => {
        setCountdown(3);
        let count = 3;
        const countInterval = setInterval(() => {
          count -= 1;
          if (count > 0) {
            setCountdown(count);
          } else {
            clearInterval(countInterval);
            setCountdown(null);
            setShowFinal(true);
          }
        }, 1000);
      }, 3000); 

      return;
    }

    if (isDecrypting) {
      interval = setInterval(() => {
        setDecryptionProgress(prev => Math.min(prev + 0.8, 100));
      }, 30);
    } else if (decryptionProgress > 0 && decryptionProgress < 100) {
      interval = setInterval(() => {
        setDecryptionProgress(prev => Math.max(prev - 2, 0));
      }, 30);
    }
    return () => clearInterval(interval);
  }, [isDecrypting, decryptionProgress]);

  useEffect(() => {
    if (decryptionProgress >= 100) return;
    
    // Calculate the scrambled text based on current decryptionProgress immediately
    let result = "";
    for (let i = 0; i < FINAL_MESSAGE.length; i++) {
      if (FINAL_MESSAGE[i] === " " || FINAL_MESSAGE[i] === "\n") {
        result += FINAL_MESSAGE[i];
        continue;
      }
      
      // Reveal between 0% and 100% left-to-right
      const charRevealThreshold = (i / FINAL_MESSAGE.length) * 100;

      if (decryptionProgress > charRevealThreshold) {
        result += FINAL_MESSAGE[i];
      } else {
        result += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
    }
    setDisplayedText(result);
  }, [decryptionProgress]);

  return (
    <div className="w-full flex flex-col items-center">
      
      {/* THE FLASHLIGHT IN THE DARK (SCROLL TRAP ONLY ON DESKTOP) */}
      <section 
        ref={flashlightRef}
        onPointerMove={handlePointerMove}
        className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 md:touch-none"
        style={{ 
          backgroundColor: lightsOn ? 'var(--background)' : '#050505',
          color: lightsOn ? 'var(--foreground)' : '#ffffff',
          cursor: lightsOn ? 'auto' : 'none'
        }}
      >
        {!lightsOn && (
          <div className="absolute top-10 left-1/2 -translate-x-1/2 text-white/20 font-mono text-xs tracking-widest uppercase animate-pulse w-full text-center px-4">
            <span className="hidden md:inline">[ Search in the dark ]</span>
            <span className="inline md:hidden">[ Tap below in the dark ]</span>
          </div>
        )}

        {/* Content Wrapper - Masked when lights are off on desktop. On mobile, we use a CSS fallback or disable the mask */}
        <div 
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={!lightsOn ? {
            WebkitMaskImage: `radial-gradient(circle 220px at ${mousePos.x ? mousePos.x + 'px' : '50%'} ${mousePos.y ? mousePos.y + 'px' : '80%'}, black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle 220px at ${mousePos.x ? mousePos.x + 'px' : '50%'} ${mousePos.y ? mousePos.y + 'px' : '80%'}, black 0%, transparent 100%)`
          } : {}}
        >
          {/* MOBILE SAFE GRID: Stacks vertically on mobile, 3x3 on desktop */}
          <div className="w-full h-full flex flex-col md:grid md:grid-cols-3 md:grid-rows-3 gap-8 p-8 md:p-24 relative justify-center md:justify-stretch">
            
            {/* Top Left */}
            <div className={clsx("md:col-start-1 md:row-start-1 flex items-start justify-center md:justify-start transition-opacity duration-1000", lightsOn ? "opacity-0 hidden md:flex" : "opacity-100")}>
              <div className="font-serif italic text-xl sm:text-2xl md:text-3xl text-foreground/80 max-w-[250px] text-center md:text-left">
                Okay, Potato.
              </div>
            </div>

            {/* Top Right */}
            <div className={clsx("md:col-start-3 md:row-start-1 flex items-start justify-center md:justify-end transition-opacity duration-1000", lightsOn ? "opacity-0 hidden md:flex" : "opacity-100")}>
              <div className="font-serif italic text-xl sm:text-2xl md:text-4xl text-center md:text-right max-w-[350px] tracking-tight">
                There's something I've never really known how to say properly.
              </div>
            </div>

            {/* Middle Left */}
            <div className={clsx("md:col-start-1 md:row-start-2 flex items-center justify-center md:justify-start transition-opacity duration-1000", lightsOn ? "opacity-0 hidden md:flex" : "opacity-100")}>
              <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] max-w-[280px] text-current opacity-70 text-center md:text-left">
                You don't have to call me every day.
              </div>
            </div>

            {/* Middle Center */}
            <div className={clsx("md:col-start-2 md:row-start-2 flex items-center justify-center transition-opacity duration-1000", lightsOn ? "opacity-0 hidden md:flex" : "opacity-100")}>
              <div className="font-serif italic text-xl sm:text-2xl md:text-4xl text-center max-w-[400px]">
                Just call when you need your annoying younger brother. I'll pick up.
              </div>
            </div>

            {/* Middle Right */}
            <div className={clsx("md:col-start-3 md:row-start-2 flex items-center justify-center md:justify-end transition-opacity duration-1000", lightsOn ? "opacity-0 hidden md:flex" : "opacity-100")}>
              <div className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-center md:text-right max-w-[280px] tracking-tight">
                You don't even have to explain everything.
              </div>
            </div>

            {/* Bottom Right: SISTER */}
            <div className="md:col-start-3 md:row-start-3 flex flex-col items-center md:items-end justify-center md:justify-end relative mt-12 md:mt-0">
              <div 
                onPointerEnter={() => {
                  if (!lightsOn) setTimeout(() => setLightsOn(true), 300);
                }}
                onClick={() => setLightsOn(true)}
                className="font-serif text-5xl sm:text-6xl md:text-8xl uppercase tracking-tighter pointer-events-auto hover:text-[#d4a373] transition-colors duration-500 cursor-pointer"
              >
                Sister
              </div>
              {!lightsOn && (
                <div className="absolute bottom-[-30px] font-mono text-[10px] text-current opacity-30 tracking-widest uppercase animate-pulse whitespace-nowrap">
                  <span className="hidden md:inline">(Hover to illuminate)</span>
                  <span className="inline md:hidden">(Tap to illuminate)</span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* CONDITIONAL RENDER: ONLY APPEARS ONCE LIGHTS ARE ON */}
      {lightsOn && (
        <div className="w-full">
          <AnimatePresence mode="wait">
            {!showFinal ? (
              <motion.section 
                key="decoder-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="min-h-screen w-full bg-[#111] text-[#fff] flex flex-col items-center justify-center px-6 py-32 text-center overflow-hidden relative"
              >
                {/* 3-2-1 COUNTDOWN */}
                <AnimatePresence mode="wait">
                  {countdown !== null && (
                    <motion.div 
                      key={countdown}
                      initial={{ opacity: 0, filter: "blur(20px)", scale: 0.5 }}
                      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={{ opacity: 0, filter: "blur(20px)", scale: 1.5 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="absolute top-12 right-12 font-mono text-5xl md:text-7xl text-[#d4a373] z-20"
                    >
                      {countdown}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="max-w-4xl w-full flex flex-col items-center z-10">
                  
                  <div className="h-64 flex items-center justify-center mb-16">
                    <h2 className={clsx(
                      "font-mono text-2xl md:text-4xl whitespace-pre-line leading-relaxed min-h-[150px] transition-all duration-1000",
                      decryptionProgress >= 100 ? "text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" : "text-[#d4a373]"
                    )}>
                      {displayedText || "INITIALIZING..."}
                    </h2>
                  </div>

                  <AnimatePresence>
                    {decryptionProgress < 100 && (
                      <motion.div
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        className="flex flex-col items-center"
                      >
                        <button
                          onPointerDown={() => setIsDecrypting(true)}
                          onPointerUp={() => setIsDecrypting(false)}
                          onPointerLeave={() => setIsDecrypting(false)}
                          onTouchStart={(e) => { e.preventDefault(); setIsDecrypting(true); }}
                          onTouchEnd={(e) => { e.preventDefault(); setIsDecrypting(false); }}
                          className="px-8 py-4 border-2 border-[#d4a373] text-[#d4a373] font-mono text-xs md:text-sm tracking-widest uppercase rounded hover:bg-[#d4a373]/10 active:scale-95 transition-all select-none touch-none"
                        >
                          Hold to Confirm Your Status as 'Potato'
                        </button>
                        <div className="w-full max-w-xs h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#d4a373] transition-all duration-75"
                            style={{ width: `${decryptionProgress}%` }}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none font-mono text-xs overflow-hidden break-all text-justify leading-none">
                  {Array.from({ length: 1000 }).map(() => CHARS[Math.floor(Math.random() * CHARS.length)]).join("")}
                </div>
              </motion.section>
            ) : (
              <motion.section 
                key="receipt-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-32 bg-foreground/5 relative"
              >
                <div className="bg-background max-w-md w-full shadow-2xl p-8 md:p-12 border border-foreground/10 relative">
                  {/* Receipt jagged edge top */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-transparent" style={{ backgroundImage: 'linear-gradient(135deg, transparent 50%, var(--background) 50%), linear-gradient(45deg, var(--background) 50%, transparent 50%)', backgroundSize: '10px 10px', backgroundPosition: 'top left, top left', backgroundRepeat: 'repeat-x', transform: 'translateY(-100%)' }} />
                  
                  {/* Receipt Header */}
                  <div className="text-center border-b-2 border-dashed border-foreground/20 pb-8 mb-8">
                    <h1 className="font-mono text-3xl md:text-4xl tracking-tighter uppercase mb-2 text-foreground font-bold">
                      POTATO.EXE
                    </h1>
                    <p className="font-mono text-xs tracking-widest text-foreground/50">RELATIONSHIP ARCHIVE</p>
                    <p className="font-mono text-xs text-foreground/40 mt-1">ISSUED TO: SHRAAVYA M S</p>
                  </div>

                  {/* CORE MEMORY VIDEO ATTACHMENT */}
                  <div className="w-full mb-8 rounded-lg overflow-hidden border border-foreground/10 shadow-inner bg-black/5 p-2">
                    <div className="w-full relative rounded overflow-hidden">
                       <video 
                         autoPlay 
                         loop 
                         muted 
                         playsInline 
                         className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                       >
                         <source src="/46.mp4" type="video/mp4" />
                       </video>
                       <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-white/80 font-mono text-[8px] px-2 py-1 rounded tracking-widest uppercase">
                         ATTACHMENT_01.MP4
                       </div>
                    </div>
                  </div>

                  {/* Receipt Items */}
                  <div className="space-y-4 font-mono text-sm mb-8">
                    <div className="flex justify-between border-b border-foreground/5 pb-2">
                      <span className="text-foreground/70">CONTRACT LENGTH</span>
                      <span className="font-bold">4 YEARS (AUTO-RENEWING)</span>
                    </div>
                    <div className="flex justify-between border-b border-foreground/5 pb-2">
                      <span className="text-foreground/70">INSULTS EXCHANGED</span>
                      <span className="font-bold">UNQUANTIFIABLE</span>
                    </div>
                    <div className="flex justify-between border-b border-foreground/5 pb-2">
                      <span className="text-foreground/70">ROLE ASSIGNED</span>
                      <span className="font-bold">HONORARY ELDER SISTER</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="text-foreground/70">CANCELLATION POLICY</span>
                      <span className="font-bold text-accent">STRICTLY PROHIBITED</span>
                    </div>
                  </div>

                  {/* Personal Message */}
                  <div className="border-t-2 border-dashed border-foreground/20 pt-8 text-center space-y-6">
                    <h2 className="font-serif text-3xl text-accent font-medium">
                      Happy Birthday.
                    </h2>
                    <div className="font-serif italic text-foreground/70 space-y-4 leading-relaxed">
                      <p>As your officially self-appointed younger brother, I am legally obligated to wish you today.</p>
                      <p>Life is weird. Four years of putting up with your drama, and somehow you just became family.</p>
                      <p>I will never say this out loud (so take a screenshot), but you're the exact elder sister I needed to annoy, argue with, and rely on.</p>
                    </div>
                    <div className="font-mono text-xs text-foreground/40 pt-8 uppercase tracking-widest">
                      Have the best day ever. The roasting resumes tomorrow.
                    </div>
                    
                    {/* Barcode */}
                    <div className="pt-8 flex justify-center opacity-30">
                      <div className="w-full h-12 flex space-x-1">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div key={i} className="h-full bg-foreground" style={{ width: `${Math.random() * 4 + 1}px` }} />
                        ))}
                      </div>
                    </div>
                    <div className="font-mono text-[10px] text-foreground/30 mt-2">
                      100101-POTATO-000001
                    </div>
                  </div>

                  {/* Receipt jagged edge bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-transparent" style={{ backgroundImage: 'linear-gradient(135deg, var(--background) 50%, transparent 50%), linear-gradient(45deg, transparent 50%, var(--background) 50%)', backgroundSize: '10px 10px', backgroundPosition: 'bottom left, bottom left', backgroundRepeat: 'repeat-x', transform: 'translateY(100%)' }} />
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
