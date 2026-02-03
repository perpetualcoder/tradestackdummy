import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle, Shield, ArrowRight } from 'lucide-react';
import { triggerMockAction } from '../utils/mockActions';
const contractors = [
{
  id: 1,
  name: 'Vanguard Interiors',
  specialty: 'Kitchen & Bath',
  rating: 4.9,
  reviews: 124,
  experience: '15 Years',
  image:
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop',
  badge: 'Top Rated'
},
{
  id: 2,
  name: 'Marble & Oak',
  specialty: 'Renovation Specialist',
  rating: 5.0,
  reviews: 89,
  experience: '12 Years',
  image:
  'https://images.unsplash.com/photo-1620626012053-1c167f7ebc8d?q=80&w=2000&auto=format&fit=crop',
  badge: 'Verified Pro'
},
{
  id: 3,
  name: 'Horizon Builds',
  specialty: 'Whole Home',
  rating: 4.8,
  reviews: 210,
  experience: '20 Years',
  image:
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop',
  badge: 'Master Builder'
}];

export function EliteContractors() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#D4856A]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#D4856A] text-xs font-bold uppercase tracking-[0.2em] mb-4 block">
            Verified Excellence
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[#3D3D3D] mb-6">
            Trusted Local Pros
          </h2>
          <p className="text-[#6B6B6B] max-w-2xl mx-auto text-lg">
            Hand-picked professionals who are committed to quality,
            transparency, and bringing your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contractors.map((contractor, index) =>
          <motion.div
            key={contractor.id}
            className="group bg-white rounded-3xl overflow-hidden border border-[#E8E4DF] shadow-sm hover:shadow-xl hover:border-[#D4856A]/30 transition-all duration-300"
            initial={{
              opacity: 0,
              y: 30
            }}
            whileInView={{
              opacity: 1,
              y: 0
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: index * 0.15,
              duration: 0.6
            }}
            whileHover={{
              y: -8
            }}>

              {/* Image Area */}
              <div className="h-64 overflow-hidden relative">
                <img
                src={contractor.image}
                alt={contractor.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#9CAF88]/30 flex items-center gap-1 shadow-sm">
                  <Shield className="w-3 h-3 text-[#9CAF88] fill-[#9CAF88]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#9CAF88] font-bold">
                    {contractor.badge}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-serif text-[#3D3D3D] font-bold mb-1">
                      {contractor.name}
                    </h3>
                    <p className="text-[#6B6B6B] text-sm">
                      {contractor.specialty}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#FDF8F3] px-2 py-1 rounded-lg border border-[#E8E4DF]">
                    <Star className="w-3 h-3 text-[#D4856A] fill-[#D4856A]" />
                    <span className="text-[#3D3D3D] text-sm font-bold">
                      {contractor.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 my-6 text-xs text-[#6B6B6B]">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-[#9CAF88]" />
                    <span>Verified License</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-[#E8E4DF]" />
                  <span>{contractor.experience} Exp.</span>
                </div>

                <button
                  onClick={() => triggerMockAction(`View work: ${contractor.name}`)}
                  className="w-full py-3 bg-[#FDF8F3] border border-[#E8E4DF] rounded-xl text-[#3D3D3D] font-medium text-sm hover:bg-[#D4856A] hover:text-white hover:border-[#D4856A] transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  View Work
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}
