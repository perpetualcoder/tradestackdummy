import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { CuratedCollections } from '../components/CuratedCollections';
import { EliteContractors } from '../components/EliteContractors';
import { FeaturedTransformations } from '../components/FeaturedTransformations';
import { Footer } from '../components/Footer';
export function HomePage() {
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
    </div>);

}