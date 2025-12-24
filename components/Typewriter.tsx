import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50, className = '', onComplete, startDelay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Fix: Use ReturnType<typeof setInterval> instead of NodeJS.Timeout to avoid namespace errors
    let timer: ReturnType<typeof setInterval>;
    
    const startTyping = () => {
      setStarted(true);
      let index = 0;
      timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(timer);
          if (onComplete) onComplete();
        }
      }, speed);
    };

    if (startDelay > 0) {
      const delayTimer = setTimeout(startTyping, startDelay);
      return () => {
        clearTimeout(delayTimer);
        clearInterval(timer);
      };
    } else {
      startTyping();
      return () => clearInterval(timer);
    }
  }, [text, speed, startDelay, onComplete]);

  return <p className={`whitespace-pre-line ${className}`}>{displayedText}</p>;
};

export default Typewriter;