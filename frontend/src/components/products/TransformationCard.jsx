import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Play } from 'lucide-react';

const TransformationCard = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isHovering) {
        if (activeStep < steps.length - 1) {
            interval = window.setTimeout(() => {
                setActiveStep(prev => prev + 1);
            }, steps[activeStep].duration * 1000);
        }
    } else {
        // Reset when not hovering
        setActiveStep(0);
    }

    return () => clearTimeout(interval);
  }, [isHovering, activeStep, steps]);

  return (
    <div
        className="relative w-full aspect-[4/3] rounded-lg overflow-hidden group cursor-crosshair"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence mode='wait'>
        <motion.img
            key={activeStep}
            src={steps[activeStep].image}
            alt={steps[activeStep].label}
            initial={{ scale: 1.1, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0 }} // Don't scale exit for smoother look
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-t from-midnight-900/90 via-transparent to-transparent" />

      {/* Progress Indicators */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
          {steps.map((_, idx) => (
              <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gold-500"
                    initial={{ width: "0%" }}
                    animate={{ width: idx < activeStep ? "100%" : idx === activeStep && isHovering ? "100%" : "0%" }}
                    transition={{ duration: idx === activeStep ? steps[idx].duration : 0.3, ease: "linear" }}
                  />
              </div>
          ))}
      </div>

      {/* Label */}
      <div className="absolute bottom-6 left-6 z-20">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
              <div className="px-3 py-1 bg-gold-500 text-midnight-900 text-xs font-bold uppercase tracking-wider rounded-sm">
                  Stage 0{activeStep + 1}
              </div>
              <h4 className="text-xl font-bold text-white">{steps[activeStep].label}</h4>
          </motion.div>
      </div>

      {!isHovering && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/20 backdrop-blur-[2px]">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center text-white">
                  <Play className="ml-1 fill-white" size={24} />
              </div>
              <p className="absolute mt-24 text-white/80 text-sm font-medium tracking-widest uppercase">Hover to Process</p>
          </div>
      )}
    </div>
  );
};

export default TransformationCard;
