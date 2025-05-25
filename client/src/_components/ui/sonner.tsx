"use client"

import { Toaster as Sonner, ToasterProps } from "sonner"
import { useEffect, useState } from "react"

const Toaster = (props: ToasterProps) => {

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const html = document.documentElement;
    const current = html.classList.contains('dark') ? 'dark' : 'light';
    setTheme(current);
  }, []);
  
  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
