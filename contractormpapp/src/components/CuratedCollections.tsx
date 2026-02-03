import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { triggerMockAction } from '../utils/mockActions';
const collections = [
{
  id: 1,
  title: 'Dream Kitchens',
  count: '128 Ideas',
  image:
  'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2600&auto=format&fit=crop',
  colSpan: 'md:col-span-1'
},
{
  id: 2,
  title: 'Relaxing Bathrooms',
  count: '84 Ideas',
  image:
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2600&auto=format&fit=crop',
  colSpan: 'md:col-span-1'
},
{
  id: 3,
  title: 'Outdoor Oasis',
  count: '215 Ideas',
  image:
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2600&auto=format&fit=crop',
  colSpan: 'md:col-span-1'
},
{
  id: 4,
  title: 'Whole Home Magic',
  count: '56 Ideas',
  image:
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2600&auto=format&fit=crop',
  colSpan: 'md:col-span-1'
}];

export function CuratedCollections() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h2 className="text-3xl md:text-5xl font-serif text-[#3D3D3D] mb-4">
            Explore by Category
          </h2>
          <div className="h-1 w-20 bg-[#D4856A] rounded-full"></div>
        </div>
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            triggerMockAction('View all categories');
          }}
          className="hidden md:flex items-center gap-2 text-[#D4856A] hover:text-[#c0765c] transition-colors mt-4 md:mt-0 font-medium">

          <span className="text-sm uppercase tracking-widest">
            View All Categories
          </span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((item, index) =>
        <motion.div
          key={item.id}
          className={`group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer ${item.colSpan} shadow-sm hover:shadow-xl transition-all duration-500`}
          onClick={() => triggerMockAction(`Open ${item.title}`)}
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            delay: index * 0.1,
            duration: 0.6
          }}
          whileHover={{
            y: -5
          }}>

            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-50 transition-opacity" />

            <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />


            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <div className="transform transition-transform duration-300 group-hover:-translate-y-2">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#D4856A] text-xs font-bold uppercase tracking-wider mb-3 inline-block shadow-sm">
                  {item.count}
                </span>
                <h3 className="text-3xl font-serif text-white drop-shadow-md">
                  {item.title}
                </h3>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="mt-8 md:hidden text-center">
        <a
          href="#"
          onClick={(event) => {
            event.preventDefault();
            triggerMockAction('View all categories');
          }}
          className="inline-flex items-center gap-2 text-[#D4856A] font-medium">

          <span className="text-sm uppercase tracking-widest">
            View All Categories
          </span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </section>);

}
