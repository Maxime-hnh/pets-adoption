import { MOBILE_SIZE } from "@/_helpers/constants";
import { SCREEN_SIZE } from "@/_helpers/constants";
import React from "react";

export default function useWindowSize() {
  const isSSR = typeof window === "undefined";
  const [windowSize, setWindowSize] = React.useState({
    width: isSSR ? SCREEN_SIZE : window.innerWidth,
    height: isSSR ? MOBILE_SIZE : window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}