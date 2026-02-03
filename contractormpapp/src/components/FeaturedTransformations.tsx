import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { triggerMockAction } from '../utils/mockActions';
const transformations = [
{
  id: 1,
  title: 'Modern Minimalist Penthouse',
  location: 'Tribeca, New York',
  contractor: 'Urban Spaces Design',
  type: 'Full Renovation',
  image:
  'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400&auto=format&fit=crop'
},
{
  id: 2,
  title: 'Coastal Heritage Estate',
  location: 'Malibu, California',
  contractor: 'Pacific Coast Builders',
  type: 'Exterior & Landscape',
  image:
  'https://images.unsplash.com/photo-1600596542815-3ad19e6e67af?q=80&w=2400&auto=format&fit=crop'
},
{
  id: 3,
  title: 'Historic Brownstone Restoration',
  location: 'Boston, Massachusetts',
  contractor: 'Heritage Restorations',
  type: 'Historic Preservation',
  image:
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2400&auto=format&fit=crop'
}];

export function FeaturedTransformations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % transformations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };
  const prevSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + transformations.length) % transformations.length
    );
  };
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#3D3D3D] mb-4">
            Inspiring Transformations
          </h2>
          <p className="text-[#6B6B6B] text-lg">
            See what's possible when you find the right pro.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              prevSlide();
              triggerMockAction('Previous transformation');
            }}
            className="w-12 h-12 rounded-full border border-[#E8E4DF] bg-white flex items-center justify-center text-[#3D3D3D] hover:bg-[#D4856A] hover:text-white hover:border-[#D4856A] transition-all shadow-sm">

            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              nextSlide();
              triggerMockAction('Next transformation');
            }}
            className="w-12 h-12 rounded-full border border-[#E8E4DF] bg-white flex items-center justify-center text-[#3D3D3D] hover:bg-[#D4856A] hover:text-white hover:border-[#D4856A] transition-all shadow-sm">

            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className="relative h-[600px] w-full rounded-3xl overflow-hidden shadow-xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => triggerMockAction('Open transformation details')}>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{
              opacity: 0,
              scale: 1.05
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 0.8
            }}>

            <img
              src={transformations[currentIndex].image}
              alt={transformations[currentIndex].title}
              className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 p-8 md:p-16 w-full md:w-2/3">
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: 0.3,
                  duration: 0.5
                }}>

                <span className="inline-block px-3 py-1 bg-[#D4856A] text-white text-xs font-bold uppercase tracking-wider mb-4 rounded-full shadow-md">
                  {transformations[currentIndex].type}
                </span>
                <h3 className="text-3xl md:text-5xl font-serif text-white mb-4 leading-tight drop-shadow-md">
                  {transformations[currentIndex].title}
                </h3>
                <div className="flex flex-col md:flex-row gap-6 text-white/90 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#D4856A]" />
                    <span>{transformations[currentIndex].location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-[1px] bg-[#D4856A]" />
                    <span>
                      Executed by{' '}
                      <span className="text-white font-bold">
                        {transformations[currentIndex].contractor}
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Indicators */}
        <div className="absolute bottom-8 right-8 md:right-16 flex gap-2">
          {transformations.map((_, idx) =>
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${idx === currentIndex ? 'w-8 bg-[#D4856A]' : 'w-2 bg-white/40'}`} />

          )}
        </div>
      </div>
    </section>);

}
