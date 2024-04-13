import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Skeleton className="h-[46px] w-32 self-end" />
      </div>
      <div className="mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1" />
        <Skeleton className="hidden h-14 w-full max-md:flex sm:w-28 sm:min-w-[170px]" />
      </div>
      <div className="mt-10 hidden flex-wrap gap-3 md:flex">
        {Array.from({ length: 4 }).map((item, index) => (
          <Skeleton key={index} className="h-10 w-28" />
        ))}
      </div>
      <div className="mt-10 flex w-full flex-col gap-6">
        {Array.from({ length: 10 }).map((item, index) => (
          <Skeleton key={index} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default Loading;
