import React, { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';

interface LayoutProps {
  children: ReactNode;
  fullScreenHero?: boolean;
}

export function Layout({ children, fullScreenHero = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <main id="main" className={fullScreenHero ? '' : 'pt-16'}>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
