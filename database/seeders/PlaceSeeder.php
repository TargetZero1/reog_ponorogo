<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Place;
use Illuminate\Support\Str;

class PlaceSeeder extends Seeder
{
    public function run(): void
    {
        $places = [
            [
                'name' => 'Grebeg Suro',
                'slug' => 'grebeg-suro',
                'category' => 'Festival Budaya',
                'description' => 'Festival budaya terbesar di Ponorogo yang menandai pergantian tahun Jawa. Acara ini menampilkan parade Reog, kirab budaya, dan berbagai pertunjukan seni tradisional.',
                'location' => 'Alun-alun Ponorogo',
                'hours' => 'Acara tahunan (biasanya Januari)',
                'rating' => 4.9,
                'image_path' => 'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjMxMDAxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'price' => 0,
                'highlights' => ['Festival terbesar', 'Parade Reog spektakuler', 'Kirab budaya', 'Pertunjukan seni tradisional'],
                'activities' => ['Menonton parade', 'Fotografi budaya', 'Belajar seni tradisional', 'Kuliner khas'],
                'facilities' => ['Area penonton luas', 'Toilet umum', 'Warung makan', 'Area parkir'],
                'best_time' => 'Malam hari selama acara berlangsung untuk suasana yang lebih meriah',
                'published' => true,
            ],
            [
                'name' => 'Telaga Ngebel',
                'slug' => 'telaga-ngebel',
                'category' => 'Wisata Alam',
                'description' => 'Danau alami yang dikelilingi pegunungan hijau dengan pemandangan memukau. Tempat sempurna untuk menikmati keindahan alam Ponorogo.',
                'location' => 'Kecamatan Ngebel, Ponorogo',
                'hours' => '24 Jam',
                'rating' => 4.8,
                'image_path' => 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzYzMTAwMTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'price' => 10000,
                'highlights' => ['Danau alami', 'Pemandangan pegunungan', 'Spot foto instagramable'],
                'activities' => ['Berperahu', 'Memancing', 'Bersepeda mengelilingi danau', 'Camping'],
                'facilities' => ['Area parkir luas', 'Toilet umum', 'Warung makan', 'Penginapan'],
                'best_time' => 'Pagi hari (05:00-09:00) untuk sunrise dan kabut pegunungan',
                'published' => true,
            ],
            [
                'name' => 'Masjid Tegalsari',
                'slug' => 'masjid-tegalsari',
                'category' => 'Wisata Religi & Sejarah',
                'description' => 'Masjid bersejarah dengan arsitektur khas Jawa yang menjadi situs penting dalam sejarah penyebaran Islam di Jawa Timur.',
                'location' => 'Desa Tegalsari, Jetis, Ponorogo',
                'hours' => '05:00 - 21:00 WIB',
                'rating' => 4.7,
                'image_path' => 'https://images.unsplash.com/photo-1668931104136-b7a75b438b01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwbW9zcXVlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc2MzEwMDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
                'price' => 0,
                'highlights' => ['Arsitektur klasik', 'Nilai sejarah tinggi', 'Tempat ziarah'],
                'activities' => ['Ziarah', 'Belajar sejarah Islam', 'Fotografi arsitektur', 'Meditasi spiritual'],
                'facilities' => ['Tempat wudhu', 'Perpustakaan', 'Ruang istirahat', 'Pemandu wisata'],
                'best_time' => 'Hari Jumat atau setelah sholat untuk suasana spiritual',
                'published' => true,
            ],
            [
                'name' => 'Taman Wisata Ngembag',
                'slug' => 'taman-wisata-ngembag',
                'category' => 'Wisata Keluarga',
                'description' => 'Taman rekreasi keluarga dengan berbagai wahana permainan, kolam renang, dan area piknik yang menyenangkan.',
                'location' => 'Kecamatan Sukorejo, Ponorogo',
                'hours' => '08:00 - 17:00 WIB',
                'rating' => 4.5,
                'image_path' => 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNzYzMTAwMTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
                'price' => 15000,
                'highlights' => ['Area bermain anak', 'Kolam renang', 'Spot piknik keluarga'],
                'activities' => ['Berenang', 'Bermain di playground', 'Piknik keluarga', 'Flying fox'],
                'facilities' => ['Kolam renang', 'Food court', 'Area parkir', 'Gazebo'],
                'best_time' => 'Weekend atau hari libur untuk aktivitas keluarga',
                'published' => true,
            ],
            [
                'name' => 'Alun-alun Ponorogo',
                'slug' => 'alun-alun-ponorogo',
                'category' => 'Wisata Budaya',
                'description' => 'Pusat kota dengan ruang terbuka hijau, tempat diadakannya berbagai acara budaya termasuk Festival Reog Ponorogo.',
                'location' => 'Jl. Alun-alun Utara, Ponorogo',
                'hours' => '24 Jam',
                'rating' => 4.6,
                'image_path' => 'https://images.unsplash.com/photo-1720260991096-09620ead91cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvbmVzaWFuJTIwY3VsdHVyYWwlMjBoZXJpdGFnZXxlbnwxfHx8fDE3NjMxMDAxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'price' => 0,
                'highlights' => ['Pusat acara budaya', 'Ruang publik terbuka', 'Kuliner malam hari'],
                'activities' => ['Jogging', 'Bersepeda', 'Kuliner', 'Menonton pertunjukan'],
                'facilities' => ['Wifi gratis', 'Pedestrian luas', 'Pedagang kaki lima', 'Toilet umum'],
                'best_time' => 'Malam hari (18:00-22:00) untuk suasana kuliner dan pertunjukan',
                'published' => true,
            ],
            [
                'name' => 'Air Terjun Pletuk',
                'slug' => 'air-terjun-pletuk',
                'category' => 'Wisata Alam',
                'description' => 'Air terjun tersembunyi di tengah hutan dengan suasana sejuk dan alami, cocok untuk petualangan dan tracking.',
                'location' => 'Desa Karangpatihan, Ponorogo',
                'hours' => '07:00 - 17:00 WIB',
                'rating' => 4.4,
                'image_path' => 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNjMxMDAxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'price' => 5000,
                'highlights' => ['Tracking adventure', 'Suasana hutan asri', 'Kolam alami'],
                'activities' => ['Trekking', 'Berenang di kolam alami', 'Fotografi alam', 'Bird watching'],
                'facilities' => ['Jalur tracking', 'Area istirahat', 'Warung sederhana', 'Pemandu lokal'],
                'best_time' => 'Pagi hari setelah musim hujan untuk debit air maksimal',
                'published' => true,
            ],
            [
                'name' => 'Gunung Bayangkaki',
                'slug' => 'gunung-bayangkaki',
                'category' => 'Wisata Petualangan',
                'description' => 'Destinasi pendakian dengan pemandangan sunrise yang spektakuler dan jalur hiking yang menantang.',
                'location' => 'Perbatasan Ponorogo-Madiun',
                'hours' => '24 Jam',
                'rating' => 4.7,
                'image_path' => 'https://images.unsplash.com/photo-1726744069854-a74d917b8f35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxha2UlMjBpbmRvbmVzaWF8ZW58MXx8fHwxNjMxMDAxNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
                'price' => 20000,
                'highlights' => ['Pendakian gunung', 'Sunrise point', 'Camping ground'],
                'activities' => ['Mendaki gunung', 'Camping', 'Star gazing', 'Sunrise hunting'],
                'facilities' => ['Pos pendakian', 'Camping ground', 'Sumber air', 'Shelter'],
                'best_time' => 'Dini hari (02:00) untuk mencapai puncak saat sunrise',
                'published' => true,
            ],
        ];

        foreach ($places as $place) {
            Place::updateOrCreate(
                ['slug' => $place['slug']],
                $place
            );
        }
    }
}

