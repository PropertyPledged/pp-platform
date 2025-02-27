import { useRef, useState, useEffect, type RefObject } from "react";

/**
 * @name useElementWidth
 * @description A hook that returns the width of an element
 * @returns { ref, width }
 * @example
 * const { ref, width } = useElementWidth();
 * return <div ref={ref}>{width}</div>;
 */
function useElementWidth<T extends HTMLElement>(): {
  ref: RefObject<T>;
  width: number | undefined;
} {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    setWidth(element.offsetWidth);

    // create an observer instance
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      const observedWidth = entries[0].target.clientWidth;
      setWidth(observedWidth);
    });

    // start observing the target element
    observer.observe(element);

    // clean up
    return () => observer.disconnect();
  }, []);
  return { ref, width };
}

export default useElementWidth;
