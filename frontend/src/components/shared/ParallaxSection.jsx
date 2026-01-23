import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useResponsive } from '../../hooks/useResponsive';

const ParallaxSection = ({
  children,
  offset = 50,
  className = ""
}) => {
  const ref = useRef(null);
  const { isMobile } = useResponsive();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Reduce parallax movement on mobile for performance and usability
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isMobile ? [-offset/4, offset/4] : [-offset, offset]
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;
