"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...args: any[]) => twMerge(clsx(args));

const fontSize = 40;
const padding = 10;
const height = fontSize + padding;

interface CounterProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  fontSize?: number;
}

export const Counter = ({
  start = 0,
  end,
  duration = 2,
  className,
  fontSize = 30,
  ...rest
}: CounterProps) => {
  const [value, setValue] = useState(start);

  useEffect(() => {
    const stepTime = (duration * 1000) / (end - start);
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev < end) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, stepTime);

    return () => clearInterval(interval);
  }, [start, end, duration]);

  return (
    <div
      style={{ fontSize }}
      {...rest}
      className={cn(
        "flex overflow-hidden rounded px-2 leading-none text-primary font-bold",
        className
      )}
    >
      {value >= 100000 && <Digit place={100000} value={value} />}
      {value >= 10000 && <Digit place={10000} value={value} />}
      {value >= 1000 && <Digit place={1000} value={value} />}
      {value >= 100 && <Digit place={100} value={value} />}
      {value >= 10 && <Digit place={10} value={value} />}
      <Digit place={1} value={value} />
    </div>
  );
};

function Digit({ place, value }: { place: number; value: number }) {
  const currentDigit = Math.floor(value / place) % 10;
  const controls = useAnimation();

  useEffect(() => {
    const offset = -currentDigit * height;
    controls.start({ y: offset });
  }, [currentDigit, controls]);

  return (
    <div
      className="relative w-[1ch] h-[80px] tabular-nums overflow-hidden"
      style={{ height }}
    >
      <motion.div
        animate={controls}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
        className="absolute top-0 left-0 flex flex-col"
      >
        {[...Array(10)].map((_, i) => (
          <span
            key={i}
            className="flex items-center justify-center h-[80px]"
            style={{ height }}
          >
            {i}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
