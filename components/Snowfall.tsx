import React, { useEffect, useState } from 'react';

interface SnowflakeProps {
  id: number;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

const SingleFlake: React.FC<SnowflakeProps> = ({ left, duration, delay, size }) => {
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseEnter = () => {
    setIsPaused(true);
    // Resume animation after 1.5 seconds
    setTimeout(() => {
      setIsPaused(false);
    }, 1500);
  };

  return (
    <div
      className="snowflake select-none"
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseEnter} // Support touch devices
      style={{
        left: `${left}%`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        fontSize: `${size}rem`,
        pointerEvents: 'auto', // Override CSS to allow hover events
        animationPlayState: isPaused ? 'paused' : 'running',
        zIndex: 5, // Ensure they are slightly above the background gradient but handled by parent z-index mostly
      }}
    >
      ❄
    </div>
  );
};

const Snowfall: React.FC = () => {
  const [flakes, setFlakes] = useState<SnowflakeProps[]>([]);

  useEffect(() => {
    // Generate snowflakes on mount
    const count = 50;
    const newFlakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position %
      duration: Math.random() * 5 + 5, // Random duration between 5s and 10s
      delay: Math.random() * 5, // Random delay
      size: Math.random() * 1.5 + 0.5, // Random size
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {flakes.map((flake) => (
        <SingleFlake key={flake.id} {...flake} />
      ))}
    </div>
  );
};

export default Snowfall;