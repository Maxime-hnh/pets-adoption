// @/_hooks/useCarouselDots.ts
import { useEffect, useCallback, useState } from "react"

export function useCarouselDots(emblaApi: any | undefined) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  const onInit = useCallback((api: any) => {
    setScrollSnaps(api.scrollSnapList())
  }, [])

  const onSelect = useCallback((api: any) => {
    setSelectedIndex(api.selectedScrollSnap())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onInit(emblaApi)
    onSelect(emblaApi)
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect)
  }, [emblaApi, onInit, onSelect])

  return { selectedIndex, scrollSnaps, onDotButtonClick }
}
