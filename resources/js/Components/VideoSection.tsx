import { Play, Volume2, Users, Award } from 'lucide-react';
import { useState } from 'react';

export function VideoSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  // YouTube video IDs for Reog Ponorogo - Official videos
  const videos = [
    {
      id: 'wPbJP5XxInU', // Reog Ponorogo - Kesenian Reog Guno Seco
      title: 'Reog Ponorogo - Kesenian Reog Guno Seco',
      description: 'Pertunjukan Tradisional Reog Ponorogo',
      thumbnail: 'https://img.youtube.com/vi/wPbJP5XxInU/hqdefault.jpg'
    },
    {
      id: 'GpnfLxonXuk', // Cara Menggambar Reog Ponorogo / Reog Performance
      title: 'Reog Ponorogo Performance',
      description: 'Pertunjukan Seni Tradisional',
      thumbnail: 'https://img.youtube.com/vi/GpnfLxonXuk/hqdefault.jpg'
    }
  ];

  const stats = [
    { icon: <Users size={24} className="sm:size-8" />, number: '500+', label: 'Seniman Aktif', color: 'from-amber-500 to-amber-600' },
    { icon: <Award size={24} className="sm:size-8" />, number: '70+', label: 'Tahun Festival', color: 'from-red-500 to-red-600' },
    { icon: <Volume2 size={24} className="sm:size-8" />, number: '1000+', label: 'Pertunjukan per Tahun', color: 'from-amber-600 to-red-600' },
  ];

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
  };

  const getYouTubeWatchUrl = (videoId: string) => {
    return `https://www.youtube.com/watch?v=${videoId}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4 shadow-lg text-xs sm:text-sm">
          <Play size={16} className="sm:size-5" />
          <span className="font-semibold">Video Pertunjukan</span>
        </div>
        <h2 className="text-gray-900 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">Saksikan Kehebatan Reog</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-4">
          Rasakan energi dan kemegahan pertunjukan Reog Ponorogo melalui dokumentasi visual kami yang menakjubkan
        </p>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
      </div>

      {/* Video Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12 sm:mb-16">
        {videos.map((video, index) => {
          // Check if video ID is placeholder
          const isValidVideo = video.id && !video.id.includes('YOUR_YOUTUBE_VIDEO_ID');
          
          return (
            <div key={video.id || index} className="relative rounded-3xl overflow-hidden shadow-2xl group">
              {playingVideo === video.id && isValidVideo ? (
                <div className="aspect-video">
                  <iframe
                    src={getYouTubeEmbedUrl(video.id)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                    onError={() => setPlayingVideo(null)}
                  />
                </div>
              ) : (
                <div 
                  className="aspect-video flex items-center justify-center relative cursor-pointer overflow-hidden rounded-3xl"
                  onClick={() => {
                    if (isValidVideo) {
                      setPlayingVideo(video.id);
                    } else {
                      // If placeholder, just open YouTube search
                      window.open('https://www.youtube.com/results?search_query=Reog+Ponorogo', '_blank');
                    }
                  }}
                >
                  {/* YouTube Thumbnail Background */}
                  {isValidVideo ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to gradient if thumbnail fails to load
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div 
                      className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-neutral-900"
                      style={{
                        backgroundImage: 'linear-gradient(135deg, #6b0000 0%, #8b0b0b 100%)'
                      }}
                    />
                  )}
                  
                  {/* Subtle Overlay - Lighter for better thumbnail visibility */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                  
                  {/* Play Button */}
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                    <button className="w-20 sm:w-28 h-20 sm:h-28 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-amber-500/70 border-4 border-white/20">
                      <Play size={32} className="sm:size-12 text-red-950 ml-1 sm:ml-2" />
                    </button>
                  </div>
                  
                  {/* Video overlay info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 sm:p-6">
                    <div className="flex items-center justify-between text-white">
                      <div className="flex-1">
                        <h3 className="text-sm sm:text-base font-semibold mb-1">{video.title}</h3>
                        <p className="text-xs sm:text-sm text-neutral-200">{video.description}</p>
                        {!isValidVideo && (
                          <p className="text-xs text-amber-400 mt-1">Klik untuk mencari video di YouTube</p>
                        )}
                      </div>
                      {isValidVideo && (
                        <a
                          href={getYouTubeWatchUrl(video.id)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="ml-4 text-xs sm:text-sm text-amber-400 hover:text-amber-300 underline font-medium whitespace-nowrap"
                        >
                          Tonton di YouTube
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Statistics - Enhanced Design */}
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
            className="relative group"
          >
            <div className={`relative bg-gradient-to-br ${stat.color} p-8 sm:p-10 rounded-3xl shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 transform ${hoveredStat === index ? 'scale-110 -translate-y-2' : 'scale-100'} overflow-hidden`}>
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.3)_1px,_transparent_0)] bg-[length:30px_30px] animate-[float_8s_ease-in-out_infinite]"></div>
              </div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white shadow-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3 transition-all duration-300 group-hover:scale-110">
                  {stat.number}
                </div>
                <p className="text-white/95 text-base sm:text-lg font-semibold tracking-wide">{stat.label}</p>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            {/* Enhanced Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10 transform scale-110`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
