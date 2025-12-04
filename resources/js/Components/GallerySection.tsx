import { ImageWithFallback } from './figma/ImageWithFallback';
import { Camera, ZoomIn, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';

interface LikeData {
  [photoId: number]: {
    photo_id: number;
    count: number;
  };
}

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [likedImages, setLikedImages] = useState<Set<number>>(new Set());
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
  const { props } = usePage();
  const locale = props.locale || 'id';

  const gallery = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1698824554771-293b5dcc42db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBkYW5jZSUyMHBlcmZvcm1hbmNlfGVufDF8fHx8MTc2MzEwMDE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Dadak Merak Megah',
      category: 'Pertunjukan',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjMxMDAxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Warok Sakti',
      category: 'Karakter',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1760133453014-c8df5dcc0007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwdHJhZGl0aW9uYWwlMjBtYXNrfGVufDF8fHx8MTc2MzEwMDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Topeng Reog Tradisional',
      category: 'Kerajinan',
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzYzMTAwMTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Telaga Ngebel',
      category: 'Wisata',
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1668931104136-b7a75b438b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MzEwMDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Masjid Tegalsari',
      category: 'Sejarah',
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1634871572365-8bc444e6faea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwZm9vZCUyMHNhdGF5fGVufDF8fHx8MTc2MzA0MzUwOHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Kuliner Sate Ponorogo',
      category: 'Kuliner',
    },
  ];

  // Fetch initial like data
  useEffect(() => {
    const photoIds = gallery.map(item => item.id);
    axios.get(`/${locale}/gallery/likes`, {
      params: { photo_ids: photoIds }
    })
    .then(response => {
      const { likes, userLikes } = response.data;
      
      // Set like counts
      const counts: { [key: number]: number } = {};
      Object.keys(likes).forEach(photoId => {
        counts[parseInt(photoId)] = likes[photoId].count;
      });
      setLikeCounts(counts);
      
      // Set user's liked images
      setLikedImages(new Set(userLikes));
    })
    .catch(error => {
      console.error('Error fetching likes:', error);
      // Set default counts to 0
      const counts: { [key: number]: number } = {};
      photoIds.forEach(id => counts[id] = 0);
      setLikeCounts(counts);
    });
  }, [locale]);

  const toggleLike = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is authenticated
    const auth = props.auth as { user?: any };
    if (!auth?.user) {
      window.location.href = `/${locale}/login`;
      return;
    }

    // Optimistic update
    const wasLiked = likedImages.has(id);
    const newLikedImages = new Set(likedImages);
    if (wasLiked) {
      newLikedImages.delete(id);
    } else {
      newLikedImages.add(id);
    }
    setLikedImages(newLikedImages);
    setLikeCounts(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + (wasLiked ? -1 : 1)
    }));

    try {
      const response = await axios.post(`/${locale}/gallery/like`, {
        photo_id: id
      });
      
      // Update with actual data from server
      setLikeCounts(prev => ({
        ...prev,
        [id]: response.data.count
      }));
      
      if (response.data.liked) {
        setLikedImages(prev => new Set([...prev, id]));
      } else {
        setLikedImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }
    } catch (error: any) {
      console.error('Error toggling like:', error);
      
      // If 401, redirect to login
      if (error.response?.status === 401) {
        window.location.href = `/${locale}/login`;
        return;
      }
      
      // Revert optimistic update on error
      setLikedImages(likedImages);
      setLikeCounts(prev => ({
        ...prev,
        [id]: (prev[id] || 0) + (wasLiked ? 1 : -1)
      }));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4 shadow-lg font-semibold text-xs sm:text-sm">
          <Camera size={16} className="sm:size-5" />
          <span>Galeri Foto</span>
        </div>
        <h2 className="text-red-950 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">Momen Berharga Reog Ponorogo</h2>
        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-4">
          Koleksi foto-foto terbaik dari berbagai pertunjukan, lokasi wisata, dan momen bersejarah Reog Ponorogo
        </p>
        <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
      </div>

      {/* Masonry Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {gallery.map((item, index) => (
          <div
            key={item.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
            style={{ 
              gridRow: index === 0 || index === 3 ? 'span 2' : 'span 1'
            }}
            onClick={() => setSelectedImage(item.id)}
          >
            <ImageWithFallback
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block bg-amber-500 text-red-950 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm mb-2 sm:mb-3 font-semibold">
                  {item.category}
                </span>
                <h3 className="text-white mb-2 sm:mb-3 text-sm sm:text-base font-semibold">{item.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80 text-xs sm:text-sm">
                    <Heart 
                      size={20} 
                      className={`${likedImages.has(item.id) ? 'fill-red-500 text-red-500' : ''} transition-colors cursor-pointer`}
                      onClick={(e) => toggleLike(item.id, e)}
                    />
                    <span>{likeCounts[item.id] || 0}</span>
                  </div>
                  <button className="flex items-center gap-2 text-white/80 hover:text-white transition-colors">
                    <ZoomIn size={20} />
                    <span>Lihat</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Category badge - always visible */}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {item.category}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-amber-400 transition-colors text-4xl"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <ImageWithFallback
            src={gallery.find(item => item.id === selectedImage)?.image || ''}
            alt="Selected"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}
