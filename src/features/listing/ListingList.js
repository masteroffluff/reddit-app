import Item from "./Item";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    appendListingByPath,
    hasMore,
  } from "./listingSlice";
// component to handle the lists
export default function ListingList({ listingObject, dispatchParams}) {
  const { data } = listingObject;

  const [visibleCount, setVisibleCount] = useState(5);
  const sentinelRef = useRef();
  const listingHasMore = useSelector(hasMore);
  const listingHasMoreRef = useRef(listingHasMore);
  const [shouldLoadMore, setShouldLoadMore] = useState(false);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!data) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && listingHasMoreRef) {
            setVisibleCount((prev) => {
              const newValue = Math.min(prev + 5, data.children.length);
              if (newValue >= data.children.length) {
                setShouldLoadMore(true)
              }
              return newValue;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: "100px", // Start loading 100px before data.children enter viewport
        threshold: 0.1,
      }
    );

    // Observe the sentinel element
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => observer.disconnect();
    
  }, [data]);


  useEffect(() => {
    
    if (shouldLoadMore && listingHasMoreRef) {
        console.log("loading more")
      dispatch(appendListingByPath(dispatchParams));
      setShouldLoadMore(false);
    }
  }, [shouldLoadMore, dispatch, dispatchParams]);

  if (!data) {
    return <p>please wait</p>;
  }
  return (
    <>
      {Object.entries(data.children)
        .slice(0, visibleCount)
        .map(([key, thing]) => {
          return (
            <div key={key} data-testid={`post-${key}`} className="item">
              <Item key={key} itemnumber={key} thing={thing} internal={false} />
            </div>
          );
        })}
      {data && visibleCount < data.children.length ? (
        <div
          ref={sentinelRef}
          style={{
            height: "1px",
            opacity: 0,
          }}
          aria-hidden="true"
        />
      ) : (
        <></>
      )}
    </>
  );
}
