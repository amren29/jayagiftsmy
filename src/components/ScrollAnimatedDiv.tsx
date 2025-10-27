'use client';

import React, { forwardRef } from 'react';
import { useScrollAnimation, ScrollAnimationOptions } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ScrollAnimatedDivProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animationOptions?: ScrollAnimationOptions;
  as?: keyof JSX.IntrinsicElements;
}

const ScrollAnimatedDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ children, className, animationOptions, as: Component = 'div', ...props }, forwardedRef) => {
    const { ref, styles } = useScrollAnimation(animationOptions);

    // Merge refs if both are provided
    const mergeRefs = (node: HTMLDivElement | null) => {
      if (ref.current !== node) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        forwardedRef.current = node;
      }
    };

    return React.createElement(
      Component,
      {
        ref: mergeRefs,
        className: cn(className),
        style: styles,
        ...props,
      },
      children
    );
  }
);

ScrollAnimatedDiv.displayName = 'ScrollAnimatedDiv';

export default ScrollAnimatedDiv;

// Convenience components for different animation types
export const FadeInDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'fade', ...animationOptions }}
    />
  )
);
FadeInDiv.displayName = 'FadeInDiv';

export const FadeUpDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'fade-up', ...animationOptions }}
    />
  )
);
FadeUpDiv.displayName = 'FadeUpDiv';

export const FadeDownDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'fade-down', ...animationOptions }}
    />
  )
);
FadeDownDiv.displayName = 'FadeDownDiv';

export const FadeLeftDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'fade-left', ...animationOptions }}
    />
  )
);
FadeLeftDiv.displayName = 'FadeLeftDiv';

export const FadeRightDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'fade-right', ...animationOptions }}
    />
  )
);
FadeRightDiv.displayName = 'FadeRightDiv';

export const ScaleDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'scale', ...animationOptions }}
    />
  )
);
ScaleDiv.displayName = 'ScaleDiv';

export const SlideUpDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'slide-up', ...animationOptions }}
    />
  )
);
SlideUpDiv.displayName = 'SlideUpDiv';

export const SlideDownDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'slide-down', ...animationOptions }}
    />
  )
);
SlideDownDiv.displayName = 'SlideDownDiv';

export const SlideLeftDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'slide-left', ...animationOptions }}
    />
  )
);
SlideLeftDiv.displayName = 'SlideLeftDiv';

export const SlideRightDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'slide-right', ...animationOptions }}
    />
  )
);
SlideRightDiv.displayName = 'SlideRightDiv';

export const RotateDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'rotate', ...animationOptions }}
    />
  )
);
RotateDiv.displayName = 'RotateDiv';

export const FlipDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'flip', ...animationOptions }}
    />
  )
);
FlipDiv.displayName = 'FlipDiv';

export const BounceDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{ animationType: 'bounce', ...animationOptions }}
    />
  )
);
BounceDiv.displayName = 'BounceDiv';

export const RandomAnimatedDiv = forwardRef<HTMLDivElement, ScrollAnimatedDivProps>(
  ({ animationOptions, ...props }, ref) => (
    <ScrollAnimatedDiv
      {...props}
      ref={ref}
      animationOptions={{
        animationType: 'random',
        randomVariation: true,
        ...animationOptions
      }}
    />
  )
);
RandomAnimatedDiv.displayName = 'RandomAnimatedDiv';