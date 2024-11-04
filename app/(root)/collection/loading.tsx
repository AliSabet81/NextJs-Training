import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>
      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="h-14 w-28" />
      </div>
      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 10 }).map((item, index) => (
          <Skeleton
            key={index}
            className="h-48 w-full rounded-xl"
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
