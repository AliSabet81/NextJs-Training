import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="size-36 rounded-full " />
          <div className="mt-3">
            <Skeleton className="mb-1 h-7 w-44 rounded-full" />
            <Skeleton className="h-6 w-40 rounded-full" />
            <div className="mt-5 grid grid-cols-3 gap-5">
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
            </div>
            <div>
              <Skeleton className="mt-8 h-6 w-80" />
            </div>
          </div>
        </div>
        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3"></div>
      </div>
      <div className="mt-10">
        <Skeleton className="h-6 w-32 rounded-md" />
        <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
          {Array.from({ length: 4 }).map((item, index) => (
            <Skeleton key={index} className="h-28 rounded-md" />
          ))}
        </div>
      </div>
      <div className="mt-10 flex gap-10">
        <div className="flex flex-1 flex-col">
          <div className="flex">
            <Skeleton className="h-11 w-24 rounded-r-none" />
            <Skeleton className="h-11 w-24 rounded-r-none" />
          </div>
          <div className="mt-5 flex w-full flex-col gap-6">
            {Array.from({ length: 5 }).map((item, index) => (
              <Skeleton key={index} className="h-48 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
