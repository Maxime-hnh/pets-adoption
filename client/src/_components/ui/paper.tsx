import { cn } from "@/_lib/cn"
import { HTMLAttributes } from "react"

type PaperProps = HTMLAttributes<HTMLDivElement> & {
  p?: "xs" | "sm" | "md" | "lg" | "xl",
  shadow?: "xs" | "sm" | "md" | "lg" | "xl",
  radius?: "xs" | "sm" | "md" | "lg" | "xl",
  border?: "border"
}

export function Paper({
  children,
  className,
  p = "lg",
  shadow = "sm",
  radius = "md",
  border = "border",
  ...props
}: PaperProps) {

  const paddingClass = {
    xs: "p-2",
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
    xl: "p-8"
  }[p]

  const shadowClass = {
    xs: "shadow-xs",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl"
  }[shadow]

  const radiusClass = {
    xs: "rounded-xs",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl"
  }[radius]

  const borderClass = {
    border: "border"
  }

  return (
    <div
      className={cn(
        "bg-background",
        shadowClass,
        radiusClass,
        paddingClass,
        borderClass,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}