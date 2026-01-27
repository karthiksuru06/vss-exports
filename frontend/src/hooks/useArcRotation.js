/**
 * useArcRotation - SCROLL-based rotation (NOT spin)
 *
 * BEHAVIOR:
 * - Scroll DOWN = move to NEXT product
 * - Scroll UP = move to PREVIOUS product
 * - Click product = snap directly to it
 * - NO momentum, NO spinning, NO velocity
 * - Direct 1:1 scroll control
 */

import { useRef, useCallback, useEffect } from 'react';
import { useMotionValue, animate } from 'framer-motion';

// Scroll threshold to trigger next/prev
const SCROLL_THRESHOLD = 50;

/**
 * Positive modulo for array indexing
 */
const mod = (n, m) => ((n % m) + m) % m;

/**
 * useArcRotation Hook - Scroll-based navigation
 */
export function useArcRotation({ productCount, isLocked, onFocusChange }) {
  const rotation = useMotionValue(0);

  // Track current focused index
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);

  // Angle between each product
  const anglePerProduct = productCount > 1 ? 180 / (productCount - 1) : 0;

  /**
   * Get rotation angle to center a specific index
   */
  const getRotationForIndex = useCallback((index) => {
    return 90 - index * anglePerProduct;
  }, [anglePerProduct]);

  /**
   * Animate to a specific product index
   */
  const goToIndex = useCallback((index, immediate = false) => {
    if (isAnimatingRef.current && !immediate) return;
    if (index < 0 || index >= productCount) return;

    isAnimatingRef.current = true;
    currentIndexRef.current = index;

    const targetRotation = getRotationForIndex(index);

    if (immediate) {
      rotation.set(targetRotation);
      isAnimatingRef.current = false;
      onFocusChange(index);
    } else {
      animate(rotation, targetRotation, {
        type: 'spring',
        stiffness: 200,
        damping: 25,
        mass: 0.8,
        onComplete: () => {
          isAnimatingRef.current = false;
          onFocusChange(index);
        }
      });
    }
  }, [productCount, rotation, getRotationForIndex, onFocusChange]);

  /**
   * Go to next product
   */
  const goToNext = useCallback(() => {
    if (isAnimatingRef.current) return;
    const nextIndex = Math.min(currentIndexRef.current + 1, productCount - 1);
    if (nextIndex !== currentIndexRef.current) {
      goToIndex(nextIndex);
    }
  }, [productCount, goToIndex]);

  /**
   * Go to previous product
   */
  const goToPrev = useCallback(() => {
    if (isAnimatingRef.current) return;
    const prevIndex = Math.max(currentIndexRef.current - 1, 0);
    if (prevIndex !== currentIndexRef.current) {
      goToIndex(prevIndex);
    }
  }, [goToIndex]);

  /**
   * Mouse wheel handler - SCROLL mechanism
   * Scroll DOWN = next, Scroll UP = previous
   */
  const handleWheel = useCallback((e) => {
    if (isLocked || isAnimatingRef.current) return;
    e.preventDefault();

    // Accumulate scroll delta
    scrollAccumulatorRef.current += e.deltaY;

    // Check if accumulated enough to trigger next/prev
    if (scrollAccumulatorRef.current > SCROLL_THRESHOLD) {
      scrollAccumulatorRef.current = 0;
      goToNext();
    } else if (scrollAccumulatorRef.current < -SCROLL_THRESHOLD) {
      scrollAccumulatorRef.current = 0;
      goToPrev();
    }
  }, [isLocked, goToNext, goToPrev]);

  /**
   * Pointer handlers - for drag scrolling
   */
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);

  const handlePointerDown = useCallback((e) => {
    if (isLocked) return;
    isDraggingRef.current = true;
    dragStartYRef.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [isLocked]);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current || isLocked || isAnimatingRef.current) return;

    const deltaY = e.clientY - dragStartYRef.current;

    // Drag down = next, drag up = previous
    if (deltaY > 60) {
      dragStartYRef.current = e.clientY;
      goToNext();
    } else if (deltaY < -60) {
      dragStartYRef.current = e.clientY;
      goToPrev();
    }
  }, [isLocked, goToNext, goToPrev]);

  const handlePointerUp = useCallback((e) => {
    isDraggingRef.current = false;
    if (e.currentTarget) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  /**
   * Snap to specific index (for clicking on products)
   */
  const snapToIndex = useCallback((index) => {
    if (index < 0 || index >= productCount) return;
    goToIndex(index);
  }, [productCount, goToIndex]);

  /**
   * Get current focused index
   */
  const getFocusedIndex = useCallback(() => {
    return currentIndexRef.current;
  }, []);

  // Initialize - start at first product
  useEffect(() => {
    if (productCount === 0) return;
    goToIndex(0, true);
  }, [productCount]);

  return {
    rotation,
    handlers: {
      onWheel: handleWheel,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerLeave: handlePointerUp,
    },
    snapToIndex,
    anglePerProduct,
    getFocusedIndex,
    goToNext,
    goToPrev,
  };
}

export default useArcRotation;
