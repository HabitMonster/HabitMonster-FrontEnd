import { useState, useCallback } from 'react';
import { convertYMD, getCurrentKST } from '../utils/date';

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

  const shouldAddRightNow = start === convertYMD(getCurrentKST());

  return [start, end, helperText, onButtonClick, shouldAddRightNow];
}
