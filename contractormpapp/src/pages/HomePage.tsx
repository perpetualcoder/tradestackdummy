import React, { useEffect, useRef, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CuratedCollections } from '../components/CuratedCollections';
import { EliteContractors } from '../components/EliteContractors';
import { FeaturedTransformations } from '../components/FeaturedTransformations';
import { Footer } from '../components/Footer';
import { ACTION_EVENT } from '../utils/mockActions';
export function HomePage() {
  const [toast, setToast] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<{ label: string }>;
      setToast(customEvent.detail?.label ?? 'Action');

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        setToast(null);
        timeoutRef.current = null;
      }, 2200);
    };

    window.addEventListener(ACTION_EVENT, handler);
    return () => {
      window.removeEventListener(ACTION_EVENT, handler);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FDF8F3] text-[#3D3D3D] selection:bg-[#D4856A] selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <CuratedCollections />
        <EliteContractors />
        <FeaturedTransformations />
      </main>
      <Footer />
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#3D3D3D] text-white px-4 py-3 rounded-xl shadow-lg text-sm">
          {toast} (demo)
        </div>
      )}
    </div>);

}
