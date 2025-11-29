import React from 'react';
import { MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-12 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <MapPin className="text-primary-400 h-6 w-6" />
              <span className="text-xl font-bold text-white">한국여행</span>
            </div>
            <p className="text-sm text-gray-400">대한민국 구석구석, 모든 여행 정보를 한곳에서</p>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  여행지 검색
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  축제 정보
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  여행 계획
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  날씨 정보
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">정보</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  공지사항
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  이용약관
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  개인정보처리방침
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-400 transition">
                  고객센터
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-bold text-white">데이터 제공</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>한국관광공사</li>
              <li>기상청</li>
              <li>문화체육관광부</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
          <p>&copy; 2025 한국여행. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
