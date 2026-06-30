import React, { useEffect, useState, useRef } from 'react';

// Custom hook to detect prefers-reduced-motion
export function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener('change', listener);
    return () => {
      mediaQuery.removeEventListener('change', listener);
    };
  }, []);

  return prefersReduced;
}

interface AnimatedMetricProps {
  value: number;
  decimals?: number;
  duration?: number; // ms, default 1000
  prefix?: string;
  suffix?: string;
  className?: string;
  id?: string;
}

export const AnimatedMetric: React.FC<AnimatedMetricProps> = ({
  value,
  decimals = 0,
  duration = 1000,
  prefix = '',
  suffix = '',
  className = '',
  id
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [displayValue, setDisplayValue] = useState(value);
  const [isUpdating, setIsUpdating] = useState(false);
  const prevValueRef = useRef(value);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // If motion is reduced, skip animation and set instantly
    if (prefersReduced) {
      setDisplayValue(value);
      prevValueRef.current = value;
      return;
    }

    const startVal = prevValueRef.current;
    const endVal = value;
    
    // If no change and not on initial mount, do nothing
    if (startVal === endVal) {
      return;
    }

    // Trigger brief 200ms glow update flash on value changes
    setIsUpdating(true);
    const flashTimeout = setTimeout(() => {
      setIsUpdating(false);
    }, 250);

    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Quartic ease out for super smooth deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = startVal + (endVal - startVal) * ease;
      
      setDisplayValue(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(endVal);
        prevValueRef.current = endVal;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(flashTimeout);
    };
  }, [value, duration, prefersReduced]);

  // Format with correct decimal points
  const formatted = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span
      id={id}
      className={`inline-block transition-all duration-300 ${
        isUpdating 
          ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] scale-[1.03]' 
          : ''
      } ${className}`}
    >
      {prefix}{formatted}{suffix}
    </span>
  );
};

interface AnimatedProgressBarProps {
  value: number; // 0 to 100
  colorClass?: string;
  className?: string;
  id?: string;
}

export const AnimatedProgressBar: React.FC<AnimatedProgressBarProps> = ({
  value,
  colorClass = 'bg-emerald-500',
  className = 'h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40',
  id
}) => {
  const prefersReduced = usePrefersReducedMotion();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (prefersReduced) {
      setWidth(value);
      return;
    }

    // Trigger animation frame delay so it transitions from 0% or previous value
    const timer = setTimeout(() => {
      setWidth(value);
    }, 50);

    return () => clearTimeout(timer);
  }, [value, prefersReduced]);

  return (
    <div id={id} className={className}>
      <div
        className={`h-full ${colorClass} transition-all duration-1000 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, width))}%` }}
      />
    </div>
  );
};
