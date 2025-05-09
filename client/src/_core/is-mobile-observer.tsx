"use client"

import { MOBILE_SIZE } from "@/_helpers/constants";
import { useUIStore } from "@/_stores/ui.store"
import { useEffect } from "react";

export default function IsMobileObserver() {

  const setIsMobile = useUIStore((state) => state.setIsMobile);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_SIZE - 1}px)`)

    const update = () => {
      const isMobile = window.innerWidth < MOBILE_SIZE
      setIsMobile(isMobile)

      if (isMobile) {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      } else {
        document.documentElement.style.removeProperty('--vh')
      }
    }

    mql.addEventListener('change', update)

    update()

    return () => mql.removeEventListener('change', update)
  }, [setIsMobile])

  return null;
}