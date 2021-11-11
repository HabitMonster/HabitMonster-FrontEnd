import { useEffect, useState } from 'react';

const useFormatDuration = (duration) => {
  const [formattedDuration, setFormattedDuration] = useState(duration);
  useEffect(() => {
    setFormattedDuration(
      `${new Date(duration).getMonth()}.${new Date(duration).getDate()}`,
    );
  }, []);
  return formattedDuration;
};

export default useFormatDuration;
