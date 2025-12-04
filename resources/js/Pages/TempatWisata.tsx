import { MapPin, Clock, Camera, Star, X, Navigation, Phone, Sparkles, Ticket } from 'lucide-react';
import { ImageWithFallback } from '../Components/figma/ImageWithFallback';
import { useState } from 'react';
import { Layout } from '../Components/Layout';
import { ContainerBackground } from '../Components/ContainerBackground';
import { useTranslations } from '../utils/translations';

interface Place {
  id: number;
  name: string;
  category: string;
  description: string;
  location: string;
  hours: string;
  rating: number;
  image: string;
  highlights: string[];
  price: string;
  activities: string[];
  facilities: string[];
  bestTime: string;
}

export default function TempatWisata({ places }: { places?: any[] }) {
  const { locale } = useTranslations();
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null);

  const text = locale === 'en'
    ? {
        heroBadge: 'Travel Destinations',
        heroHeading: 'Destinations in Ponorogo',
        heroDescription: "Discover Ponorogo's natural wonders, cultural landmarks, and spiritual sites that deserve a spot on your itinerary.",
        gridTag: 'Destinations',
        gridHeading: 'Places to Visit in Ponorogo',
        gridDescription: 'Each destination offers a unique combination of culture, nature, and local warmth. Start planning your trip today.',
        moreHighlights: (count: number) => `+${count} more`,
        detailButton: 'View Details',
        description: 'About This Place',
        locationInfo: 'Location Information',
        address: 'Address',
        hours: 'Opening Hours',
        bestTime: 'Best Time',
        bestTimeFallback: 'Visit anytime to enjoy this destination.',
        activities: 'Activities',
        facilities: 'Facilities',
        highlightsTitle: 'Highlights',
        directions: 'Get Directions',
        bookTicket: 'Book Ticket',
        ctaTag: 'Strategic Location',
        ctaHeading: 'Easy Access from Major Cities',
        ctaDescription: 'Ponorogo sits in East Java and is easy to reach: only 2 hours from Madiun, 4 hours from Surabaya, and 5 hours from Yogyakarta.',
        ctaButton: 'View Full Map',
        ctaDistances: [
          { distance: '210 km', label: 'from Surabaya' },
          { distance: '40 km', label: 'from Madiun' },
          { distance: '190 km', label: 'from Yogyakarta' },
        ],
        modalClose: 'Close destination detail',
        mapButton: 'View complete map of Ponorogo',
        directionsAria: 'Open Google Maps directions',
        bookingAria: 'Open ticket checkout page',
        free: 'Free',
      }
    : {
        heroBadge: 'Destinasi Wisata',
        heroHeading: 'Tempat Wisata di Ponorogo',
        heroDescription: 'Jelajahi keindahan alam, sejarah, dan budaya Ponorogo melalui berbagai destinasi menarik yang wajib Anda kunjungi.',
        gridTag: 'Destinasi Wisata',
        gridHeading: 'Tempat Wisata di Ponorogo',
        gridDescription: 'Setiap destinasi menawarkan perpaduan budaya, alam, dan keramahan lokal. Rencanakan perjalanan Anda sekarang.',
        moreHighlights: (count: number) => `+${count} lainnya`,
        detailButton: 'Lihat Detail',
        description: 'Tentang Tempat Ini',
        locationInfo: 'Informasi Lokasi',
        address: 'Alamat',
        hours: 'Jam Operasional',
        bestTime: 'Waktu Terbaik',
        bestTimeFallback: 'Kunjungi kapan saja untuk pengalaman terbaik.',
        activities: 'Aktivitas',
        facilities: 'Fasilitas',
        highlightsTitle: 'Daya Tarik Utama',
        directions: 'Petunjuk Arah',
        bookTicket: 'Pesan Ticket',
        ctaTag: 'Lokasi Strategis',
        ctaHeading: 'Mudah Diakses dari Berbagai Kota',
        ctaDescription: 'Ponorogo terletak di Jawa Timur dengan akses mudah dari kota-kota besar: 2 jam dari Madiun, 4 jam dari Surabaya, dan 5 jam dari Yogyakarta.',
        ctaButton: 'Lihat Peta Lengkap',
        ctaDistances: [
          { distance: '210 km', label: 'dari Surabaya' },
          { distance: '40 km', label: 'dari Madiun' },
          { distance: '190 km', label: 'dari Yogyakarta' },
        ],
        modalClose: 'Tutup detail destinasi',
        mapButton: 'Lihat peta lengkap Ponorogo',
        directionsAria: 'Buka petunjuk arah di Google Maps',
        bookingAria: 'Buka halaman pemesanan tiket',
        free: 'Gratis',
      };

  const fallbackAttractions: Place[] = (locale === 'en'
    ? [
        {
          id: 1,
          name: 'Grebeg Suro Festival',
          category: 'Cultural Festival',
          description: "Ponorogo's biggest celebration to welcome the Javanese New Year with Reog parades, royal processions, and traditional performances.",
          location: 'Ponorogo Town Square',
          hours: 'Annual event (usually January)',
          rating: 4.9,
          image: 'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Largest festival', 'Spectacular Reog parade', 'Cultural procession', 'Traditional performances'],
          price: text.free,
          activities: ['Watch the parade', 'Cultural photography', 'Learn traditional arts', 'Taste local cuisine'],
          facilities: ['Large viewing area', 'Public restrooms', 'Food stalls', 'Parking space'],
          bestTime: 'Evening events for the most festive atmosphere',
        },
        {
          id: 2,
          name: 'Telaga Ngebel Lake',
          category: 'Nature Escape',
          description: 'A serene lake surrounded by green hills—perfect for sunrise views, boating, and fresh mountain air.',
          location: 'Ngebel District, Ponorogo',
          hours: '24 Hours',
          rating: 4.8,
          image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Natural lake', 'Mountain panorama', 'Instagrammable spots'],
          price: 'Rp 10.000',
          activities: ['Boating', 'Fishing', 'Cycling around the lake', 'Camping'],
          facilities: ['Large parking area', 'Public restrooms', 'Food stalls', 'Guest houses'],
          bestTime: 'Morning (05:00–09:00) for sunrise and misty hills',
        },
        {
          id: 3,
          name: 'Tegalsari Mosque',
          category: 'Religious Heritage',
          description: 'A historic mosque with classic Javanese architecture, central to the spread of Islam in East Java.',
          location: 'Tegalsari Village, Jetis, Ponorogo',
          hours: '05:00 – 21:00 WIB',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1668931104136-b7a75b438b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Classic architecture', 'Historic significance', 'Pilgrimage site'],
          price: text.free,
          activities: ['Pilgrimage', 'Learn Islamic history', 'Architectural photography', 'Spiritual reflection'],
          facilities: ['Ablution area', 'Library', 'Rest area', 'Local guides'],
          bestTime: 'Fridays or after prayer times for a serene ambiance',
        },
        {
          id: 4,
          name: 'Ngembag Family Park',
          category: 'Family Recreation',
          description: 'A family-friendly park with playgrounds, pools, and spacious picnic areas for joyful weekends.',
          location: 'Sukorejo District, Ponorogo',
          hours: '08:00 – 17:00 WIB',
          rating: 4.5,
          image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Kids playgrounds', 'Swimming pools', 'Picnic spots'],
          price: 'Rp 15.000',
          activities: ['Swimming', 'Playground fun', 'Family picnic', 'Flying fox'],
          facilities: ['Swimming pool', 'Food court', 'Parking area', 'Gazebos'],
          bestTime: 'Weekends or holidays for vibrant family activities',
        },
        {
          id: 5,
          name: 'Ponorogo Town Square',
          category: 'Cultural Hub',
          description: 'The heart of the city with open green space, cultural events, and the iconic Reog festival stage.',
          location: 'Jl. Alun-alun Utara, Ponorogo',
          hours: '24 Hours',
          rating: 4.6,
          image: 'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Cultural events', 'Public green space', 'Night culinary scene'],
          price: text.free,
          activities: ['Jogging', 'Cycling', 'Night culinary tour', 'Watch performances'],
          facilities: ['Free Wi-Fi', 'Wide pedestrian paths', 'Street vendors', 'Public restrooms'],
          bestTime: 'Evening (18:00–22:00) for food and performances',
        },
        {
          id: 6,
          name: 'Pletuk Waterfall',
          category: 'Nature Adventure',
          description: 'A hidden waterfall inside lush forest—ideal for trekking, photography, and a refreshing dip.',
          location: 'Karangpatihan Village, Ponorogo',
          hours: '07:00 – 17:00 WIB',
          rating: 4.4,
          image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Trekking adventure', 'Pristine forest', 'Natural pool'],
          price: 'Rp 5.000',
          activities: ['Hiking', 'Swim in natural pool', 'Nature photography', 'Bird watching'],
          facilities: ['Trekking trail', 'Rest area', 'Simple food stalls', 'Local guides'],
          bestTime: 'Morning after rainy season for the strongest water flow',
        },
        {
          id: 7,
          name: 'Mount Bayangkaki',
          category: 'Outdoor Adventure',
          description: 'A challenging hike with dramatic sunrise views and peaceful camping grounds.',
          location: 'Ponorogo–Madiun Border',
          hours: '24 Hours',
          rating: 4.7,
          image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Mountain trekking', 'Sunrise point', 'Camping ground'],
          price: 'Rp 20.000',
          activities: ['Hiking', 'Camping', 'Stargazing', 'Sunrise hunting'],
          facilities: ['Base camp', 'Camping ground', 'Water source', 'Shelters'],
          bestTime: 'Early morning (around 02:00) to reach the summit by sunrise',
        },
      ]
    : [
    {
      id: 1,
      name: 'Grebeg Suro',
      category: 'Festival Budaya',
          description: 'Festival budaya terbesar di Ponorogo yang menandai pergantian tahun Jawa. Menampilkan parade Reog, kirab budaya, dan pertunjukan seni tradisional.',
      location: 'Alun-alun Ponorogo',
      hours: 'Acara tahunan (biasanya Januari)',
      rating: 4.9,
          image: 'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Festival terbesar', 'Parade Reog spektakuler', 'Kirab budaya', 'Pertunjukan seni'],
          price: text.free,
      activities: ['Menonton parade', 'Fotografi budaya', 'Belajar seni tradisional', 'Kuliner khas'],
      facilities: ['Area penonton luas', 'Toilet umum', 'Warung makan', 'Area parkir'],
          bestTime: 'Malam hari selama acara berlangsung untuk suasana meriah',
    },
    {
      id: 2,
      name: 'Telaga Ngebel',
      category: 'Wisata Alam',
          description: 'Danau alami yang dikelilingi pegunungan hijau dengan udara sejuk dan panorama memukau.',
      location: 'Kecamatan Ngebel, Ponorogo',
      hours: '24 Jam',
      rating: 4.8,
          image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      highlights: ['Danau alami', 'Pemandangan pegunungan', 'Spot foto instagramable'],
      price: 'Rp 10.000',
          activities: ['Berperahu', 'Memancing', 'Bersepeda', 'Camping'],
      facilities: ['Area parkir luas', 'Toilet umum', 'Warung makan', 'Penginapan'],
          bestTime: 'Pagi hari (05:00-09:00) untuk sunrise dan kabut',
    },
    {
      id: 3,
      name: 'Masjid Tegalsari',
      category: 'Wisata Religi & Sejarah',
          description: 'Masjid bersejarah dengan arsitektur khas Jawa dan pusat penyebaran Islam di Jawa Timur.',
      location: 'Desa Tegalsari, Jetis, Ponorogo',
      hours: '05:00 - 21:00 WIB',
      rating: 4.7,
          image: 'https://images.unsplash.com/photo-1668931104136-b7a75b438b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      highlights: ['Arsitektur klasik', 'Nilai sejarah tinggi', 'Tempat ziarah'],
          price: text.free,
      activities: ['Ziarah', 'Belajar sejarah Islam', 'Fotografi arsitektur', 'Meditasi spiritual'],
      facilities: ['Tempat wudhu', 'Perpustakaan', 'Ruang istirahat', 'Pemandu wisata'],
          bestTime: 'Hari Jumat atau setelah sholat untuk suasana spiritual',
    },
    {
      id: 4,
      name: 'Taman Wisata Ngembag',
      category: 'Wisata Keluarga',
          description: 'Taman rekreasi keluarga dengan wahana permainan, kolam renang, dan area piknik.',
      location: 'Kecamatan Sukorejo, Ponorogo',
      hours: '08:00 - 17:00 WIB',
      rating: 4.5,
          image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      highlights: ['Area bermain anak', 'Kolam renang', 'Spot piknik keluarga'],
      price: 'Rp 15.000',
          activities: ['Berenang', 'Bermain', 'Piknik keluarga', 'Flying fox'],
      facilities: ['Kolam renang', 'Food court', 'Area parkir', 'Gazebo'],
          bestTime: 'Weekend atau hari libur untuk aktivitas keluarga',
    },
    {
      id: 5,
      name: 'Alun-alun Ponorogo',
      category: 'Wisata Budaya',
          description: 'Pusat kota dengan ruang terbuka hijau dan lokasi utama penyelenggaraan Festival Reog Ponorogo.',
      location: 'Jl. Alun-alun Utara, Ponorogo',
      hours: '24 Jam',
      rating: 4.6,
          image: 'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Pusat acara budaya', 'Ruang publik terbuka', 'Kuliner malam'],
          price: text.free,
      activities: ['Jogging', 'Bersepeda', 'Kuliner', 'Menonton pertunjukan'],
      facilities: ['Wifi gratis', 'Pedestrian luas', 'Pedagang kaki lima', 'Toilet umum'],
          bestTime: 'Malam hari (18:00-22:00) untuk suasana kuliner dan pertunjukan',
    },
    {
      id: 6,
      name: 'Air Terjun Pletuk',
      category: 'Wisata Alam',
          description: 'Air terjun tersembunyi di tengah hutan dengan suasana sejuk dan alami, cocok untuk petualangan.',
      location: 'Desa Karangpatihan, Ponorogo',
      hours: '07:00 - 17:00 WIB',
      rating: 4.4,
          image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
          highlights: ['Trekking adventure', 'Suasana hutan asri', 'Kolam alami'],
      price: 'Rp 5.000',
      activities: ['Trekking', 'Berenang di kolam alami', 'Fotografi alam', 'Bird watching'],
      facilities: ['Jalur tracking', 'Area istirahat', 'Warung sederhana', 'Pemandu lokal'],
          bestTime: 'Pagi hari setelah musim hujan untuk debit air maksimal',
    },
    {
      id: 7,
      name: 'Gunung Bayangkaki',
      category: 'Wisata Petualangan',
          description: 'Destinasi pendakian dengan pemandangan sunrise spektakuler dan jalur hiking menantang.',
      location: 'Perbatasan Ponorogo-Madiun',
      hours: '24 Jam',
      rating: 4.7,
          image: 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
      highlights: ['Pendakian gunung', 'Sunrise point', 'Camping ground'],
      price: 'Rp 20.000',
          activities: ['Mendaki', 'Camping', 'Star gazing', 'Sunrise hunting'],
      facilities: ['Pos pendakian', 'Camping ground', 'Sumber air', 'Shelter'],
          bestTime: 'Dini hari (sekitar 02:00) untuk mencapai puncak saat sunrise',
    },
      ]) as Place[];

  const englishPlaceOverrides: Record<string, Partial<Place>> = {
    'grebeg suro': fallbackAttractions.find(p => p.id === 1) || {},
    'telaga ngebel': fallbackAttractions.find(p => p.id === 2) || {},
    'masjid tegalsari': fallbackAttractions.find(p => p.id === 3) || {},
    'taman wisata ngembag': fallbackAttractions.find(p => p.id === 4) || {},
    'alun-alun ponorogo': fallbackAttractions.find(p => p.id === 5) || {},
    'air terjun pletuk': fallbackAttractions.find(p => p.id === 6) || {},
    'gunung bayangkaki': fallbackAttractions.find(p => p.id === 7) || {},
  };

  const attractions =
    places && places.length > 0
      ? places
          .filter((p: any) => p.published !== false)
          .map((p: any) => {
            // Helper to get localized field
            const getLocalized = (field: string) => {
              const enField = `${field}_en`;
              return locale === 'en' && p[enField] ? p[enField] : p[field];
            };

            return {
              name: getLocalized('name'),
              category: getLocalized('category') || (locale === 'en' ? 'Attraction' : 'Wisata'),
              description: getLocalized('description') || '',
              location: getLocalized('location') || '',
              hours: p.hours || (locale === 'en' ? '24 Hours' : '24 Jam'),
              rating: p.rating || 4.5,
              image: p.image_path || 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
              highlights: Array.isArray(p.highlights) ? p.highlights : p.highlights ? [p.highlights] : [],
              price: p.price ? `Rp ${Number(p.price).toLocaleString('id-ID')}` : text.free,
              activities: Array.isArray(p.activities) ? p.activities : p.activities ? [p.activities] : [],
              facilities: Array.isArray(p.facilities) ? p.facilities : p.facilities ? [p.facilities] : [],
              bestTime: p.best_time || text.bestTimeFallback,
              id: p.id,
            } as Place;
          })
      : fallbackAttractions;

  const selectedData = selectedAttraction !== null ? attractions[selectedAttraction] : null;

  const checkoutBaseUrl = (params: Record<string, string | number>) => {
    const query = new URLSearchParams({
      type: 'place',
      id: String(params.id),
      attraction: params.attraction as string,
    }).toString();
    return `${route('pesan.checkout', { locale })}?${query}`;
  };

  return (
    <Layout fullScreenHero={true}>
      {/* Header Section with Hero Background Image */}
      <div className="relative min-h-[120vh] flex items-center justify-center overflow-visible -mt-16">
        {/* Background Image with Parallax */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzYzMTAwMTU2fDA&ixlib=rb-4.1.0&q=80&w=1080)',
            backgroundAttachment: 'fixed'
          }}
        >
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/85"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/50 via-transparent to-amber-900/30"></div>

        {/* Animated Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-[10%] w-40 h-40 border-2 border-amber-500/20 rounded-full animate-[float_6s_ease-in-out_infinite]">
            <div className="absolute inset-4 border-2 border-amber-400/30 rounded-full"></div>
          </div>
          <div className="absolute top-1/3 right-[15%] w-32 h-32 border-2 border-red-500/20 rounded-full animate-[float_8s_ease-in-out_infinite]">
            <div className="absolute inset-3 border-2 border-red-400/30 rounded-full"></div>
          </div>
          <div className="absolute bottom-1/4 left-[20%] w-24 h-24 border-2 border-amber-400/25 rounded-full animate-[float_7s_ease-in-out_infinite]"></div>
          
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-radial from-amber-500/10 via-amber-600/5 to-transparent rounded-full blur-3xl animate-[float_10s_ease-in-out_infinite]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-[600px] h-[600px] bg-gradient-radial from-red-500/8 via-red-600/4 to-transparent rounded-full blur-3xl animate-[float_12s_ease-in-out_infinite]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-red-950 px-4 sm:px-8 py-2 sm:py-4 rounded-full mb-10 sm:mb-12 md:mb-16 shadow-lg sm:shadow-2xl animate-[slideDown_1s_ease-out] border-2 border-amber-400/50 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            <Sparkles size={18} className="sm:size-6 animate-[spin_4s_linear_infinite] relative z-10" />
            <span className="tracking-wide relative z-10 text-sm sm:text-base">{text.heroBadge}</span>
            <Sparkles size={18} className="sm:size-6 animate-[spin_4s_linear_infinite_reverse] relative z-10" />
          </div>

          <div className="mb-6 sm:mb-8 animate-[slideUp_1s_ease-out_0.2s_both]">
            <h1 className="text-white mb-2 sm:mb-4 tracking-tight leading-tight">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 mb-4 drop-shadow-2xl relative text-2xl sm:text-4xl md:text-5xl font-bold overflow-visible px-2">
                {text.heroHeading}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-gradient-to-br from-amber-500/25 via-amber-400/20 to-red-500/15 blur-3xl rounded-full -z-10"></div>
              </span>
            </h1>
          </div>

          <p className="text-amber-50/95 max-w-3xl mx-auto mb-8 leading-relaxed px-4 text-sm sm:text-base md:text-lg animate-[slideUp_1s_ease-out_0.4s_both] relative">
            <span className="relative inline-block">
              {text.heroDescription}
              <span className="absolute -inset-4 bg-gradient-to-r from-amber-500/5 via-red-500/5 to-amber-500/5 blur-2xl -z-10 rounded-full"></span>
            </span>
          </p>
        </div>
      </div>

      {/* Attractions Section */}
      <div className="py-12 md:py-24 bg-white text-gray-900 relative overflow-hidden">
        <ContainerBackground index={5} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-3 sm:px-4 py-2 rounded-full mb-3 sm:mb-4 shadow-lg font-semibold text-xs sm:text-sm">
              <Camera size={16} className="sm:size-5" />
              <span>{text.gridTag}</span>
            </div>
            <h2 className="text-red-950 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl font-bold">{text.gridHeading}</h2>
            <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base px-4">
              {text.gridDescription}
            </p>
            <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-amber-500 to-red-600 mx-auto mt-4 sm:mt-6 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16">
            {attractions.map((attraction, index) => (
              <div 
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative h-40 sm:h-56 overflow-hidden">
                  <ImageWithFallback
                    src={attraction.image}
                    alt={attraction.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-amber-500 text-red-950 px-2 sm:px-3 py-1 rounded-full shadow-lg text-xs sm:text-sm font-semibold">
                    {attraction.category}
                  </div>
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white/90 backdrop-blur-sm px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm">
                    <Star size={14} className="sm:size-4 fill-amber-500 text-amber-500" />
                    <span className="text-red-950 font-semibold">{attraction.rating}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-red-950 mb-2 text-base sm:text-lg font-bold group-hover:text-red-700 transition-colors">
                    {attraction.name}
                  </h3>
                  <p className="text-neutral-600 mb-3 sm:mb-4 leading-relaxed line-clamp-2 text-xs sm:text-sm">
                    {attraction.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-neutral-600">
                      <MapPin size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{attraction.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neutral-600">
                      <Clock size={18} className="text-red-600 flex-shrink-0" />
                      <span className="text-sm">{attraction.hours}</span>
                    </div>
                  </div>
                  <div className="border-t border-neutral-200 pt-4 mb-4">
                    <div className="flex flex-wrap gap-2">
                      {(attraction.highlights || []).slice(0, 2).map((highlight: any, hIndex: number) => (
                        <span 
                          key={hIndex}
                          className="bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs"
                        >
                          {highlight}
                        </span>
                      ))}
                      {(attraction.highlights?.length || 0) > 2 && (
                        <span className="bg-neutral-100 text-neutral-600 px-3 py-1 rounded-full text-xs">
                          {text.moreHighlights((attraction.highlights?.length || 0) - 2)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedAttraction(index)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                  >
                    {text.detailButton}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {selectedData && (
            <div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-out]"
              onClick={() => setSelectedAttraction(null)}
            >
              <div 
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[slideUp_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-80 overflow-hidden rounded-t-3xl">
                  <ImageWithFallback
                    src={selectedData.image}
                    alt={selectedData.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <button
                    onClick={() => setSelectedAttraction(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all shadow-lg"
                    aria-label={text.modalClose}
                  >
                    <X size={24} className="text-red-950" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="inline-block bg-amber-500 text-red-950 px-4 py-1 rounded-full mb-3">
                      {selectedData.category}
                    </div>
                    <h2 className="text-white mb-2 text-2xl font-bold">{selectedData.name}</h2>
                    <div className="flex items-center gap-4 text-white/90 flex-wrap">
                      <div className="flex items-center gap-1">
                        <Star size={20} className="fill-amber-500 text-amber-500" />
                        <span>{selectedData.rating}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Ticket size={20} />
                        <span>{selectedData.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <div className="mb-8">
                    <h3 className="text-red-950 mb-4 text-lg font-bold">{text.description}</h3>
                    <p className="text-neutral-700 leading-relaxed text-base sm:text-lg">
                      {selectedData.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h3 className="text-red-950 mb-4 flex items-center gap-2 text-lg font-bold">
                        <MapPin size={24} />
                        {text.locationInfo}
                      </h3>
                      <div className="space-y-3 bg-neutral-50 rounded-xl p-4">
                        <div>
                          <p className="text-sm text-neutral-500 mb-1">{text.address}</p>
                          <p className="text-neutral-700">{selectedData.location}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 mb-1">{text.hours}</p>
                          <p className="text-neutral-700">{selectedData.hours}</p>
                        </div>
                        <div>
                          <p className="text-sm text-neutral-500 mb-1">{text.bestTime}</p>
                          <p className="text-neutral-700">{selectedData.bestTime || text.bestTimeFallback}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-red-950 mb-4 text-lg font-bold">{text.activities}</h3>
                      <div className="space-y-2">
                        {(selectedData.activities || []).map((activity: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-neutral-700">
                            <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                            <span>{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-red-950 mb-4 text-lg font-bold">{text.facilities}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {(selectedData.facilities || []).map((facility: any, idx: number) => (
                        <div key={idx} className="bg-gradient-to-br from-red-50 to-amber-50 rounded-lg p-3 text-center border border-red-100">
                          <span className="text-neutral-700 text-sm">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-red-950 mb-4 text-lg font-bold">{text.highlightsTitle}</h3>
                    <div className="flex flex-wrap gap-2">
                      {(selectedData.highlights || []).map((highlight: any, idx: number) => (
                        <span 
                          key={idx}
                          className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 flex-col sm:flex-row">
                    <button
                      onClick={() => {
                        const place = `${selectedData.name} ${selectedData.location}`;
                        const query = encodeURIComponent(place);
                        const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
                        window.open(url, '_blank');
                      }}
                      className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 text-red-950 py-4 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold"
                      aria-label={text.directionsAria}
                    >
                      <Navigation size={20} />
                      {text.directions}
                    </button>

                    <button
                      onClick={() => {
                        window.location.href = checkoutBaseUrl({
                          id: selectedData.id,
                          attraction: selectedData.name,
                        });
                      }}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 font-semibold"
                      aria-label={text.bookingAria}
                    >
                      <Phone size={20} />
                      {text.bookTicket}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gradient-to-br from-red-950 to-red-800 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-amber-500 text-red-950 px-4 py-2 rounded-full mb-6">
                <MapPin size={20} />
                <span className="font-semibold">{text.ctaTag}</span>
              </div>
              
              <h3 className="text-white mb-4 text-2xl md:text-3xl font-bold">{text.ctaHeading}</h3>
              
              <p className="text-amber-50/90 mb-8 leading-relaxed">
                {text.ctaDescription}
              </p>

              <div className="grid sm:grid-cols-3 gap-6 mb-8">
                {text.ctaDistances.map((item, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className="text-amber-400 mb-2 text-2xl font-bold">{item.distance}</div>
                    <div className="text-white">{item.label}</div>
                </div>
                ))}
              </div>

              <button
                onClick={() => {
                  const place = 'Ponorogo, Indonesia';
                  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`;
                  window.open(url, '_blank');
                }}
                aria-label={text.mapButton}
                className="w-full sm:w-auto bg-amber-500 text-red-950 px-8 py-4 rounded-lg hover:bg-amber-400 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold"
              >
                {text.ctaButton}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
