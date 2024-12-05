"use client";
import React, { useState, useEffect, useRef } from "react";

const CircleProgress = ({ duration = 4200, finish = 100 }) => {
  const [isInViewport, setIsInViewport] = useState(false);
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const circleRef = useRef(null);

  useEffect(() => {
    const currentElement = circleRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // 10% of the element must be visible
      }
    );

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  useEffect(() => {
    if (isInViewport) {
      const interval = duration / finish;
      let currentProgress = 0;

      const intervalId = setInterval(() => {
        currentProgress += 1;
        const easedProgress = Math.round(
          (1 - Math.pow(1 - currentProgress / finish, 3)) * finish // Ease-out cubic function
        );

        setDisplayedProgress(easedProgress);

        if (currentProgress >= finish) {
          clearInterval(intervalId);
        }
      }, interval);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isInViewport, duration, finish]);

  const r = 34;
  const c = Math.PI * (r * 2);
  const pct = ((100 - displayedProgress) / 100) * c;

  return (
    <div ref={circleRef} className="circle-progress" data-pct={displayedProgress}>
      <svg className="circle-progress-content" viewBox="0 0 74 74">
        <circle
          className="bg"
          cx="37"
          cy="37"
          r="34"
          fill="none"
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={0}
        />
        <circle
          className="bar"
          cx="37"
          cy="37"
          r="34"
          fill="none"
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={pct}
        />
      </svg>
    </div>
  );
};

export default CircleProgress;