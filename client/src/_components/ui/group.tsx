import { cn } from "@/_helpers/cn"
import { HTMLAttributes } from "react"

type GroupProps = HTMLAttributes<HTMLDivElement> & {
  justify?: "start" | "center" | "end" | "between"
  align?: "start" | "center" | "end"
  gap?: string
  wrap?: "wrap" | "nowrap"
}

export function Group({
  children,
  className,
  justify = "start",
  align = "start",
  gap = "gap-2",
  wrap = "nowrap",
  ...props
}: GroupProps) {
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

  const wrapClass = {
    wrap: "flex-wrap",
    nowrap: "flex-nowrap"
  }

  return (
    <div className={cn(
      "flex",
      justifyClass,
      alignClass,
      wrapClass,
      gap,
      className
    )}
      {...props}
    >
      {children}
    </div>
  )
}
