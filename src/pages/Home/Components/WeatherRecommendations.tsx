import React from 'react';
import { Cloud, MapPin, Sun, CloudRain, Cloudy, Droplets } from 'lucide-react';
import type { PopularDestination } from '../../../types/homepage.types';
import type { ParsedWeatherData } from '../../../types/weatherAPI.types';

interface WeatherRecommendationsProps {
  destinations: PopularDestination[];
  weatherData: Record<string, ParsedWeatherData>;
  weatherLoading: boolean;
}

const WeatherRecommendations: React.FC<WeatherRecommendationsProps> = ({
  destinations,
  weatherData,
  weatherLoading,
}) => {
  // 날씨 아이콘 선택 헬퍼
  const getWeatherIcon = (weather: ParsedWeatherData | undefined) => {
    if (!weather) return <Cloud className="h-10 w-10 text-gray-300" />;

    // 강수 형태 우선 체크
    if (weather.precipitationType && weather.precipitationType !== '없음') {
      return <CloudRain className="h-10 w-10 text-blue-500" />;
    }

    // 하늘 상태로 판단
    if (weather.skyCondition === '맑음') {
      return <Sun className="h-10 w-10 text-yellow-500" />;
    } else if (weather.skyCondition === '구름많음') {
      return <Cloudy className="h-10 w-10 text-gray-500" />;
    } else if (weather.skyCondition === '흐림') {
      return <Cloud className="h-10 w-10 text-gray-600" />;
    }

    return <Cloud className="h-10 w-10 text-gray-300" />;
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-cyan-50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <Cloud className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">날씨 기반 추천</h2>
          </div>
          <p className="text-gray-600">오늘 날씨가 좋은 여행지를 추천해드립니다</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {destinations.slice(0, 6).map((dest) => {
            const weather = weatherData[dest.id];
            const hasWeather = weather && !weatherLoading;

            return (
              <div key={dest.id} className="rounded-xl bg-white p-6 shadow-md transition-shadow hover:shadow-lg">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 line-clamp-1 text-lg font-bold text-gray-900">{dest.name}</h3>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="mr-1 h-3.5 w-3.5 flex-shrink-0" />
                      <span className="line-clamp-1">{dest.location}</span>
                    </div>
                  </div>
                  <div className="ml-3">{getWeatherIcon(weather)}</div>
                </div>

                {hasWeather ? (
                  <div className="space-y-2">
                    {/* 기온 */}
                    {weather.temperature !== undefined && (
                      <div className="flex items-center justify-between border-b border-gray-100 py-2">
                        <span className="text-sm text-gray-600">기온</span>
                        <span className="text-lg font-bold text-gray-900">{Math.round(weather.temperature)}°C</span>
                      </div>
                    )}

                    {/* 하늘 상태 */}
                    {weather.skyCondition && (
                      <div className="flex items-center justify-between border-b border-gray-100 py-2">
                        <span className="text-sm text-gray-600">날씨</span>
                        <span className="text-sm font-medium text-gray-900">{weather.skyCondition}</span>
                      </div>
                    )}

                    {/* 습도 */}
                    {weather.humidity !== undefined && (
                      <div className="flex items-center justify-between border-b border-gray-100 py-2">
                        <span className="text-sm text-gray-600">습도</span>
                        <span className="flex items-center text-sm font-medium text-gray-900">
                          <Droplets className="mr-1 h-3.5 w-3.5 text-blue-500" />
                          {Math.round(weather.humidity)}%
                        </span>
                      </div>
                    )}

                    {/* 추천 메시지 */}
                    {weather.temperature !== undefined && weather.skyCondition && (
                      <div className="pt-2">
                        {weather.skyCondition === '맑음' && weather.temperature >= 15 && weather.temperature <= 25 ? (
                          <div className="rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-600">
                            ✨ 관광하기 최적의 날씨
                          </div>
                        ) : weather.skyCondition === '맑음' ? (
                          <div className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600">
                            ☀️ 맑은 날씨, 관광 추천
                          </div>
                        ) : weather.precipitationType && weather.precipitationType !== '없음' ? (
                          <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                            🌧️ 실내 관광지 추천
                          </div>
                        ) : (
                          <div className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-medium text-gray-600">
                            ☁️ 관광 가능
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : weatherLoading ? (
                  <div className="space-y-2">
                    <div className="h-8 animate-pulse rounded bg-gray-100"></div>
                    <div className="h-8 animate-pulse rounded bg-gray-100"></div>
                    <div className="h-8 animate-pulse rounded bg-gray-100"></div>
                  </div>
                ) : (
                  <div className="py-4 text-center text-sm text-gray-400">날씨 정보를 불러올 수 없습니다</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WeatherRecommendations;
