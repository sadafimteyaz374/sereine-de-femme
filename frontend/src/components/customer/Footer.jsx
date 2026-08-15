import React from 'react';
import { Link } from 'react-router-dom';
import ContactUs from './landingPage/ContactUs';

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-300 pt-20 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        

        <div className="space-y-6 md:col-span-1">
          <div className="flex items-center space-x-3">
            <img src='/logo.png' alt='Logo' className='w-20 h-20 object-contain' />
            <h2 className="font-brand-serif text-2xl tracking-wider text-white">Sereine De Femme</h2>
          </div>
          
          <p className="text-sm text-zinc-400 leading-relaxed">
            Timeless elegance crafted for the modern woman. Discover fine jewelry designed to celebrate your unique moments.
          </p>

          <div className="flex space-x-5 text-zinc-400 text-lg">
            <a href="#" className="hover:text-white transition-colors"><i className="fa fa-facebook" aria-hidden="true"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fa fa-instagram" aria-hidden="true"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fa fa-youtube-play" aria-hidden="true"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="#" className="hover:text-white transition-colors"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
          </div>
        </div>


        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
          
          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-white font-semibold">Company</h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/AboutUs" className="text-zinc-400 hover:text-white transition-colors">About us</Link></li>
              <li><Link to="/Responsibility" className="text-zinc-400 hover:text-white transition-colors">Responsibility</Link></li>
              <li><Link to="/team" className="text-zinc-400 hover:text-white transition-colors">Team</Link></li>
              <li><Link to="/collaboration" className="text-zinc-400 hover:text-white transition-colors">Collaborations</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-white font-semibold">Customer & Support</h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/contactUs" className="text-zinc-400 hover:text-white transition-colors">Contact us</Link></li>
              <li><Link to="/repair" className="text-zinc-400 hover:text-white transition-colors">Need a repair</Link></li>
              <li><Link to="/accessibility" className="text-zinc-400 hover:text-white transition-colors">Accessibility</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs uppercase tracking-widest text-white font-semibold">Order & Return Policy</h2>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/shipping" className="text-zinc-400 hover:text-zinc-100 transition-colors">Shipping</Link></li>
              <li><Link to="/return" className="text-zinc-400 hover:text-zinc-100 transition-colors">Return</Link></li>
              <li><Link to="/trackOrder" className="text-zinc-400 hover:text-zinc-100 transition-colors">Track your order</Link></li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom copyright */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-900 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Sereine De Femme. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;