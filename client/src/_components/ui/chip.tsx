"use client"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/_lib/cn"
import useUncontrolled from "@/_hooks/useUncontrolled"

const chipVariants = cva(
  "cursor-pointer inline-flex items-center justify-center border font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-all duration-200 select-none",
  {
    variants: {
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-2 py-1 text-sm",
        lg: "px-2 py-1 text-md",
        xl: "px-2 py-1 text-lg"
      },
      rounded: {
        xs: "rounded-xs",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full"
      },
      variant: {
        filled: "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200",
        outline: "border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
        light: "border-transparent bg-indigo-50 text-indigo-700 hover:bg-indigo-100",
      },
      color: {
        indigo: "data-[checked]:bg-indigo-500 data-[checked]:text-white data-[checked]:hover:bg-indigo-600",
        emerald: "data-[checked]:bg-emerald-500 data-[checked]:text-white data-[checked]:hover:bg-emerald-600",
        red: "data-[checked]:bg-red-500 data-[checked]:text-white data-[checked]:hover:bg-red-600",
        yellow: "data-[checked]:bg-yellow-500 data-[checked]:text-white data-[checked]:hover:bg-yellow-600",
        purple: "data-[checked]:bg-[#5f2858] data-[checked]:text-white data-[checked]:hover:bg-[#5f2858]/80",
      }
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
      rounded: "sm",
      color: "indigo"
    },
  }
)

export interface ChipProps
  extends Omit<React.ComponentProps<"input">, "size" | "onChange">,
  VariantProps<typeof chipVariants> {
  /** Chip content */
  children: React.ReactNode;

  /** Controlled checked state */
  checked?: boolean;

  /** Default checked state for uncontrolled component */
  defaultChecked?: boolean;

  /** Called when checked state changes */
  onChange?: (checked: boolean) => void;

  /** Static id to connect input with label */
  id?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Input value */
  value?: string;

  /** Input name */
  name?: string;

  /** Use as child component */
  asChild?: boolean;

  /** Color variant */
  color?: "indigo" | "emerald" | "red" | "yellow" | "purple";
}

const Chip = React.forwardRef<HTMLInputElement, ChipProps>(
  ({
    className,
    variant,
    size,
    rounded,
    children,
    checked,
    defaultChecked,
    onChange,
    id,
    disabled,
    value,
    name,
    asChild = false,
    color = "indigo",
    ...props
  }, ref) => {
    const [_checked, handleChange] = useUncontrolled({
      value: checked,
      defaultValue: defaultChecked,
      finalValue: false,
      onChange,
    });

    const uuid = React.useId();
    const inputId = id || uuid;
    const Comp = asChild ? Slot : "label";

    return (
      <Comp
        htmlFor={inputId}
        className={cn(
          chipVariants({ variant, size, rounded, color }),
          className
        )}
        data-checked={_checked || undefined}
        data-disabled={disabled || undefined}
      >
        <input
          ref={ref}
          type="checkbox"
          id={inputId}
          className="sr-only"
          checked={_checked}
          onChange={(event) => handleChange(event.currentTarget.checked)}
          disabled={disabled}
          value={value}
          name={name}
          {...props}
        />
        <span className="pointer-events-none">
          {children}
        </span>
      </Comp>
    );
  }
);

Chip.displayName = "Chip";

export { Chip, chipVariants };