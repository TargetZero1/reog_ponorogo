import { useState, useEffect } from 'react';
import { Navbar } from '../Components/Navbar';
import { Hero } from '../Components/Hero';
import { ReogSection } from '../Components/ReogSection';
import { TypesOfReog } from '../Components/TypesOfReog';
import { VideoSection } from '../Components/VideoSection';
import { GallerySection } from '../Components/GallerySection';
import { TestimonialsSection } from '../Components/TestimonialsSection';
import { Footer } from '../Components/Footer';
import { ScrollToTop } from '../Components/ScrollToTop';
import { ContainerBackground } from '../Components/ContainerBackground';
import { SEO } from '../Components/SEO';
import { useTranslations } from '../utils/translations';

export default function App() {
  const [activeSection, setActiveSection] = useState('beranda');
  const { locale } = useTranslations();

  const seoCopy = locale === 'en'
    ? {
        title: 'Reog Ponorogo - UNESCO Cultural Heritage',
        description: "Discover the splendor of Reog Ponorogo, Indonesia's UNESCO-recognized living heritage. Explore performances, stories, and destinations.",
        keywords: 'Reog Ponorogo, UNESCO, Cultural Heritage, Indonesia, Traditional Dance, Ponorogo'
      }
    : {
        title: 'Reog Ponorogo - Warisan Budaya UNESCO',
        description: 'Jelajahi kemegahan Reog Ponorogo sebagai Warisan Budaya Takbenda UNESCO. Temukan pertunjukan, sejarah, dan destinasi terbaik.',
        keywords: 'Reog Ponorogo, UNESCO, Warisan Budaya, Indonesia, Tarian Tradisional, Ponorogo'
      };

  useEffect(() => {
    const ids = ['beranda','reog','jenis-reog','video','budaya','galeri','wisata','testimoni'];
    const options = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0.25,
    } as IntersectionObserverInit;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <SEO 
        title={seoCopy.title}
        description={seoCopy.description}
        keywords={seoCopy.keywords}
      />
      <div className="min-h-screen bg-neutral-50">
        <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main id="main">
        <section id="beranda" className="scroll-mt-16 -mt-16 relative">
          <Hero />
        </section>
        <section id="reog" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white relative overflow-hidden scroll-mt-16">
          <ContainerBackground index={0} />
          <ReogSection />
        </section>
        <section id="jenis-reog" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-b from-neutral-50 to-white relative overflow-hidden scroll-mt-16">
          <ContainerBackground index={1} />
          <TypesOfReog />
        </section>
        <section id="video" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white text-gray-900 scroll-mt-16 relative overflow-hidden">
          <ContainerBackground index={2} />
          <VideoSection />
        </section>
        <section id="galeri" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-white scroll-mt-16">
          <ContainerBackground index={4} />
          <GallerySection />
        </section>
        <section id="testimoni" className="py-8 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-red-950 via-red-900 to-red-950 scroll-mt-16 relative overflow-hidden">
          <ContainerBackground index={6} />
          <TestimonialsSection />
        </section>
      </main>
      
        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}
