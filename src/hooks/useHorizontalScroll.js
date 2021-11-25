import { useEffect, useState, useCallback } from 'react';

const useClientRect = () => {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node);
    }
  }, []);
  return [rect, ref];
};

export const useHorizontalScroll = () => {
  const [Rect, elementRef] = useClientRect();

  useEffect(() => {
    const element = Rect;

    if (element) {
      const onScrollWheel = (e) => {
        if (e.deltaY === 0) {
          return;
        }

        if (
          !(element.scrollLeft === 0 && e.deltaY < 0) &&
          !(
            element.scrollWidth -
              element.clientWidth -
              Math.round(element.scrollLeft) ===
              0 && e.deltaY > 0
          )
        ) {
          e.preventDefault();
        }

        element.scrollTo({
          left: element.scrollLeft + e.deltaY,
          behavior: 'smooth',
        });
      };

      element.addEventListener('wheel', onScrollWheel);
      return () => element.removeEventListener('wheel', onScrollWheel);
    }
  }, [Rect]);

  return elementRef;
};
