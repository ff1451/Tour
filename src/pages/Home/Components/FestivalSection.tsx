import React from 'react';
import { MapPin, Calendar, ChevronRight } from 'lucide-react';
import type { FestivalDisplay } from '../../../types/homepage.types';

interface FestivalsSectionProps {
  festivals: FestivalDisplay[];
  loading: boolean;
}

const FestivalsSection: React.FC<FestivalsSectionProps> = ({ festivals, loading }) => {
  return (
    <section className="bg-gradient-to-br from-purple-50 to-pink-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
              전국 문화축제
              {festivals.length > 0 && <span className="text-primary-600 ml-3 text-2xl">{festivals.length}개</span>}
            </h2>
            <p className="text-gray-600">전국 각지의 다채로운 축제 정보</p>
          </div>
          <button className="text-primary-600 hover:text-primary-700 hidden items-center space-x-2 font-medium md:flex">
            <span>전체보기</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="animate-pulse overflow-hidden rounded-xl bg-white shadow-md">
                <div className="h-56 bg-gray-200"></div>
                <div className="p-5">
                  <div className="mb-3 h-6 rounded bg-gray-200"></div>
                  <div className="mb-2 h-4 rounded bg-gray-200"></div>
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : festivals.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {festivals.map((festival) => (
              <div
                key={festival.id}
                className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
              >
                <div className="relative h-56">
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="h-full w-full object-cover"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop';
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <div
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        festival.status === '진행중' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
                      }`}
                    >
                      {festival.status}
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900">{festival.name}</h3>
                  <div className="mb-2 flex items-center text-sm text-gray-600">
                    <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{festival.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-1 h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{festival.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <Calendar className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p>현재 진행중이거나 예정된 축제가 없습니다.</p>
            <p className="mt-2 text-sm">축제 정보를 불러오는 중이거나 데이터가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FestivalsSection;
