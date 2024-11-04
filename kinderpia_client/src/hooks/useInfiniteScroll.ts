import { useState, useEffect, useRef } from "react";

export const useInfiniteScroll = (
  fetchData: (page: number) => Promise<void>,
  hasNextPage: boolean
) => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLHeadingElement>(null);

  const loadMore = () => {
    if (hasNextPage && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];
      if (firstEntry.isIntersecting) {
        loadMore();
      }
    });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasNextPage, isLoading]);

  useEffect(() => {
    setIsLoading(true);
    fetchData(page).finally(() => setIsLoading(false));
  }, [page, fetchData]);

  return { observerRef, isLoading };
};

