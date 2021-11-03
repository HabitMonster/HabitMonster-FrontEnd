import { useState, useCallback } from 'react';

export default function useDateRange() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [helperText, setHelperText] = useState('날짜');

  const onButtonClick = useCallback((type, [fromDate, endDate] = []) => {
    if (type === 'save') {
      setStart(fromDate);
      setEnd(endDate);
      setHelperText(`${fromDate} ~ ${endDate}`);
    }
  }, []);

  return [start, end, helperText, onButtonClick];
}
