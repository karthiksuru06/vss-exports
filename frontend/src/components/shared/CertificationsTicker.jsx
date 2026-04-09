import React from 'react';

const CertificationsTicker = () => {
  // Mock certification logos - using text placeholders with premium styling for now
  const certs = ["APEDA Certified", "HACCP Certified", "FSSAI Registered"];

  return (
    <div className="bg-white py-12 border-y border-gray-100 overflow-hidden">
      <div className="relative flex overflow-x-hidden group">
        <div className="animate-scroll whitespace-nowrap flex gap-24 items-center">
            {/* Doubled for seamless loop */}
            {[...certs, ...certs, ...certs].map((cert, idx) => (
                <div key={idx} className="flex items-center gap-4 opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 cursor-pointer">
                    <div className="w-16 h-16 rounded-full border-2 border-midnight-800/20 flex items-center justify-center">
                        <span className="text-2xl">🏅</span>
                    </div>
                    <span className="text-xl font-serif font-bold text-midnight-800">{cert}</span>
                </div>
            ))}
        </div>

        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default CertificationsTicker;
