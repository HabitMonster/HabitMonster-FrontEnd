import { useState, useCallback, useMemo } from 'react';
import { miniDebounce } from '../utils/event';

export default function useDebounceInput(initialState, wait) {
  const [value, setValue] = useState(() =>
    typeof initialState === 'function' ? initialState() : initialState,
  );
  const [debouncedValue, setDebouncedValue] = useState(value);

  const debounceChange = useMemo(
    () =>
      miniDebounce(function (nextValue) {
        setDebouncedValue(nextValue);
      }, wait),
    [wait],
  );

  const onValueChange = useCallback(
    (event) => {
      const nextValue = event.target.value;
      setValue(nextValue);
      debounceChange(nextValue);
    },
    [debounceChange],
  );

  return [value, debouncedValue, onValueChange, setValue];
}
