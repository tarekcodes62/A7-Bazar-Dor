import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function ProductCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Product name */}
      <div className="mb-4 flex items-center gap-3">
        <Skeleton width={48} height={48} borderRadius={12} />
        <div className="flex-1">
          <Skeleton width="70%" height={22} />
          <Skeleton width="40%" height={14} />
        </div>
      </div>

      {/* Price */}
      <Skeleton width="45%" height={16} />
      <Skeleton width="65%" height={32} className="my-2" />

      {/* Price change */}
      <Skeleton width="55%" height={18} />

      {/* Footer */}
      <div className="mt-5 border-t border-gray-100 pt-4">
        <Skeleton width="100%" height={12} />
        <Skeleton width="80%" height={12} className="mt-2" />
      </div>
    </div>
  );
}
