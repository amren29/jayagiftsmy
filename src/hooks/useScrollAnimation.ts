'use client';

import { useEffect, useRef, useState } from 'react';

export interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  duration?: number;
  delay?: number;
  animationType?: 'fade' | 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'rotate' | 'flip' | 'bounce' | 'random';
  once?: boolean;
  randomVariation?: boolean;
}

const defaultOptions: ScrollAnimationOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  duration: 600,
  delay: 0,
  animationType: 'fade',
  once: true,
  randomVariation: false,
};

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [actualAnimationType, setActualAnimationType] = useState<string>('fade');

  const mergedOptions = { ...defaultOptions, ...options };

  // Available animation types for random selection
  const animationTypes = ['fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'scale', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'rotate', 'flip', 'bounce'];

  // Generate random delay and duration variations for more organic feel
  const randomDelay = isMounted ? (mergedOptions.delay || 0) + Math.random() * 300 : (mergedOptions.delay || 0);
  const randomDuration = isMounted && mergedOptions.randomVariation ? (mergedOptions.duration || 600) + (Math.random() - 0.5) * 200 : (mergedOptions.duration || 600);

  useEffect(() => {
    setIsMounted(true);

    // Set random animation type if requested
    if (mergedOptions.animationType === 'random') {
      const randomType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      setActualAnimationType(randomType);
    } else {
      setActualAnimationType(mergedOptions.animationType || 'fade');
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes in motion preference
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // If user prefers reduced motion, show element immediately without animation
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (mergedOptions.once) {
              setHasAnimated(true);
            }
          } else if (!mergedOptions.once && !hasAnimated) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: mergedOptions.threshold,
        rootMargin: mergedOptions.rootMargin,
      }
    );

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current && element) {
        observerRef.current.unobserve(element);
      }
    };
  }, [mergedOptions.threshold, mergedOptions.rootMargin, mergedOptions.once, hasAnimated, prefersReducedMotion]);

  // Cleanup observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Calculate styles based on animation state
  const getAnimationStyles = (): React.CSSProperties => {
    if (!isMounted) {
      // Return minimal styles during SSR to prevent hydration mismatch
      return {};
    }

    // If user prefers reduced motion, return static styles without transitions
    if (prefersReducedMotion) {
      return {
        opacity: 1,
        transform: 'translateY(0) translateX(0)',
      };
    }

    const baseStyles: React.CSSProperties = {
      transition: `all ${randomDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      transitionDelay: `${randomDelay}ms`,
      willChange: 'transform, opacity',
    };

    if (!isVisible && !hasAnimated) {
      // Initial state - hidden
      switch (actualAnimationType) {
        case 'fade-up':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(30px)',
          };
        case 'fade-down':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(-30px)',
          };
        case 'fade-left':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(30px)',
          };
        case 'fade-right':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(-30px)',
          };
        case 'scale':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'scale(0.8)',
          };
        case 'slide-up':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(50px)',
          };
        case 'slide-down':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(-50px)',
          };
        case 'slide-left':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(50px)',
          };
        case 'slide-right':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateX(-50px)',
          };
        case 'rotate':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'rotate(-10deg) scale(0.9)',
          };
        case 'flip':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'rotateY(90deg)',
          };
        case 'bounce':
          return {
            ...baseStyles,
            opacity: 0,
            transform: 'translateY(30px) scale(0.9)',
            transition: `all ${randomDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`,
          };
        case 'fade':
        default:
          return {
            ...baseStyles,
            opacity: 0,
          };
      }
    } else {
      // Visible state - shown
      return {
        ...baseStyles,
        opacity: 1,
        transform: 'translateY(0) translateX(0) scale(1) rotate(0deg) rotateY(0deg)',
        transition: actualAnimationType === 'bounce'
          ? `all ${randomDuration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`
          : `all ${randomDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      };
    }
  };

  return {
    ref: elementRef,
    isVisible,
    styles: getAnimationStyles(),
  };
};