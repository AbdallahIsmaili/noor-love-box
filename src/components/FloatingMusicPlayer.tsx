import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Heart,
  Music,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

interface Song {
  id: number;
  title: string;
  artist: string;
  image: string;
  src: string;
  duration: string;
}

// Sample songs - replace with actual song URLs
const favoriteSongs: Song[] = [
  {
    id: 1,
    title: "Doja cat x rihanna-streets x needed me (slowed+reverb)",
    artist: "ᴛᴏᴜᴋᴀɴᴇᴋɪ",
    image: "thumbnails/hq720.avif",
    src: "mp3/doja cat x rihanna - streets x needed me (slowed + reverb).mp3", // Replace with actual song URL
    duration: "4:50"
  },
  {
    id: 2,
    title: "Doja cat-Agora Hills (slowed&reverb)",
    artist: "sanitytracks",
    image: "thumbnails/hq720 (1).avif",
    src: "mp3/Doja Cat - Agora Hills _ (slowed & reverb).mp3", // Replace with actual song URL
    duration: "4:58"
  },
  {
    id: 3,
    title: "Justin Bieber-Confident (slowed&reverb)",
    artist: "abandoned sounds",
    image: "thumbnails/hqdefault.avif",
    src: "mp3/Confident - Justin Bieber (feat. Chance The Rapper) (slowed + lyrics).mp3", // Replace with actual song URL
    duration: "4:37"
  },
  {
    id: 4,
    title: "Yad (slowed&reverb)",
    artist: "Coveragee ♡︎",
    image: "thumbnails/hqdefault (1).avif",
    src: "mp3/Яд (𝗬𝗔𝗗) - Эрика Лундмоен (𝘀𝗹𝗼𝘄𝗲𝗱 + 𝗿𝗲𝘃𝗲𝗿𝗯).mp3", // Replace with actual song URL
    duration: "3:56"
  },
  {
    id: 5,
    title: "Good For You x One Of The Girls (slowed)",
    artist: "dreamsoda",
    image: "thumbnails/mqdefault.png",
    src: "mp3/Good For You x One Of The Girls (Slowed).mp3", // Replace with actual song URL
    duration: "3:00"
  },
  {
    id: 6,
    title: "Desert rose x renegade (slowed x Reverb TikTok Version) Lolo zouaï x Aaryan shah",
    artist: "RamexEvel",
    image: "thumbnails/hqdefault (2).avif",
    src: "mp3/desert rose x renegade ( Slowed x Reverb Tiktok Version ) Lolo zouaï x Aaryan shah.mp3", // Replace with actual song URL
    duration: "7:52"
  },
  {
    id: 7,
    title: "Rihanna breakin' dishes[slowed+reverb]",
    artist: "wctssh",
    image: "thumbnails/hqdefault (3).avif",
    src: "mp3/breakin dishes - rihanna ( slowed + reverb ).mp3", // Replace with actual song URL
    duration: "3:41"
  },
  {
    id: 8,
    title: "Gangsta-kehlani.... The edit u truly needed",
    artist: "rexdrnlin",
    image: "thumbnails/hqdefault (4).avif",
    src: "mp3/𝘎𝘢𝘯𝘨𝘴𝘵𝘢 - 𝘒𝘦𝘩𝘭𝘢𝘯𝘪.... The edit u truely needed.mp3", // Replace with actual song URL
    duration: "3:00"
  },
  {
    id: 9,
    title: "BEYONCÉ&GLORILLA-DIVA X TGIF (SLOWED-REVERB)",
    artist: "𝗠 𝗥 𝗦 𝗥 𝗜 𝗩 𝗘 𝗥 ",
    image: "thumbnails/hqdefault (5).avif",
    src: "mp3/𝘉𝘌𝘠𝘖𝘕𝘊É & 𝘎𝘓𝘖𝘙𝘐𝘓𝘓𝘈 - 𝘋𝘐𝘝𝘈 𝘟 𝘛𝘎𝘐𝘍 ( 𝘚𝘓𝘖𝘞𝘌𝘋 - 𝘙𝘌𝘝𝘌𝘙𝘉 ).mp3", // Replace with actual song URL
    duration: "4:05"
  },
  {
    id: 10,
    title: "FUTURE+THE WEEKND-LOW LIFE (slowed +reverb)",
    artist: "meeser",
    image: "thumbnails/hqdefault (3).avif",
    src: "mp3/future & the weeknd - low life (slowed & reverb).mp3", // Replace with actual song URL
    duration: "6:02"
  },
  {
    id: 11,
    title: "No Guidance (remix)(slowed+reverb)",
    artist: "SΣLΣNNΣ",
    image: "thumbnails/hqdefault (6).avif",
    src: "mp3/ayzha nyree- no guidance remix (s l o w e d + r e v e r b).mp3", // Replace with actual song URL
    duration: "5:30"
  },
   {
    id: 12,
    title: "The Weeknd - The Hills (Slowed and Reverb)",
    artist: "The Weeknd",
    image: "thumbnails/hqdefault (7).avif",
    src: "mp3/The Weeknd - The Hills (Slowed and Reverb).mp3", // Replace with actual song URL
    duration: "4:21"
  },
   {
    id: 13,
    title: "The Weeknd - Party Monster (Slowed+Reverb)",
    artist: "The Weeknd",
    image: "thumbnails/hqdefault (8).avif",
    src: "mp3/The Weeknd - Party Monster (Slowed+Reverb).mp3", // Replace with actual song URL
    duration: "4:37"
  },
  {
    id: 14,
    title: "in for it | slowed & reverb",
    artist: "tory lanez",
    image: "thumbnails/hqdefault (10).avif",
    src: "mp3/in for it  slowed & reverb.mp3", // Replace with actual song URL
    duration: "5:25"
  },
  {
    id: 15,
    title: "reed wonder, aurora olivas - the machine (sped up + reverb)",
    artist: "Reed wonder, Aurora olivas",
    image: "thumbnails/hqdefault (11).avif",
    src: "mp3/reed wonder, aurora olivas - the machine (sped up + reverb).mp3", // Replace with actual song URL
    duration: "2:55"
  },
  {
    id: 16,
    title: "K3NT4! - I can't do this (Slowed + Reverb)",
    artist: "K3NT4!",
    image: "thumbnails/download.jpg",
    src: "mp3/K3NT4! - I cant do this (Slowed + Reverb).mp3", // Replace with actual song URL
    duration: "3:25"
  }
];

interface FloatingMusicPlayerProps {
  autoPlay?: boolean;
}

export default function FloatingMusicPlayer({ autoPlay = true }: FloatingMusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentSong = favoriteSongs[currentSongIndex];

  const showLoveToast = useCallback(() => {
    const messages = [
      "For you, my love, I'd play this song a million times 💖",
      "This melody reminds me of your beautiful soul 🎶",
      "Every note sings of my love for you 🥰",
      "Dancing through life with you is my favorite song 💃",
      "Your love is the soundtrack to my life 🎧",
      "This one's for you, my heart's melody 💘",
      "Music sounds sweeter when I think of you 🎵",
      "Our love story deserves this soundtrack 📖",
      "Every beat matches my heart when I'm with you 💓",
      "This song carries my love to your ears 👂💕"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    console.log(randomMessage);
  }, []);

  const selectRandomSong = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * favoriteSongs.length);
    setCurrentSongIndex(randomIndex);
  }, []);

  const nextSong = useCallback((random = false) => {
    if (random) {
      selectRandomSong();
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % favoriteSongs.length);
    }
    setIsPlaying(true);
  }, [selectRandomSong]);

  useEffect(() => {
    if (autoPlay && audioRef.current) {
      selectRandomSong();
      const timer = setTimeout(() => {
        audioRef.current?.play().catch(console.log);
        setIsPlaying(true);
        showLoveToast();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, selectRandomSong, showLoveToast]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      showLoveToast();
      setTimeout(() => {
        nextSong();
      }, 1000);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, nextSong, showLoveToast]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isPlaying) {
      const playTimer = setTimeout(() => {
        audio.play().catch(console.log);
      }, 500);
      return () => clearTimeout(playTimer);
    }
  }, [currentSongIndex, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.log);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + favoriteSongs.length) % favoriteSongs.length);
    setIsPlaying(true);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressRef.current && audioRef.current && duration) {
      const rect = progressRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <>
      <audio
        ref={audioRef}
        src={currentSong.src}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div
        className="fixed bottom-6 right-6 z-50 transform transition-all duration-500 ease-out"
        style={{
          animation: 'fadeInUp 0.8s ease-out 2s both'
        }}
      >
        <div className="relative">
          {/* Floating Hearts around player */}
          <div
            className="absolute -top-8 -left-8 text-pink-400"
            style={{
              animation: 'rotate 8s linear infinite, pulse 3s ease-in-out infinite'
            }}
          >
            <Heart className="w-6 h-6" fill="currentColor" />
          </div>
          
          <div
            className="absolute -top-6 -right-6 text-rose-400"
            style={{
              animation: 'float 3s ease-in-out infinite 1s, scale 3s ease-in-out infinite 1s'
            }}
          >
            <Music className="w-5 h-5" />
          </div>

          {/* Main Player Container */}
          <div
            className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 overflow-hidden transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 245, 253, 0.95) 100%)'
            }}
          >
            {/* Compact View */}
            {!isExpanded ? (
              <div className="p-4 flex items-center gap-4 w-full max-w-[90vw] sm:max-w-[400px]">
                {/* Album Art */}
                <div
                  className="relative flex-shrink-0"
                  style={{
                    animation: isPlaying ? 'spin 20s linear infinite' : 'none'
                  }}
                >
                  <img
                    src={currentSong.image}
                    alt={currentSong.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-4 border-pink-300/50 shadow-lg"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400/20 to-purple-400/20"></div>
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0 pr-2">
                  <h3 
                    className="font-bold text-gray-800 text-sm sm:text-base leading-tight mb-1"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {currentSong.title}
                  </h3>
                  <p 
                    className="text-gray-600 text-xs sm:text-sm leading-tight"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {currentSong.artist}
                  </p>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    onClick={prevSong}
                    className="p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <SkipBack className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="p-2 sm:p-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                    ) : (
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() => nextSong()}
                    className="p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <SkipForward className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>

                  <button
                    onClick={() => setIsExpanded(true)}
                    className="p-1.5 sm:p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* Expanded View */
              <div className="p-4 sm:p-6 w-80 max-w-[90vw]">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Now Playing
                  </h2>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                {/* Album Art */}
                <div className="text-center mb-6">
                  <div
                    className="relative inline-block"
                    style={{
                      animation: isPlaying ? 'spin 20s linear infinite' : 'none'
                    }}
                  >
                    <img
                      src={currentSong.image}
                      alt={currentSong.title}
                      className="w-32 h-32 rounded-full object-cover border-8 border-pink-300/50 shadow-2xl mx-auto"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-400/20 to-purple-400/20"></div>
                  </div>
                </div>

                {/* Song Info */}
                <div className="text-center mb-6">
                  <h3 
                    className="font-bold text-gray-800 text-lg mb-1 leading-tight"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {currentSong.title}
                  </h3>
                  <p 
                    className="text-gray-600 leading-tight"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {currentSong.artist}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div
                    ref={progressRef}
                    onClick={handleProgressClick}
                    className="h-2 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden"
                  >
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-100"
                      style={{ width: `${progressPercentage}%` }}
                    />
                    <div
                      className="absolute top-1/2 w-4 h-4 bg-white rounded-full shadow-lg transform -translate-y-1/2 transition-all duration-100 hover:scale-125"
                      style={{ left: `calc(${progressPercentage}% - 8px)` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={prevSong}
                    className="p-3 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() => nextSong()}
                    className="p-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                    style={{
                      background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(isMuted ? 0 : volume) * 100}%, #e5e7eb ${(isMuted ? 0 : volume) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </>
  );
}