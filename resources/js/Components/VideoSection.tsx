import { Play, Volume2, Users, Award } from 'lucide-react';
import { useState } from 'react';

export function VideoSection() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);

  const stats = [
    { icon: <Users size={24} className="sm:size-8" />, number: '500+', label: 'Seniman Aktif', color: 'from-amber-500 to-amber-600' },
    { icon: <Award size={24} className="sm:size-8" />, number: '70+', label: 'Tahun Festival', color: 'from-red-500 to-red-600' },
    { icon: <Volume2 size={24} className="sm:size-8" />, number: '1000+', label: 'Pertunjukan per Tahun', color: 'from-amber-600 to-red-600' },
  ];

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

      {/* Video Player Mockup */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-12 sm:mb-16 group">
        <div className="aspect-video bg-gradient-to-br from-neutral-800 to-neutral-900 flex items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBkYW5jZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2MzEwMDE1NXww&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center opacity-40"></div>
          <div className="relative z-10">
            <button className="w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform duration-300 group-hover:shadow-amber-500/50">
              <Play size={28} className="sm:size-10 text-red-950 ml-1 sm:ml-2" />
            </button>
          </div>
          
          {/* Video overlay controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between text-white">
              <div>
                <h3 className="text-sm sm:text-base font-semibold mb-1">Festival Reog Ponorogo 2024</h3>
                <p className="text-xs sm:text-sm text-neutral-300">Pertunjukan Pembukaan</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 sm:w-10 h-8 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors flex items-center justify-center">
                  <Volume2 size={16} className="sm:size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredStat(index)}
            onMouseLeave={() => setHoveredStat(null)}
            className="relative group"
          >
            <div className={`bg-gradient-to-br ${stat.color} p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform ${hoveredStat === index ? 'scale-105' : ''}`}>
              <div className="text-white/90 mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-2 transition-all duration-300">{stat.number}</div>
              <p className="text-white/90 text-sm sm:text-base">{stat.label}</p>
            </div>
            
            {/* Glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity -z-10`}></div>
          </div>
        ))}
      </div>
    </div>
  );
}
