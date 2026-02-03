import React from 'react';
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  ArrowRight,
  Home } from
'lucide-react';
export function Footer() {
  return (
    <footer className="bg-[#FDF8F3] border-t border-[#E8E4DF] pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-[#D4856A] rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-serif font-bold tracking-wide text-[#3D3D3D]">
                Nest<span className="text-[#D4856A]">well</span>
              </span>
            </div>
            <p className="text-[#6B6B6B] text-sm leading-relaxed mb-6">
              Connecting homeowners with trusted local contractors to create
              spaces they love.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) =>
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-[#E8E4DF] flex items-center justify-center text-[#6B6B6B] hover:bg-[#D4856A] hover:text-white hover:border-[#D4856A] transition-all shadow-sm">

                  <Icon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#3D3D3D] font-serif font-bold text-lg mb-6">
              For Homeowners
            </h4>
            <ul className="space-y-4">
              {[
              'Find Contractors',
              'Project Concierge',
              'Design Inspiration',
              'Financing',
              'Reviews'].
              map((item) =>
              <li key={item}>
                  <a
                  href="#"
                  className="text-[#6B6B6B] text-sm hover:text-[#D4856A] transition-colors">

                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-[#3D3D3D] font-serif font-bold text-lg mb-6">
              For Professionals
            </h4>
            <ul className="space-y-4">
              {[
              'Join the Network',
              'Success Stories',
              'Resources',
              'Partner Program',
              'Events'].
              map((item) =>
              <li key={item}>
                  <a
                  href="#"
                  className="text-[#6B6B6B] text-sm hover:text-[#D4856A] transition-colors">

                    {item}
                  </a>
                </li>
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#3D3D3D] font-serif font-bold text-lg mb-6">
              Stay Inspired
            </h4>
            <p className="text-[#6B6B6B] text-sm mb-4">
              Curated design trends and insights delivered to your inbox.
            </p>
            <div className="flex shadow-sm rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Email address"
                className="bg-white border border-[#E8E4DF] border-r-0 rounded-l-lg px-4 py-2 text-sm text-[#3D3D3D] outline-none focus:border-[#D4856A] w-full placeholder-[#9CA3AF]" />

              <button className="bg-[#D4856A] text-white px-4 rounded-r-lg hover:bg-[#c0765c] transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E8E4DF] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#9CA3AF] text-xs">
            © 2024 Nestwell Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Sitemap'].map((item) =>
            <a
              key={item}
              href="#"
              className="text-[#9CA3AF] text-xs hover:text-[#D4856A] transition-colors">

                {item}
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>);

}