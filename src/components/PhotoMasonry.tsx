"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

// 45 Highly tailored, unique captions for each specific photo
const SPECIFIC_CAPTIONS: Record<number, string> = {
  1: "You probably asked for food five seconds after this.", 
  2: "The classic 'pretending I didn't see the camera' pose. Original.",
  3: "Trying to look majestic. Keyword: trying.",
  4: "Proof that she occasionally looks presentable. Rarely.",
  5: "That smile means you're about to ask for a favor.",
  6: "Blocking out the haters (I am the CEO of the haters).",
  7: "Probably complained about having to pose for this.",
  8: "Ten minutes before causing absolutely pointless drama.",
  9: "The rare 0.0001% of the time she's actually quiet.",
  10: "Looking entirely too pleased with herself.",
  11: "Warning: High levels of Drama Queen energy detected.",
  12: "Look at that smile (she definitely wanted a favor).",
  13: "Looking like the final boss of annoying siblings.",
  14: "The awkward phase we pretend didn't happen.",
  15: "The 'I'm telling Mom' face. Classic.",
  16: "Okay fine, this one is actually a core memory.",
  17: "Wherever you were here, I'm just glad I didn't have to be there.",
  18: "Peak Potato energy.",
  19: "Blackmail material. Saving this forever.",
  20: "I am smiling, but internally I am suffering.",
  21: "Actually a nice photo. Do NOT let it go to your head.",
  22: "Unmatched chaotic Dumbso energy.",
  23: "When she acts innocent but I know the evil truth.",
  24: "Caught in 4K acting like a literal child.",
  25: "Probably thinking about food right here.",
  26: "The dictionary definition of high maintenance.",
  27: "She thought this was a candid. It wasn't.",
  28: "The only person who can annoy me into total submission.",
  29: "I'm literally just the unpaid personal photographer.",
  30: "Why are you like this?",
  31: "Sometimes I seriously wonder if we are actually related.",
  32: "The rare moment we pretended to be well-behaved in public.",
  33: "A rare sighting of the Peddhu in the wild.",
  34: "She's incredibly lucky I have the patience of a saint.",
  35: "I have absolutely no idea what is happening here.",
  36: "The face of pure entitlement.",
  37: "Actually proud of you (I will deny I ever said this).",
  38: "If 'I need you to buy me something' was a person.",
  39: "I swear she lives solely to test my limits.",
  40: "The sass in this photo is palpable.",
  41: "I literally cannot take her anywhere nice.",
  42: "This is going directly into the cringe compilation.",
  43: "You think you're the boss, but we both know the truth.",
  44: "Looking at this gives me a headache.",
  45: "Despite everything, I guess you're alright."
};

// Mapping the specific extensions based on the folder scan
const EXTENSIONS: Record<number, string> = {
  8: "jpeg",
  9: "jpeg"
};

// Generate the 45 media items
const MEDIA_ITEMS = Array.from({ length: 45 }).map((_, i) => {
  const id = i + 1;
  const ext = EXTENSIONS[id] || "jpg";
  const isVideo = ext === "mp4";
  
  return {
    id,
    src: `/${id}.${ext}`,
    type: isVideo ? "video" : "image",
    caption: SPECIFIC_CAPTIONS[id] || "Memory fragment corrupted.",
    category: isVideo ? "VIDEO EVIDENCE" : "MEMORY ARCHIVE",
  };
});

export default function PhotoMasonry() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="w-full max-w-7xl mx-auto p-4 md:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="mb-24 text-center"
      >
        <h2 className="font-serif text-4xl md:text-6xl mb-4 text-foreground/90">Memory Archive</h2>
        <p className="font-mono text-xs text-foreground/50 tracking-widest uppercase mt-4">
          46 Files Retrieved. Warning: High levels of chaos detected.
        </p>
      </motion.div>

      {/* Clean Pinterest-style Masonry Grid - 2 columns on mobile, 3 on desktop */}
      <div className="columns-2 lg:columns-3 gap-3 md:gap-6 w-full max-w-6xl mx-auto px-1 md:px-0">
        {MEDIA_ITEMS.map((media, index) => (
          <motion.div
            key={media.id}
            initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="break-inside-avoid relative group cursor-pointer w-full mb-3 md:mb-6"
          >
            <div className="w-full bg-foreground/5 rounded-md overflow-hidden relative shadow-sm transition-all duration-500 ease-out lg:group-hover:shadow-xl lg:group-hover:scale-[1.02]">
              
              {media.type === "video" ? (
                <video 
                  src={media.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover block"
                />
              ) : (
                <img 
                  src={media.src}
                  alt={`Memory ${media.id}`}
                  loading="lazy"
                  className="w-full h-auto object-cover block"
                  onError={(e) => {
                    if (media.src.toLowerCase().includes('.heic')) {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="p-8 text-center font-mono text-xs text-foreground/50 border border-dashed border-foreground/20 rounded">UNSUPPORTED FORMAT.</div>';
                    }
                  }}
                />
              )}
              
              {/* Inside-Image Caption - Always visible on mobile, hover on desktop */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-6 text-left pointer-events-none">
                <div className="translate-y-0 lg:translate-y-4 lg:group-hover:translate-y-0 transition-transform duration-300">
                  <div className="text-[9px] md:text-xs font-mono uppercase tracking-widest text-[#d4a373] mb-1 md:mb-1.5 drop-shadow-md">
                    {media.category}
                  </div>
                  <div className="font-serif text-xs sm:text-sm md:text-base text-white italic drop-shadow-md leading-snug">
                    "{media.caption}"
                  </div>
                  <div className="text-[8px] md:text-[10px] text-white/50 font-mono mt-1 md:mt-2">
                    FILE_{media.id.toString().padStart(3, '0')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
