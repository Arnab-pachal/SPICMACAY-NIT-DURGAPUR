import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PhotoGallery from "../components/PhotoGallery";
import VideoGallery from "../components/videoGallery";
import { getItemWithExpiry } from "../Utils/storage";
import { Camera, Video, LogIn, Sparkles, ArrowRight } from "lucide-react";

const MediaGallery = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const user = getItemWithExpiry("s-id");
    setIsLoggedIn(!!user);
    setMounted(true);
  }, []);

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        <div className="absolute top-20 left-10 w-60 h-60 md:w-72 md:h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-60 h-60 md:w-72 md:h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-60 h-60 md:w-72 md:h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none w-full">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 90 + 5}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            <div className="w-2 h-2 bg-white rounded-full opacity-20"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-full overflow-hidden">
        {/* Hero Section */}
        <div className={`text-center py-20 px-4 transition-all duration-1500 transform ${
          mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 mb-10 border border-white/20 animate-bounce-slow">
            <Sparkles className="w-5 h-5 text-cyan-400 animate-sparkle" />
            <span className="text-white/90 text-sm font-medium animate-pulse">Premium Media Gallery</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6 animate-title-flow">
            Media Gallery
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed animate-fade-up">
            Discover, share, and manage your visual stories in our stunning collection
          </p>

          {/* Animated Decorative Elements */}
          <div className="flex justify-center mt-12 space-x-4">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping animation-delay-300"></div>
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-600"></div>
          </div>
        </div>



        {/* Content Sections */}
        <div className="max-w-7xl mx-auto px-4 w-full overflow-hidden">
          {/* Photo Section */}
          <div className={`mb-24 transition-all duration-1500 delay-300 transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="flex items-center gap-4 mb-10 w-full overflow-hidden">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 md:px-8 py-3 md:py-4 border border-white/20 transform hover:scale-105 transition-all duration-500 hover:bg-white/15 flex-shrink-0">
                <Camera className="w-6 h-6 md:w-7 md:h-7 text-cyan-400 animate-bounce" />
                <h2 className="text-2xl md:text-3xl font-bold text-white animate-pulse">Photo Gallery</h2>
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-cyan-500/60 via-cyan-400/40 to-transparent animate-pulse min-w-0"></div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-600/30 to-purple-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
              <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 p-2 overflow-hidden transform hover:scale-[1.01] transition-all duration-700 hover:border-cyan-400/50">
                <PhotoGallery isLoggedIn={isLoggedIn} />
              </div>
            </div>
          </div>

          {/* Animated Divider */}
          <div className={`flex items-center justify-center mb-24 transition-all duration-1500 delay-600 transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="flex items-center gap-6 w-full max-w-5xl">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/60 to-purple-500/60 animate-pulse"></div>
              <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md rounded-full px-8 py-4 border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-110">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-ping animation-delay-300"></div>
                <div className="w-3 h-3 bg-pink-400 rounded-full animate-ping animation-delay-500"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-ping animation-delay-600"></div>
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-purple-500/60 to-pink-500/60 animate-pulse"></div>
            </div>
          </div>

          {/* Video Section */}
          <div className={`mb-20 transition-all duration-1500 delay-900 transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}>
            <div className="flex items-center gap-4 mb-10 w-full overflow-hidden">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 md:px-8 py-3 md:py-4 border border-white/20 transform hover:scale-105 transition-all duration-500 hover:bg-white/15 flex-shrink-0">
                <Video className="w-6 h-6 md:w-7 md:h-7 text-purple-400 animate-bounce animation-delay-300" />
                <h2 className="text-2xl md:text-3xl font-bold text-white animate-pulse animation-delay-300">Video Gallery</h2>
              </div>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-purple-500/60 via-pink-400/40 to-transparent animate-pulse min-w-0"></div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-1000 animate-pulse"></div>
              <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl border border-white/20 p-2 overflow-hidden transform hover:scale-[1.01] transition-all duration-700 hover:border-purple-400/50">
                <VideoGallery isLoggedIn={isLoggedIn} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Glow */}
        <div className="h-32 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(-5px) rotate(240deg); }
        }

        @keyframes title-flow {
          0%, 100% { 
            background-position: 0% 50%;
            transform: scale(1);
          }
          25% {
            background-position: 100% 50%;
            transform: scale(1.02);
          }
          50% { 
            background-position: 200% 50%;
            transform: scale(1);
          }
          75% {
            background-position: 300% 50%;
            transform: scale(1.02);
          }
        }

        @keyframes sparkle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(90deg) scale(1.2); }
          50% { transform: rotate(180deg) scale(1); }
          75% { transform: rotate(270deg) scale(1.2); }
        }

        @keyframes bounce-slow {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-title-flow {
          background-size: 400% 400%;
          animation: title-flow 8s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }

        .animate-fade-up {
          animation: fade-up 1.5s ease-out forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
        
        .animation-delay-500 {
          animation-delay: 500ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
      `}</style>
    </div>
  );
};

export default MediaGallery;