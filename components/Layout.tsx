"use client";
import React, { ReactNode, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Loader from '../components/Loader';
import { usePathname } from 'next/navigation';
import type { ChatGroup } from '@/types';
interface LayoutProps {
  children: ReactNode;
  setSelectedChat?: (chat: ChatGroup | null) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, setSelectedChat }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isMainPage = pathname === "/MainPage";

  const handleNavigation = (path: string) => {
    setIsLoading(true);
    router.push(path);
  };

  // This effect will run when page changes are complete
  React.useEffect(() => {
    const handleRouteComplete = () => {
      setIsLoading(false);
    };

    // We need to set up proper route change listeners based on your Next.js version
    // This is a simplified implementation
    window.addEventListener('load', handleRouteComplete);

    return () => {
      window.removeEventListener('load', handleRouteComplete);
    };
  }, []);

  // Custom Link component with loading behavior
  const NavLink = ({ href, children, className }: { href: string; children: ReactNode; className?: string }) => (
    <span
      onClick={() => handleNavigation(href)}
      className={`cursor-pointer ${className || ''}`}
    >
      {children}
    </span>
  );

  return (
    <div className="min-h-screen flex flex-col !bg-gray-900 text-gray-100 text-base">
      {/* Full-screen loader with fixed positioning */}
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-70">
          <Loader />
        </div>
      )}
      
      <nav className="bg-gray bg-opacity-80 backdrop-filter backdrop-blur-md border-b border-indigo-900/30 shadow-lg shadow-indigo-500/20 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="hidden md:flex space-x-4">
                <NavLink href="/" className="hover:text-gray-300 transition">Home</NavLink>
                <NavLink href="/Discover" className="hover:text-gray-300 transition">Discover</NavLink>
                <NavLink href="/Trending" className="hover:text-gray-300 transition">Trending</NavLink>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
  {/* Replace this with conditional rendering based on current route */}
  {pathname === "/MainPage" ? (
    <div 
      className="flex items-center cursor-pointer" 
      onClick={() => setSelectedChat?.(null)}
    >
      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        CineGenie
      </span>
      <Image
        src="/cinegenie logo.png"
        alt="CineGenie Logo"
        width={40}
        height={40}
        priority
      />
    </div>
  ) : (
    <NavLink href="/MainPage" className="flex items-center">
      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        CineGenie
      </span>
      <Image
        src="/cinegenie logo.png"
        alt="CineGenie Logo"
        width={40}
        height={40}
        priority
      />
    </NavLink>
  )}
</div>
            <div className="flex items-center space-x-4">
              <NavLink href="/Personal" className="flex items-center hover:text-indigo-300 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 2H15M9 2a2 2 0 00-2 2v16a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2M9 2h6M9 12h6M9 16h3" />
                </svg>
                <span className="hidden md:inline">Personal Tracker</span>
              </NavLink>
              <NavLink href="/WatchList" className="flex items-center hover:text-indigo-300 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span className="hidden md:inline">Watchlist</span>
              </NavLink>
              <NavLink href="/UserProfile">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center ring-2 ring-purple-500 ring-offset-2 ring-offset-black cursor-pointer hover:opacity-80 transition">
                  <User className="h-5 w-5 text-white" />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="bg-black bg-opacity-80 py-2 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        <div className="container mx-auto px-4 flex justify-center items-center">
          <p className="text-sm text-gray-400">© 2025 CineGenie - For the true movie enthusiast</p>
        </div>
      </footer>
    </div>
  );
};