import { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useRecoilState } from 'recoil';
import { monsterSectionShirnkToggler } from '../recoil/states/ui';

import { miniThrottle } from '../utils/event';

export default function useShrinkEffect(parent) {
  const [shrink, setShrink] = useRecoilState(monsterSectionShirnkToggler);
  const scroller = useRef(null);
  const previousParentScrollTop = useRef(null);

  useEffect(() => {
    const { current } = scroller;

    if (!current || shrink) {
      return;
    }

    const parentElement = parent.current;

    const initializeParentScrollTop = () => {
      previousParentScrollTop.current = parentElement.scrollTop;
    };

    const getDifferenceOfScrollTop = miniThrottle(() => {
      const { current: previous } = previousParentScrollTop;
      const { scrollTop: current } = parentElement;

      if (current - previous >= 10) {
        setShrink(true);
        parentElement.removeEventListener(
          'touchstart',
          initializeParentScrollTop,
        );
        parentElement.removeEventListener(
          'touchmove',
          getDifferenceOfScrollTop,
        );
      }
    }, 25);

    const calculateScrollShirnk = miniThrottle(() => {
      if (parentElement.scrollTop >= 10) {
        setShrink(true);
        parentElement.removeEventListener('scroll', calculateScrollShirnk);
      }
    }, 25);

    if (isMobile) {
      parentElement.addEventListener('touchstart', initializeParentScrollTop);
      parentElement.addEventListener('touchmove', getDifferenceOfScrollTop);
      return;
    }

    parentElement.addEventListener('scroll', calculateScrollShirnk);

    return () => {
      if (isMobile) {
        parentElement.removeEventListener(
          'touchstart',
          initializeParentScrollTop,
        );
        parentElement.removeEventListener(
          'touchmove',
          getDifferenceOfScrollTop,
        );
        return;
      }

      parentElement.removeEventListener('scroll', calculateScrollShirnk);
    };
  }, [setShrink, shrink, parent]);

  return scroller;
}
