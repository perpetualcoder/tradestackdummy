import React from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { triggerMockAction } from '../utils/mockActions';
export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?q=80&w=2668&auto=format&fit=crop"
          alt="Warm Cozy Kitchen Renovation"
          className="w-full h-full object-cover" />

        {/* Light Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl px-6 text-center mt-16">
        <motion.h1
          className="text-5xl md:text-7xl font-serif font-medium text-white mb-6 leading-tight drop-shadow-lg"
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 0.2
          }}>

          Welcome Home to <br />
          <span className="italic text-[#FDF8F3]">Possibilities</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-white/95 max-w-2xl mx-auto mb-12 font-medium tracking-wide drop-shadow-md"
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            delay: 0.4
          }}>

          Connect with trusted local contractors who care about your home as
          much as you do.
        </motion.p>

        {/* Search Bar */}
        <motion.div
          className="bg-white p-2 rounded-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-2 shadow-xl border border-[#E8E4DF]"
          initial={{
            opacity: 0,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            duration: 0.8,
            delay: 0.6
          }}>

          {/* Location Input */}
          <div className="flex-1 w-full md:w-auto relative group px-6 py-3 border-b md:border-b-0 md:border-r border-[#E8E4DF]">
            <label className="block text-xs font-bold text-[#3D3D3D] uppercase tracking-wider mb-1">
              Location
            </label>
            <input
              type="text"
              placeholder="Where is your project?"
              className="w-full bg-transparent border-none outline-none text-[#3D3D3D] placeholder-[#6B6B6B] text-sm font-medium" />

          </div>

          {/* Project Type */}
          <div className="flex-1 w-full md:w-auto relative group px-6 py-3 border-b md:border-b-0 md:border-r border-[#E8E4DF]">
            <label className="block text-xs font-bold text-[#3D3D3D] uppercase tracking-wider mb-1">
              Project Type
            </label>
            <div
              className="flex items-center justify-between cursor-pointer group-hover:text-[#D4856A] transition-colors"
              onClick={() => triggerMockAction('Pick project type')}>
              <span className="text-[#6B6B6B] text-sm font-medium">
                Kitchen, Bath, etc.
              </span>
              <ChevronDown className="w-4 h-4 text-[#D4856A]" />
            </div>
          </div>

          {/* Budget */}
          <div className="flex-1 w-full md:w-auto relative group px-6 py-3">
            <label className="block text-xs font-bold text-[#3D3D3D] uppercase tracking-wider mb-1">
              Budget
            </label>
            <div
              className="flex items-center justify-between cursor-pointer group-hover:text-[#D4856A] transition-colors"
              onClick={() => triggerMockAction('Set budget range')}>
              <span className="text-[#6B6B6B] text-sm font-medium">
                Estimated range
              </span>
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={() => triggerMockAction('Search for pros')}
            className="w-full md:w-auto bg-[#D4856A] hover:bg-[#c0765c] text-white p-4 rounded-full transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <Search className="w-5 h-5" />
            <span className="md:hidden ml-2 font-medium">Search Pros</span>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          delay: 1.5,
          duration: 1
        }}>

        <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-medium drop-shadow-md">
          Scroll to Explore
        </span>
        <motion.div className="w-[2px] h-12 bg-white/50 rounded-full overflow-hidden">
          <motion.div
            className="w-full h-1/2 bg-white rounded-full"
            animate={{
              y: [0, 24, 0]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }} />

        </motion.div>
      </motion.div>
    </section>);

}
