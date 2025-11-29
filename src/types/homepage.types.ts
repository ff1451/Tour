/**
 * HomePage 컴포넌트에서 사용하는 공통 타입 정의
 */

export interface HeroSlide {
  id: string | number;
  image: string;
  title: string;
  subtitle: string;
  location: string;
}

export interface PopularDestination {
  id: string;
  contentTypeId: string;
  name: string;
  location: string;
  image: string;
  mapx?: string;
  mapy?: string;
  nx?: number;
  ny?: number;
}

export interface FestivalDisplay {
  id: string;
  contentTypeId: string;
  name: string;
  location: string;
  date: string;
  status: '진행중' | '예정';
  image: string;
}
