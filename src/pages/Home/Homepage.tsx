import React, { useState, useEffect } from 'react';
import { useMultipleAreaTouristSpots, useOngoingFestivals } from '../../hooks/useTourAPI';
import { AREA_CODE, CONTENT_TYPE } from '../../api/tourAPI';
import type { TouristSpot } from '../../types/tourAPI.types';
import { useMultipleWeather } from '../../hooks/useWeatherAPI';
import { convertToGrid } from '../../api/weatherAPI';
import { useLatestPhotoAwards } from '../../hooks/usePhotoAwardAPI';
import type { HeroSlide, PopularDestination, FestivalDisplay } from '../../types/homepage.types';
import Header from './Components/header';
import HeroSlider from './Components/HeroSlider';
import PopularDestinations from './Components/PopularDestinations';
import FestivalsSection from './Components/FestivalSection';
import Footer from './Components/Footer';
import PhotoAwardsSection from './Components/PhotoAwardsSection';
import WeatherRecommendations from './Components/WeatherRecommendations';

const HomePage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // API 호출
  const { data: multiAreaData, loading: multiAreaLoading } = useMultipleAreaTouristSpots(
    [AREA_CODE.SEOUL, AREA_CODE.BUSAN, AREA_CODE.JEJU, AREA_CODE.GYEONGGI],
    CONTENT_TYPE.TOURIST_SPOT
  );

  const { data: photoAwardsData, loading: photoAwardsLoading } = useLatestPhotoAwards(9);
  const { data: festivalsData, loading: festivalsLoading } = useOngoingFestivals(null, 30);

  // 데이터 변환 함수
  const getHeroSlides = (): HeroSlide[] => {
    if (photoAwardsLoading || !photoAwardsData || photoAwardsData.length === 0) {
      return [
        {
          id: 1,
          image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200',
          title: '대한민국의 아름다운 여행지',
          subtitle: '전국 각지의 숨겨진 명소를 찾아보세요',
          location: '대한민국',
        },
      ];
    }

    return photoAwardsData.slice(0, 3).map((award) => ({
      id: award.id,
      image: award.image,
      title: award.title,
      subtitle: `${award.photographer} 작가 · ${award.awardRank}`,
      location: award.location.split(',')[0].trim(),
    }));
  };

  const getPopularDestinations = (): PopularDestination[] => {
    if (multiAreaLoading || !multiAreaData) return [];

    const allDestinations: TouristSpot[] = [];

    Object.values(multiAreaData).forEach((areaData) => {
      if (areaData?.items?.item) {
        const items = areaData.items.item;
        const itemsList = Array.isArray(items) ? items : [items];
        allDestinations.push(...itemsList);
      }
    });

    return allDestinations.slice(0, 8).map((dest) => {
      let nx: number | undefined;
      let ny: number | undefined;

      if (dest.mapy && dest.mapx) {
        try {
          const latitude = parseFloat(dest.mapy);
          const longitude = parseFloat(dest.mapx);
          if (!isNaN(latitude) && !isNaN(longitude)) {
            const grid = convertToGrid(latitude, longitude);
            nx = grid.nx;
            ny = grid.ny;
          }
        } catch (error) {
          console.error('Grid conversion error:', error);
        }
      }

      return {
        id: dest.contentid,
        contentTypeId: dest.contenttypeid,
        name: dest.title,
        location: dest.addr1?.split(' ').slice(0, 2).join(' ') || '위치정보 없음',
        image: dest.firstimage || dest.firstimage2 || 'https://via.placeholder.com/400x300?text=No+Image',
        mapx: dest.mapx,
        mapy: dest.mapy,
        nx,
        ny,
      };
    });
  };

  const getFestivals = (): FestivalDisplay[] => {
    if (festivalsLoading || !festivalsData?.items?.item) return [];

    const items = festivalsData.items.item;
    const itemsList = Array.isArray(items) ? items : [items];

    return itemsList.slice(0, 6).map((festival) => {
      const formatDate = (dateStr: string): string => {
        if (!dateStr || dateStr.length !== 8) return dateStr;
        return `${dateStr.substring(0, 4)}.${dateStr.substring(4, 6)}.${dateStr.substring(6, 8)}`;
      };

      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10).replace(/-/g, '');
      const startDate = festival.eventstartdate || '';
      const endDate = festival.eventenddate || '';

      let status: '진행중' | '예정' = '예정';
      if (startDate && endDate) {
        if (todayStr >= startDate && todayStr <= endDate) {
          status = '진행중';
        }
      }

      return {
        id: festival.contentid,
        contentTypeId: festival.contenttypeid,
        name: festival.title,
        location: festival.addr1?.split(' ').slice(0, 2).join(' ') || '위치정보 없음',
        date: `${formatDate(festival.eventstartdate)} - ${formatDate(festival.eventenddate)}`,
        status,
        image:
          festival.firstimage ||
          festival.firstimage2 ||
          'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop',
      };
    });
  };

  const heroSlides: HeroSlide[] = getHeroSlides();
  const popularDestinations: PopularDestination[] = getPopularDestinations();
  const festivals: FestivalDisplay[] = getFestivals();
  const photoAwards = photoAwardsData || [];

  // 날씨 데이터 조회
  const weatherLocations = popularDestinations
    .filter((dest) => dest.nx && dest.ny)
    .map((dest) => ({
      nx: dest.nx!,
      ny: dest.ny!,
      name: dest.id,
    }));

  const { data: weatherData, loading: weatherLoading } = useMultipleWeather(weatherLocations);

  // Auto slide for hero section
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header mobileMenuOpen={mobileMenuOpen} onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} />

      <HeroSlider slides={heroSlides} activeSlide={activeSlide} onSlideChange={setActiveSlide} />

      <PopularDestinations
        destinations={popularDestinations}
        weatherData={weatherData}
        loading={multiAreaLoading}
        weatherLoading={weatherLoading}
      />

      <FestivalsSection festivals={festivals} loading={festivalsLoading} />

      <PhotoAwardsSection photoAwards={photoAwards} loading={photoAwardsLoading} />

      <WeatherRecommendations
        destinations={popularDestinations}
        weatherData={weatherData}
        weatherLoading={weatherLoading}
      />

      <Footer />
    </div>
  );
};

export default HomePage;
