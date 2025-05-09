import { cn } from "@/_helpers/cn"
import { HTMLAttributes } from "react"

type StackProps = HTMLAttributes<HTMLDivElement> & {
  justify?: "start" | "center" | "end" | "between"
  align?: "start" | "center" | "end"
  gap?: string // ex: 'gap-4', 'gap-y-6', etc.
}

export function Stack({
  children,
  className,
  justify = "start",
  align = "start",
  gap = "gap-4",
  ...props
}: StackProps) {

  const justifyClass = {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
  }[justify]

  const alignClass = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  }[align]


  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        alignClass,
        justifyClass,
        gap,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
