import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeleton() {
  return (
    <div className="mt-7 w-[90%] h-80">
      <Skeleton height={260} />
      <h4 className="font-semibold line-clamp-2 my-2">
        <Skeleton count={2} />
      </h4>
    </div>
  );
}
