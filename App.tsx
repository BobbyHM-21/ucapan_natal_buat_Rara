import React, { useState, useEffect } from 'react';
import Snowfall from './components/Snowfall';
import Typewriter from './components/Typewriter';
import { Heart, Gamepad2, Sparkles, Music, ChevronRight, Star } from 'lucide-react';

// Define the stages of the experience
enum Stage {
  Opening = 0,
  HowWeMet = 1,
  LongDistance = 2,
  ChristmasWish = 3,
  Final = 4
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

const App: React.FC = () => {
  const [stage, setStage] = useState<Stage>(Stage.Opening);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  // Background music simulation (UI only for this demo)
  const toggleMusic = () => setIsPlaying(!isPlaying);

  // Helper to scroll to top on stage change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [stage]);

  // Handle Gift Open: Generate Particles
  const handleOpenGift = () => {
    if (isGiftOpen) return;
    
    setIsGiftOpen(true);
    
    // Generate explosion particles
    const colors = ['#FCD34D', '#F472B6', '#FFFFFF', '#60A5FA']; // Gold, Pink, White, Blue
    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 100; // Explode outwards
      newParticles.push({
        id: i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 6,
      });
    }
    setParticles(newParticles);
  };

  const nextStage = () => {
    if (stage < Stage.Final) {
      setStage(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-pink-50 via-pink-100 to-white relative font-sans text-pink-900 selection:bg-pink-200 overflow-hidden flex flex-col">
      
      {/* Atmosphere Layers */}
      <Snowfall />
      
      {/* Decorative Lights / Glows */}
      <div className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-white/40 to-transparent z-10 pointer-events-none"></div>
      <div className="fixed -top-20 -right-20 w-64 h-64 bg-rara-gold/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
      <div className="fixed bottom-0 -left-20 w-80 h-80 bg-rara-pink/40 rounded-full blur-3xl pointer-events-none"></div>

      {/* Music Control */}
      <button 
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 p-2.5 bg-white/50 backdrop-blur-md rounded-full shadow-lg border border-pink-100 hover:bg-white transition-all duration-300 group"
        aria-label="Toggle Music"
      >
        <Music className={`w-5 h-5 ${isPlaying ? 'text-rara-red animate-spin' : 'text-gray-400'}`} style={{ animationDuration: '3s' }} />
      </button>

      {/* Main Content Container */}
      <main className="relative z-20 container mx-auto px-4 py-8 flex-grow flex flex-col items-center justify-center min-h-[100dvh]">
        
        {/* STAGE 0: OPENING */}
        {stage === Stage.Opening && (
          <div className="text-center flex flex-col items-center animate-fade-in gap-6 md:gap-8 max-w-lg w-full">
            <div className="relative mt-4">
              <div className="absolute inset-0 bg-pink-300 blur-xl opacity-30 rounded-full"></div>
              {/* Responsive circle size */}
              <div className="w-32 h-32 md:w-48 md:h-48 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white shadow-lg relative z-10 animate-float">
                <Heart className="w-12 h-12 md:w-20 md:h-20 text-rara-dark-pink fill-pink-100" />
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 px-4">
              <h1 className="font-serif text-3xl md:text-5xl text-rara-red font-bold drop-shadow-sm leading-tight">
                Merry Christmas, <br/>
                <span className="italic text-rara-dark-pink">Rara</span> 🎄💗
              </h1>
              <p className="font-sans text-base md:text-lg text-gray-600 max-w-xs mx-auto">
                This page is made only for you.
              </p>
            </div>

            <button 
              onClick={nextStage}
              className="group relative px-6 py-3 md:px-8 md:py-4 bg-white/80 hover:bg-white text-rara-red font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 transform hover:-translate-y-1 mt-4"
            >
              <span className="flex items-center gap-2 text-sm md:text-base">
                Buka Ceritanya 🤍
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="absolute inset-0 rounded-full border-2 border-rara-pink opacity-50 group-hover:animate-ping"></span>
            </button>
          </div>
        )}

        {/* STAGE 1: HOW WE MET */}
        {stage === Stage.HowWeMet && (
          <div className="animate-fade-in w-full max-w-md px-2">
            <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(255,192,203,0.5)] border border-white/50 relative overflow-hidden">
              
              {/* Card Decoration */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-100 rounded-full blur-xl"></div>
              
              <div className="flex justify-center mb-6">
                 <div className="p-3 md:p-4 bg-blue-50 rounded-2xl shadow-inner transform rotate-3">
                    <Gamepad2 className="w-8 h-8 md:w-10 md:h-10 text-blue-400" />
                 </div>
              </div>

              <h2 className="font-serif text-xl md:text-2xl text-center text-rara-dark-pink mb-4 md:mb-6 font-bold">
                How We Met
              </h2>

              <div className="font-sans text-gray-700 leading-relaxed text-center min-h-[140px] md:min-h-[140px] flex items-center justify-center">
                <Typewriter 
                  text={` Kita bertemu di dunia roblox, tapi rasa nyaman yang kamu kasih...\nitu hal paling nyata yang pernah aku rasain.\n\nDari sekadar main bareng, jadi alasan aku senyum tiap hari.`}
                  speed={40}
                  className="text-base md:text-lg"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button 
                  onClick={nextStage}
                  className="px-6 py-3 bg-blue-400 hover:bg-blue-500 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm md:text-base font-semibold tracking-wide"
                >
                  Lanjut 🤍
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: LONG DISTANCE */}
        {stage === Stage.LongDistance && (
          <div className="animate-fade-in w-full max-w-md px-2">
            <div className="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-[0_10px_40px_-10px_rgba(255,192,203,0.6)] border border-white/50 relative">
              
              {/* Connected Hearts Animation */}
              <div className="h-20 md:h-24 w-full flex items-center justify-between px-4 md:px-6 mb-6 relative">
                 {/* Left Heart */}
                 <div className="flex flex-col items-center gap-1 md:gap-2 z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center shadow-sm">
                      <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-400 fill-pink-400" />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-400 font-semibold tracking-wider">ME</span>
                 </div>

                 {/* Connecting Line (SVG) */}
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-12 md:px-14">
                    <svg className="w-full h-10 md:h-12" viewBox="0 0 200 40" preserveAspectRatio="none">
                      <path 
                        d="M 0 20 Q 100 -10 200 20" 
                        fill="none" 
                        stroke="#FBCFE8" 
                        strokeWidth="3" 
                        strokeDasharray="8,4"
                        className="animate-pulse"
                      />
                      <circle r="4" fill="#F472B6">
                         <animateMotion 
                           dur="3s" 
                           repeatCount="indefinite"
                           path="M 0 20 Q 100 -10 200 20"
                           calcMode="linear"
                         />
                      </circle>
                    </svg>
                 </div>

                 {/* Right Heart */}
                 <div className="flex flex-col items-center gap-1 md:gap-2 z-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-100 rounded-full flex items-center justify-center shadow-sm">
                      <Heart className="w-5 h-5 md:w-6 md:h-6 text-pink-400 fill-pink-400" />
                    </div>
                    <span className="text-[10px] md:text-xs text-gray-400 font-semibold tracking-wider">YOU</span>
                 </div>
              </div>

              <h2 className="font-serif text-xl md:text-2xl text-center text-rara-dark-pink mb-4 font-bold">
                Long Distance, Same Heart
              </h2>

              <div className="font-sans text-gray-700 leading-relaxed text-center min-h-[160px] flex items-center justify-center">
                <Typewriter 
                  text={` Jarak mungkin bentangkan kilometer di antara kita,\ntapi dia gagal menjauhkan hatiku dari hatimu.\n\nKita hebat ya?\nBisa saling menjaga rasa, meski raga belum bisa berjumpa.`}
                  speed={35}
                  startDelay={500}
                  className="text-base md:text-lg"
                />
              </div>

              <div className="mt-8 flex justify-center">
                <button 
                  onClick={nextStage}
                  className="px-6 py-3 bg-rara-dark-pink hover:bg-pink-400 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 text-sm md:text-base font-semibold tracking-wide"
                >
                  Satu Layer Lagi 💗
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: CHRISTMAS WISH (CLIMAX) */}
        {stage === Stage.ChristmasWish && (
          <div className="animate-fade-in w-full max-w-lg flex flex-col items-center relative min-h-[400px] justify-center">
            
            {/* Gift Box Interaction */}
            {/* Scale down on mobile to prevent overflow */}
            <div className={`relative w-64 h-64 transition-transform duration-500 scale-90 md:scale-100 ${isGiftOpen ? 'z-0' : 'z-20 cursor-pointer hover:scale-105'}`} onClick={handleOpenGift}>
              
              {/* Aura/Glow */}
              <div className={`absolute inset-0 bg-gold-400 rounded-full blur-3xl transition-opacity duration-1000 ${isGiftOpen ? 'opacity-40' : 'opacity-20'}`}></div>

              {/* Gift Box Container */}
              <div className="relative w-full h-full flex items-center justify-center">
                 
                 {/* PARTICLES EXPLOSION */}
                 {isGiftOpen && particles.map((p) => (
                    <div
                      key={p.id}
                      className="absolute rounded-full animate-explosion z-50 pointer-events-none"
                      style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        left: '50%',
                        top: '50%',
                        '--tw-translate-x': `${p.x}px`,
                        '--tw-translate-y': `${p.y}px`,
                      } as React.CSSProperties}
                    />
                 ))}

                 {/* The Message Inside (Revealed on Open) */}
                 {/* Position absolute to center within the stage, not just the box wrapper */}
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-sm transition-all duration-1000 z-30 ${isGiftOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`} style={{ marginTop: isGiftOpen ? '-60px' : '0' }}>
                    <div className="text-center">
                       <Sparkles className="w-12 h-12 text-yellow-400 mx-auto animate-spin-slow mb-2" />
                       
                       {/* Shimmering Card */}
                       <div className="relative overflow-hidden bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl border-2 border-rara-gold/30 group">
                          
                          {/* Shimmer Overlay */}
                          <div className="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent z-0 pointer-events-none" style={{ animation: isGiftOpen ? 'shimmer 3s infinite linear' : 'none', backgroundSize: '200% 100%' }}></div>
                          
                          <div className="relative z-10">
                            <h3 className="font-serif text-xl font-bold bg-gradient-to-r from-rara-red to-pink-500 bg-clip-text text-transparent mb-3">My Wish</h3>
                            <Typewriter 
                               text={` Rara…\n Natal tahun ini aku cuma punya satu keinginan.\nBukan kado mewah, bukan pesta meriah.\n\nCukup kamu. Cukup kita.\nSemoga semesta berbaik hati menjaga kamu untuk aku, selamanya.`}
                               speed={40}
                               startDelay={800} // Wait for explosion
                               className="text-gray-700 italic text-base md:text-lg leading-relaxed"
                            />
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Gift Body */}
                 <div className={`absolute bottom-8 w-40 h-32 bg-pink-500 rounded-b-xl shadow-2xl z-10 transition-all duration-700 ${isGiftOpen ? 'translate-y-40 opacity-0' : ''}`}>
                    <div className="absolute inset-x-0 top-0 bottom-0 mx-auto w-8 bg-pink-300/50 border-x border-pink-400/30"></div>
                 </div>

                 {/* Gift Lid */}
                 <div className={`absolute bottom-40 w-44 h-12 bg-pink-600 rounded-lg shadow-lg z-20 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-bottom-left ${isGiftOpen ? '-rotate-[120deg] -translate-x-16 -translate-y-10 opacity-0' : 'animate-gift-bounce'}`}>
                    <div className="absolute inset-x-0 top-0 bottom-0 mx-auto w-8 bg-pink-300/50 border-x border-pink-400/30"></div>
                    {/* Bow */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex items-center justify-center">
                       <div className="w-12 h-8 border-4 border-pink-200 rounded-full transform -rotate-45 translate-x-2"></div>
                       <div className="w-12 h-8 border-4 border-pink-200 rounded-full transform rotate-45 -translate-x-2"></div>
                    </div>
                 </div>

                 {/* Hint Text */}
                 {!isGiftOpen && (
                    <div className="absolute -bottom-4 w-full text-center animate-pulse text-rara-dark-pink font-semibold bg-white/50 backdrop-blur-sm py-1 rounded-full text-sm">
                       (Ketuk Kotaknya 🎁)
                    </div>
                 )}
              </div>
            </div>

            {/* Final Button Container */}
            <div className={`mt-8 transition-all duration-1000 ${isGiftOpen ? 'opacity-100 translate-y-0 delay-3000' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
               <h2 className="font-serif text-2xl md:text-3xl text-center text-rara-red font-bold mb-6 drop-shadow-sm">
                 Merry Christmas, <br/> my favorite person 🎄💗
               </h2>

               <div className="flex justify-center">
                 <button 
                   onClick={nextStage}
                   className="px-6 py-3 md:px-8 md:py-3 bg-white hover:bg-pink-50 text-rara-dark-pink border-2 border-pink-200 font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-sm md:text-base"
                 >
                   Aku Senyum Bacanya 😊
                 </button>
               </div>
            </div>

          </div>
        )}

        {/* STAGE 4: FINAL */}
        {stage === Stage.Final && (
          <div className="animate-fade-in text-center max-w-md w-full space-y-6 md:space-y-8 px-4">
             <div className="relative inline-block">
                <div className="absolute inset-0 bg-yellow-200 blur-2xl opacity-50 rounded-full"></div>
                <Star className="w-16 h-16 md:w-20 md:h-20 text-yellow-400 fill-yellow-200 relative z-10 animate-spin-slow" style={{ animationDuration: '10s' }}/>
             </div>
             
             <div className="bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/60 shadow-lg">
                <p className="font-serif text-lg md:text-xl italic text-gray-700 leading-relaxed">
                  “Web ini cuma kumpulan kode, Rara. <br/>
                  Tapi setiap barisnya aku tulis sambil mikirin kamu.<br/>
                  Semoga sampai ya, rindu dan sayangnya aku.”
                </p>
                
                <div className="mt-6 flex justify-center gap-3 text-pink-400">
                   <Heart className="w-5 h-5 fill-current animate-bounce" style={{ animationDelay: '0s' }} />
                   <Heart className="w-5 h-5 fill-current animate-bounce" style={{ animationDelay: '0.2s' }} />
                   <Heart className="w-5 h-5 fill-current animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
                
                <div className="mt-8 pt-6 border-t border-pink-200/50">
                  <p className="text-xs md:text-sm font-sans text-gray-500 uppercase tracking-widest">
                    Since Roblox Brought Us Together
                  </p>
                </div>
             </div>
             
             <button 
               onClick={() => setStage(Stage.Opening)}
               className="text-sm text-rara-dark-pink hover:text-rara-red underline underline-offset-4 transition-colors opacity-60 hover:opacity-100 pb-8"
             >
               Replay Story
             </button>
          </div>
        )}

      </main>
      
      {/* Footer Decoration */}
      <div className="fixed bottom-2 w-full text-center z-10 pointer-events-none">
         <p className="text-[10px] text-pink-300/80 uppercase tracking-[0.3em]">Made with Love</p>
      </div>

    </div>
  );
};

export default App;
