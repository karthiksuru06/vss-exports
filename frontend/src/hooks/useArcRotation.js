/**
 * useArcRotation - SCROLL-based rotation (NOT spin)
 *
 * BEHAVIOR:
 * - DESKTOP: Scroll DOWN = NEXT, Scroll UP = PREVIOUS (vertical)
 * - MOBILE: Swipe LEFT = NEXT, Swipe RIGHT = PREVIOUS (horizontal)
 * - Click product = snap directly to it
 * - NO momentum, NO spinning, NO velocity
 * - Direct 1:1 scroll control
 */

import { useRef, useCallback, useEffect } from 'react';
import { useMotionValue, animate } from 'framer-motion';

// Scroll/swipe threshold to trigger next/prev
const SCROLL_THRESHOLD = 50;
const SWIPE_THRESHOLD = 40;

/**
 * useArcRotation Hook - Scroll/Swipe-based navigation
 */
export function useArcRotation({ productCount, isLocked, onFocusChange, isMobile = false }) {
  const rotation = useMotionValue(0);

  // Track current focused index
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const scrollAccumulatorRef = useRef(0);

  // Angle between each product - increased spacing (220 instead of 180)
  const anglePerProduct = productCount > 0 ? 220 / productCount : 0;

  /**
   * Get rotation angle to center a specific index
   * MOBILE: Products start at 0°, focus at 90° (top of upward arc)
   * DESKTOP: Products start at -90°, focus at 0° (right side)
   */
  const getRotationForIndex = useCallback((index) => {
    if (isMobile) {
      // Mobile: start from 0°, focus at 90° (top)
      // To bring index to 90°: rotation = 90 - (startAngle + index * anglePerProduct)
      return 90 - index * anglePerProduct;
    }
    // Desktop: start from -90°, focus at 0° (right)
    return 90 - index * anglePerProduct;
  }, [anglePerProduct, isMobile]);

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
        stiffness: isMobile ? 250 : 200,
        damping: isMobile ? 28 : 25,
        mass: 0.8,
        onComplete: () => {
          isAnimatingRef.current = false;
          onFocusChange(index);
        }
      });
    }
  }, [productCount, rotation, getRotationForIndex, onFocusChange, isMobile]);

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
   * Mouse wheel handler - SCROLL mechanism (desktop only)
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
   * Pointer handlers - for drag/swipe
   * Desktop: Vertical drag (up/down)
   * Mobile: Horizontal swipe (left/right)
   */
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback((e) => {
    if (isLocked) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [isLocked]);

  const handlePointerMove = useCallback((e) => {
    if (!isDraggingRef.current || isLocked || isAnimatingRef.current) return;

    if (isMobile) {
      // Mobile: Horizontal swipe
      const deltaX = e.clientX - dragStartRef.current.x;

      // Swipe left = next, swipe right = previous
      if (deltaX < -SWIPE_THRESHOLD) {
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        goToNext();
      } else if (deltaX > SWIPE_THRESHOLD) {
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        goToPrev();
      }
    } else {
      // Desktop: Vertical drag
      const deltaY = e.clientY - dragStartRef.current.y;

      // Drag down = next, drag up = previous
      if (deltaY > 60) {
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        goToNext();
      } else if (deltaY < -60) {
        dragStartRef.current = { x: e.clientX, y: e.clientY };
        goToPrev();
      }
    }
  }, [isLocked, isMobile, goToNext, goToPrev]);

  const handlePointerUp = useCallback((e) => {
    isDraggingRef.current = false;
    if (e.currentTarget) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  }, []);

  /**
   * Touch handlers for better mobile swipe support
   */
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleTouchStart = useCallback((e) => {
    if (isLocked) return;
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, [isLocked]);

  const handleTouchMove = useCallback((e) => {
    if (isLocked || isAnimatingRef.current) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Prevent page scroll when swiping horizontally on mobile
    if (isMobile && Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
    }

    if (isMobile) {
      // Mobile: Horizontal swipe
      if (deltaX < -SWIPE_THRESHOLD) {
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        goToNext();
      } else if (deltaX > SWIPE_THRESHOLD) {
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        goToPrev();
      }
    } else {
      // Desktop touch: Vertical
      if (deltaY > 60) {
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        goToNext();
      } else if (deltaY < -60) {
        touchStartRef.current = { x: touch.clientX, y: touch.clientY };
        goToPrev();
      }
    }
  }, [isLocked, isMobile, goToNext, goToPrev]);

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
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
    },
    snapToIndex,
    anglePerProduct,
    getFocusedIndex,
    goToNext,
    goToPrev,
  };
}

export default useArcRotation;
