import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = "", style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={`${className} flex flex-wrap justify-center`} style={style}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        return (
          <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />
        );
      })}
    </p>
  );
};

interface WordProps {
  word: string;
  progress: any;
  range: [number, number];
}

const Word: React.FC<WordProps> = ({ word, progress, range }) => {
  const characters = word.split("");
  const amount = range[1] - range[0];
  const step = amount / characters.length;
  
  return (
    <span className="relative mr-[0.25em] mt-[0.25em]">
      {characters.map((char, i) => {
        const start = range[0] + (step * i);
        const end = range[0] + (step * (i + 1));
        return (
          <Character key={i} char={char} progress={progress} range={[start, end]} />
        );
      })}
    </span>
  );
};

interface CharacterProps {
  char: string;
  progress: any;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  
  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span 
        style={{ opacity }} 
        className="absolute left-0 top-0"
      >
        {char}
      </motion.span>
    </span>
  );
};
