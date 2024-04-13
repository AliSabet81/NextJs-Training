import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <Skeleton className="h-12 w-52" />
      <Skeleton className="mb-12 mt-11 h-14 w-full" />
      <div className="mt-10 flex flex-col gap-6">
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
