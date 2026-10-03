"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TEASES = [
  "SYSTEM WARNING: CRITICAL LEVELS OF DRAMA QUEEN DETECTED IN THE ABOVE GALLERY.",
  "SCROLLING THROUGH ALL THESE PICTURES... I DESERVE A MEDAL FOR PUTTING UP WITH THIS.",
  "PEDDHU, DO YOU EVER GET TIRED OF BEING THIS HIGH MAINTENANCE?",
  "A WHOLE GALLERY OF DUMBSO AND SOMEHOW I'M STILL SURVIVING.",
  "STILL SCROLLING? GO DO SOMETHING PRODUCTIVE, POTATO.",
  "SYSTEM DIAGNOSTIC: YOU ARE EXTREMELY HIGH MAINTENANCE.",
  "I SURVIVED THIS MANY PHOTOS OF YOU, I CAN SURVIVE ANYTHING.",
  "OKAY DRAMA QUEEN, THAT'S ENOUGH MEMORIES FOR TODAY."
];

export default function RandomTease() {
  const [tease, setTease] = useState("");
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    const selected = TEASES[Math.floor(Math.random() * TEASES.length)];
    setTease(selected);
    
    // Typewriter effect
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(selected.substring(0, i));
      i++;
      if (i > selected.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (!tease) {
    return <div className="h-32 w-full" />;
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="w-full md:w-2/3 lg:w-1/2">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.1] text-foreground/80 italic tracking-tighter mix-blend-difference break-words drop-shadow-lg">
          {displayedText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block ml-2 w-4 md:w-8 h-8 md:h-16 bg-foreground/80 align-middle"
          />
        </h2>
      </div>
    </div>
  );
}
