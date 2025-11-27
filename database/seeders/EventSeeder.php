<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        // Real Ponorogo Events with actual cultural significance
        $events = [
            [
                'title' => 'Grebeg Suro',
                'slug' => 'grebeg-suro',
                'description' => 'Festival budaya terbesar di Ponorogo yang merayakan pergantian tahun Jawa. Grebeg Suro menampilkan parade Reog masif dengan ribuan penari, kirab budaya tradisional, dan berbagai pertunjukan seni khas Ponorogo. Acara ini berlangsung selama berminggu-minggu dengan puncaknya di Alun-alun Ponorogo.',
                'date' => now()->addMonths(2),
                'location' => 'Alun-alun Ponorogo',
                'capacity' => 5000,
                'price' => 0,
                'published' => true,
            ],
            [
                'title' => 'Pertunjukan Reog Malam Hari',
                'slug' => 'pertunjukan-reog-malam',
                'description' => 'Pertunjukan Reog tradisional yang dilakukan pada malam hari di lokasi wisata utama. Menampilkan kostum Reog yang megah dengan cahaya dramatis, gerakan khas Ponorogo, dan musik tradisional yang memukau.',
                'date' => now()->addWeeks(2),
                'location' => 'Taman Wisata Ngembag',
                'capacity' => 1000,
                'price' => 15000,
                'published' => true,
            ],
            [
                'title' => 'Wayang Kulit Malam',
                'slug' => 'wayang-kulit-malam',
                'description' => 'Pertunjukan wayang kulit tradisional Ponorogo dengan dalang berpengalaman. Cerita-cerita dari legenda Jawa dengan iringan gamelan otentik yang mempesona penonton sepanjang malam.',
                'date' => now()->addWeeks(3),
                'location' => 'Masjid Tegalsari',
                'capacity' => 500,
                'price' => 10000,
                'published' => true,
            ],
            [
                'title' => 'Festival Seni dan Budaya Ponorogo',
                'slug' => 'festival-seni-budaya',
                'description' => 'Festival seni tahunan yang menampilkan berbagai pertunjukan seni lokal termasuk tari tradisional, musik, pagelaran busana budaya, dan pameran kerajinan tangan Ponorogo.',
                'date' => now()->addMonths(1),
                'location' => 'Alun-alun Ponorogo',
                'capacity' => 3000,
                'price' => 25000,
                'published' => true,
            ],
            [
                'title' => 'Pertunjukan Gambyong',
                'slug' => 'pertunjukan-gambyong',
                'description' => 'Tari Gambyong adalah tari rakyat yang ceria dan penuh makna budaya. Pertunjukan ini menampilkan gerakan yang elegan dan graceful dari penari berpengalaman yang menceritakan kehidupan masyarakat Jawa.',
                'date' => now()->addWeeks(4),
                'location' => 'Taman Wisata Ngembag',
                'capacity' => 800,
                'price' => 12000,
                'published' => true,
            ],
            [
                'title' => 'Kunjungan Budaya Pelajar',
                'slug' => 'kunjungan-budaya-pelajar',
                'description' => 'Program edukasi budaya untuk pelajar yang ingin mempelajari tradisi dan seni Ponorogo. Termasuk workshop tari Reog, pengenalan gamelan, dan dialog dengan seniman lokal.',
                'date' => now()->addWeeks(5),
                'location' => 'Alun-alun Ponorogo',
                'capacity' => 200,
                'price' => 5000,
                'published' => true,
            ],
            [
                'title' => 'Konser Musik Tradisional Gamelan',
                'slug' => 'konser-gamelan',
                'description' => 'Konser gamelan Ponorogo yang memainkan komposisi-komposisi tradisional. Musik yang indah dan menenangkan dengan iringan instrumen tradisional Jawa yang autentik.',
                'date' => now()->addWeeks(6),
                'location' => 'Gedung Budaya Ponorogo',
                'capacity' => 600,
                'price' => 20000,
                'published' => true,
            ],
            [
                'title' => 'Ziarah Budaya Masjid Tegalsari',
                'slug' => 'ziarah-masjid-tegalsari',
                'description' => 'Ziarah ke Masjid Tegalsari yang bersejarah dengan pemandu wisata yang menjelaskan latar belakang sejarah Islam di Ponorogo. Kesempatan untuk mempelajari arsitektur dan nilai spiritual tempat tersebut.',
                'date' => now()->addWeeks(2),
                'location' => 'Masjid Tegalsari',
                'capacity' => 300,
                'price' => 0,
                'published' => true,
            ],
            [
                'title' => 'Pertunjukan Topeng Ireng',
                'slug' => 'pertunjukan-topeng-ireng',
                'description' => 'Pertunjukan teater tradisional dengan topeng yang melukiskan karakter-karakter dari cerita Ponorogo. Seni pertunjukan yang menghibur dan bercerita tentang nilai-nilai budaya lokal.',
                'date' => now()->addWeeks(7),
                'location' => 'Taman Wisata Ngembag',
                'capacity' => 700,
                'price' => 15000,
                'published' => true,
            ],
        ];

        foreach ($events as $e) {
            Event::updateOrCreate(
                ['slug' => $e['slug']],
                [
                    'title' => $e['title'],
                    'description' => $e['description'],
                    'date' => $e['date'],
                    'location' => $e['location'],
                    'capacity' => $e['capacity'],
                    'price' => $e['price'],
                    'published' => $e['published'],
                ]
            );
        }
    }
}

