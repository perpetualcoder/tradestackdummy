import React, { useEffect, useState } from 'react';
import { Search, Menu, User, Home } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#FDF8F3]/90 backdrop-blur-md border-b border-[#E8E4DF] py-4 shadow-sm' : 'bg-transparent border-transparent py-6'}`}
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }}>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="w-8 h-8 bg-[#D4856A] rounded-lg flex items-center justify-center group-hover:bg-[#c0765c] transition-colors">
            <Home className="w-5 h-5 text-white" />
          </div>
          <span
            className={`text-2xl font-serif font-bold tracking-wide transition-colors ${isScrolled ? 'text-[#3D3D3D]' : 'text-[#3D3D3D] md:text-white'}`}>

            Nest<span className="text-[#D4856A]">well</span>
          </span>
        </div>

        {/* Center Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {['Find Pros', 'Inspiration', 'How it Works', 'Stories'].map(
            (item) =>
            <a
              key={item}
              href="#"
              className={`text-sm font-medium tracking-wide transition-colors ${isScrolled ? 'text-[#6B6B6B] hover:text-[#D4856A]' : 'text-white/90 hover:text-white'}`}>

                {item}
              </a>

          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button
            className={`hidden md:block px-5 py-2 rounded-full border text-sm transition-colors ${isScrolled ? 'border-[#D4856A] text-[#D4856A] hover:bg-[#D4856A]/10' : 'border-white/40 text-white hover:bg-white/10'}`}>

            Join as a Pro
          </button>

          <div
            className={`flex items-center gap-2 p-1 pl-3 pr-1 rounded-full border shadow-sm hover:shadow-md transition-all cursor-pointer ${isScrolled ? 'bg-white border-[#E8E4DF]' : 'bg-white/10 border-white/20 backdrop-blur-sm'}`}>

            <Menu
              className={`w-4 h-4 ${isScrolled ? 'text-[#3D3D3D]' : 'text-white'}`} />

            <div className="w-8 h-8 bg-[#D4856A] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </motion.nav>);

}