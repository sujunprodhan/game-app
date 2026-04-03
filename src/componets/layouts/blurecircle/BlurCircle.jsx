import React from 'react';

const BlurCircle = ({ top = 'auto', left = 'auto' }) => {
  return (
    <div
      className="absolute -z-50 h-80 w-70 rounded-full blur-3xl opacity-70"
      style={{
        top,
        left,
        background: 'radial-gradient(circle, rgba(236,72,153,0.8), transparent 70%)',
      }}
    />
  );
};

export default BlurCircle;
