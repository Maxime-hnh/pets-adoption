'use client';

import { cn } from '@/_lib/cn';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { useRef, useState, useLayoutEffect } from 'react';

type Option = {
  label: string;
  value: string;
};

type SegmentedControlProps = {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
};

function SegmentedControl({
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [thumbStyle, setThumbStyle] = useState<React.CSSProperties>({});

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const selected = container.querySelector(`[data-state="on"]`) as HTMLElement;
    if (selected) {
      requestAnimationFrame(() => {
        setThumbStyle({
          width: selected.offsetWidth,
          transform: `translateX(${selected.offsetLeft}px)`,
        });
      });
    }
  }, [value, options]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative inline-flex items-center rounded-md border bg-muted px-1',
        className
      )}
    >
      {/* Thumb animé */}
      <div
        className="absolute top-1 left-1 h-[calc(100%-0.5rem)] rounded-md bg-primary transition-transform duration-250 ease-out"
        style={thumbStyle}
      />
      <ToggleGroup.Root
        type="single"
        value={value}
        onValueChange={(val) => val && onChange(val)}
        className="relative z-10 flex w-full items-center"
      >
        {options.map((option) => (
          <ToggleGroup.Item
            key={option.value}
            value={option.value}
            className={cn(
              'relative flex-1 z-10 px-4 py-2 text-sm font-medium rounded-md transition-colors cursor-pointer',
              'data-[state=on]:text-white data-[state=off]:text-muted-foreground'
            )}
          >
            {option.label}
          </ToggleGroup.Item>
        ))}
      </ToggleGroup.Root>
    </div>
  );
}

export { SegmentedControl }