import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const hadleSearchSubmit = (e) => {
        e.preventDefault();
        if(!searchQuery.trim()) return;

        navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery('');
    }

    return (
        <header className="sticky top-0 z-50 bg-white text-zinc-900 border-b border-zinc-200">
            
            {/* Upper*/}
            <div className="bg-black text-white text-[10px] font-bold tracking-[0.25em] text-center py-2.5 uppercase border-b border-zinc-900">
                Complimentary Express Shipping & Gift Wrapping
            </div>

            {/* Middle*/}
            <div className="max-w-[92rem] mx-auto px-6 h-24 flex items-center justify-between">
                
                {/*Search bar */}
                <form onSubmit={hadleSearchSubmit} className="flex items-center space-x-3 bg-zinc-100 border border-zinc-200 px-4 py-2.5 rounded-full w-64 md:w-72 focus-within:border-zinc-400 transition-colors">
                    <button type="submit" className="focus:outline-none">
                        <i className="fa fa-search text-zinc-400 text-xs hover:text-zinc-600 transition-colors cursor-pointer"></i>
                    </button>
                    <input 
                        type="text" 
                        placeholder="Search jewelry, churi, bangles..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none w-full tracking-wider font-medium"
                    />
                </form>

                {/* Centre*/}
                <div className="flex items-center justify-center">
                    <Link to="/" className="flex items-center space-x-3.5 group">
                        <span className="text-xl md:text-2xl tracking-[0.25em] uppercase font-black text-black group-hover:opacity-75 transition-opacity hidden md:block">
                            Sereine De Femme
                        </span>
                        <img 
                            src="/logo1.png" 
                            alt="Logo" 
                            className="w-11 h-11 object-contain filter contrast-125 drop-shadow-sm" 
                        />
                    </Link>
                </div>

                {/* Right*/}
                <div>
                   <ul className="flex items-center space-x-6 text-sm text-zinc-800">
                        <li>
                            <Link to="/wishlist" className="hover:text-black text-base transition-colors">
                                <i className="fa fa-heart-o" aria-hidden="true"></i>
                            </Link>
                        </li>
                        
                        <li>
                            <Link to="/cart" className="hover:text-black text-base relative transition-colors">
                                <i className="fa fa-shopping-bag"></i>
                            </Link>
                        </li>

                        {/* Profile Icon*/}
                        {!isLoggedIn ? (
                            <li>
                                <Link to="/login" className="hover:text-black uppercase text-[11px] tracking-[0.2em] font-semibold pb-0.5 transition-colors">
                                    Sign in
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/profile" className="hover:text-black text-[18px] uppercase tracking-[0.2em] font-semibold">
                                    <i className="fa fa-user-o" aria-hidden="true"></i>
                                </Link>
                            </li>
                        )}
                   </ul>
                </div>
            </div>

            {/* Lower */}
            <div className="border-t border-zinc-200 py-3.5 bg-white">
                <ul className="max-w-[92rem] mx-auto px-6 flex justify-center space-x-12 text-[11px] uppercase tracking-[0.3em] font-bold text-zinc-900">
                    <li><Link to="/shop" className="hover:opacity-60 transition-opacity">Shop</Link></li>
                    <li><Link to="/collection" className="hover:opacity-60 transition-opacity">Collection</Link></li>
                    <li><Link to="/newArrivals" className="hover:opacity-60 transition-opacity">New Arrivals</Link></li>
                    <li><Link to="/gift" className="hover:opacity-60 transition-opacity">Gifts</Link></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;