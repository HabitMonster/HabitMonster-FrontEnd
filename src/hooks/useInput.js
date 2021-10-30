import { useState, useCallback } from 'react';

export default function useInput() {
  const [state, setState] = useState('');
  const onStateChanged = useCallback((event) => {
    setState(event.target.value);
  }, []);

  return [state, onStateChanged];
}
