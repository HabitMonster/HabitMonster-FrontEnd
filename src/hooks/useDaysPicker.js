import { useCallback } from 'react';

import { getRangeBetweenTwoDates } from '../utils/date';

export default function useDaysPicker(startDateString, endDateString) {
  const datesRange = getRangeBetweenTwoDates(startDateString, endDateString);
  const startDay = new Date(startDateString).getDay();
  const endDay = new Date(endDateString).getDay();

  // the days we request should start monday from index 0
  // this actually is bad for frontend btw :)
  // Because The Days start from 0(sunday) to 6(saturday) in javascript world.
  const [chosenDays, setChosenDays] = useState([1, 2, 3, 4, 5, null, null]);

  const chooseOneDay = useCallback((dayId) => {
    const chosenDaysCopy = chosenDays.slice();
    chosenDaysCopy[dayId - 1] = chosenDaysCopy[dayId - 1] ? null : dayId;
    setChosenDays(chosenDaysCopy);
  }, []);

  const toggleEveryday = useCallback(() => {
    setChosenDate(
      chosenDate.join('').length === 7
        ? [1, 2, 3, 4, 5, null, null]
        : [1, 2, 3, 4, 5, 6, 7],
    );
  }, []);

  const selectedDays = chosenDays.join('');
}
