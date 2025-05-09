import { cn } from "@/_helpers/cn"
import { HTMLAttributes } from "react"

type GroupProps = HTMLAttributes<HTMLDivElement> & {
  justify?: "start" | "center" | "end" | "between"
  align?: "start" | "center" | "end"
  gap?: string
}

export function Group({
  children,
  className,
  justify = "start",
  align = "start",
  gap = "gap-2",
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

  return (
    <div className={cn(
      "flex",
      "flex-wrap",
      justifyClass,
      alignClass,
      gap,
      className
    )}
      {...props}
    >
      {children}
    </div>
  )
}
