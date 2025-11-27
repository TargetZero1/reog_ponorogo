import { ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-2xl flex items-center justify-center text-red-950 hover:from-amber-400 hover:to-amber-500 transition-all hover:scale-110 z-40 animate-[fadeIn_0.3s_ease-out]"
          aria-label="Scroll to top"
        >
          <ChevronUp size={28} />
        </button>
      )}
    </>
  );
}
