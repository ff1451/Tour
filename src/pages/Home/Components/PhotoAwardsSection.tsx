import React from 'react';
import { Camera, Star, MapPin } from 'lucide-react';
import type { ParsedPhotoAward } from '../../../types/photoAwardAPI.types';

interface PhotoAwardsSectionProps {
  photoAwards: ParsedPhotoAward[];
  loading: boolean;
}

const PhotoAwardsSection: React.FC<PhotoAwardsSectionProps> = ({ photoAwards, loading }) => {
  return (
    <section className="bg-gray-900 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center space-x-2">
            <Camera className="h-8 w-8 text-yellow-400" />
            <h2 className="text-3xl font-bold text-white md:text-4xl">관광공모전 수상작</h2>
          </div>
          <p className="text-gray-300">대한민국 관광 사진 공모전 수상작을 만나보세요</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-w-4 aspect-h-5 h-96 animate-pulse rounded-xl bg-gray-800"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {photoAwards.slice(3, 6).map((photo) => (
              <div key={photo.id} className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg">
                <div className="aspect-w-4 aspect-h-5 relative h-96">
                  <img
                    src={photo.image}
                    alt={photo.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="absolute right-0 bottom-0 left-0 translate-y-6 transform p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                  <div className="mb-2 flex items-center space-x-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{photo.awardRank}</span>
                    {photo.awardCategory && <span className="text-xs text-gray-300">· {photo.awardCategory}</span>}
                  </div>
                  <h3 className="mb-1 line-clamp-2 text-xl font-bold">{photo.title}</h3>
                  <p className="mb-2 text-sm text-gray-300">by {photo.photographer}</p>
                  {photo.location && (
                    <div className="flex items-center text-xs text-gray-400">
                      <MapPin className="mr-1 h-3 w-3" />
                      <span className="line-clamp-1">{photo.location}</span>
                    </div>
                  )}
                  {photo.filmDate && <div className="mt-1 text-xs text-gray-400">촬영일: {photo.filmDate}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoAwardsSection;
