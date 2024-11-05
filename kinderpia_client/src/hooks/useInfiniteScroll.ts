import { useState, useEffect, useRef } from "react";

export const useInfiniteScroll = (
  fetchData: (page: number) => Promise<void>,
  hasNextPage: boolean
) => {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const observerRef = useRef<HTMLDivElement>(null);

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

    // 관찰할 대상 설정
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    // 언마운트 시 관찰 대상 해제
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

