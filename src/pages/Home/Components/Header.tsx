import React from 'react';
import { MapPin, Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ mobileMenuOpen, onMobileMenuToggle }) => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <MapPin className="text-primary-600 h-8 w-8" />
            <span className="text-xl font-bold text-gray-900">한국여행</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden space-x-8 md:flex">
            <a href="#destinations" className="hover:text-primary-600 font-medium text-gray-700">
              여행지
            </a>
            <a href="#festivals" className="hover:text-primary-600 font-medium text-gray-700">
              축제
            </a>
            <a href="#planner" className="hover:text-primary-600 font-medium text-gray-700">
              여행계획
            </a>
            <a href="#weather" className="hover:text-primary-600 font-medium text-gray-700">
              날씨
            </a>
            <a href="#gallery" className="hover:text-primary-600 font-medium text-gray-700">
              갤러리
            </a>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button className="hidden items-center space-x-2 rounded-full bg-gray-100 px-4 py-2 transition hover:bg-gray-200 md:flex">
              <Search className="h-4 w-4 text-gray-600" />
              <span className="text-sm text-gray-600">검색</span>
            </button>

            <button className="md:hidden" onClick={onMobileMenuToggle}>
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t bg-white md:hidden">
          <div className="space-y-3 px-4 py-3">
            <a href="#destinations" className="hover:text-primary-600 block font-medium text-gray-700">
              여행지
            </a>
            <a href="#festivals" className="hover:text-primary-600 block font-medium text-gray-700">
              축제
            </a>
            <a href="#planner" className="hover:text-primary-600 block font-medium text-gray-700">
              여행계획
            </a>
            <a href="#weather" className="hover:text-primary-600 block font-medium text-gray-700">
              날씨
            </a>
            <a href="#gallery" className="hover:text-primary-600 block font-medium text-gray-700">
              갤러리
            </a>
            <div className="border-t pt-3">
              <button className="flex w-full items-center space-x-2 rounded-lg bg-gray-100 px-4 py-2">
                <Search className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-600">검색</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
