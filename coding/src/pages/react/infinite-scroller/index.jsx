import React, { useState, useEffect, useCallback, useRef } from "react";

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchMoreItems = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate fetching new data
    setTimeout(() => {
      const newItems = Array.from({ length: 20 }, (_, i) => `Item ${items.length + i + 1}`);
      setItems((prevItems) => [...prevItems, ...newItems]);

      // Example: Stop loading more items after fetching 100
      if (items.length + newItems.length >= 100) {
        setHasMore(false);
      }
      setLoading(false);
    }, 1500); // Simulate network delay
  }, [items, loading, hasMore]);

  const observerRef = useIntersectionObserver(fetchMoreItems, { threshold: 1 });

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ padding: '10px', border: '1px solid #ddd' }}>
            {item}
          </li>
        ))}
      </ul>
      {hasMore && (
        <div ref={observerRef} style={{ padding: '10px', textAlign: 'center' }}>
          {loading ? 'Loading more items...' : 'Scroll to load more'}
        </div>
      )}
    </div>
  );
};

export default InfiniteScroll;

function useIntersectionObserver(callback, options) {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [callback, options]);

  return targetRef;
}
