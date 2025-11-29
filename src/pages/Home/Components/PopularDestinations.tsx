import React from 'react';
import { MapPin, ChevronRight, Sun, Cloud, CloudRain, Cloudy, Droplets } from 'lucide-react';
import type { PopularDestination } from '../../../types/homepage.types';
import type { ParsedWeatherData } from '../../../types/weatherAPI.types';

interface PopularDestinationsProps {
  destinations: PopularDestination[];
  weatherData: Record<string, ParsedWeatherData>;
  loading: boolean;
  weatherLoading: boolean;
}

const PopularDestinations: React.FC<PopularDestinationsProps> = ({
  destinations,
  weatherData,
  loading,
  weatherLoading,
}) => {
  // 날씨 아이콘 선택 헬퍼
  const getWeatherIcon = (weather: ParsedWeatherData | undefined) => {
    if (!weather) return <Cloud className="h-5 w-5 text-gray-400" />;

    // 강수 형태 우선 체크
    if (weather.precipitationType && weather.precipitationType !== '없음') {
      return <CloudRain className="h-5 w-5 text-blue-500" />;
    }

    // 하늘 상태로 판단
    if (weather.skyCondition === '맑음') {
      return <Sun className="h-5 w-5 text-yellow-500" />;
    } else if (weather.skyCondition === '구름많음') {
      return <Cloudy className="h-5 w-5 text-gray-500" />;
    } else if (weather.skyCondition === '흐림') {
      return <Cloud className="h-5 w-5 text-gray-600" />;
    }

    return <Cloud className="h-5 w-5 text-gray-400" />;
  };

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">인기 여행지</h2>
            <p className="text-gray-600">전국 주요 관광지 추천</p>
          </div>
          <button className="text-primary-600 hover:text-primary-700 hidden items-center space-x-2 font-medium md:flex">
            <span>전체보기</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="animate-pulse overflow-hidden rounded-xl bg-white shadow-md">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="mb-2 h-6 rounded bg-gray-200"></div>
                  <div className="h-4 w-2/3 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : destinations.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                  {/* 날씨 배지 */}
                  {!weatherLoading && weatherData[dest.id] && (
                    <div className="absolute top-3 right-3 flex items-center space-x-2 rounded-full bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-sm">
                      {getWeatherIcon(weatherData[dest.id])}
                      {weatherData[dest.id].temperature !== undefined && (
                        <span className="text-sm font-semibold text-gray-900">
                          {Math.round(weatherData[dest.id].temperature!)}°C
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="mb-1 line-clamp-1 text-lg font-bold text-gray-900">{dest.name}</h3>
                  <div className="mb-2 flex items-center text-sm text-gray-600">
                    <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                    <span className="line-clamp-1">{dest.location}</span>
                  </div>
                  {/* 날씨 상세 정보 */}
                  {!weatherLoading && weatherData[dest.id] && (
                    <div className="flex items-center justify-between border-t border-gray-100 pt-2 text-xs text-gray-500">
                      {weatherData[dest.id].skyCondition && (
                        <span className="flex items-center">{weatherData[dest.id].skyCondition}</span>
                      )}
                      {weatherData[dest.id].humidity !== undefined && (
                        <span className="flex items-center">
                          <Droplets className="mr-1 h-3 w-3" />
                          {Math.round(weatherData[dest.id].humidity!)}%
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-gray-500">
            <MapPin className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <p>관광지 정보를 불러오는 중입니다...</p>
          </div>
        )}

        <button className="text-primary-600 hover:text-primary-700 border-primary-600 mt-6 flex w-full items-center justify-center space-x-2 rounded-lg border py-3 font-medium md:hidden">
          <span>전체보기</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default PopularDestinations;
