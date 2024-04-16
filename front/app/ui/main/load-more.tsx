"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Spinner from "@/app/ui/main/spinner";

export function LoadMore() {
  const { ref, inView } = useInView();

  const loadMore = async () => {
    console.log("Load more!");
  };

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <>
      <div
        className="flex justify-center items-center p-4 w-full"
        ref={ref}
      >
        <Spinner />
      </div>
    </>
  );
}