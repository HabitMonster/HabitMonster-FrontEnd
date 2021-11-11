import { useEffect, useState } from 'react';
import { habitApis } from '../api';
import { OK } from '../constants/statusCode';

const useFetchHabitDetail = (habitId) => {
  const [habitDetail, setHabitDetail] = useState([]);

  useEffect(() => {
    const getHabitDetail = async () => {
      try {
        const { data } = await habitApis.getHabitDetail(habitId);
        if (data.statusCode === OK) {
          setHabitDetail(data.habitDetail);
        }
      } catch (error) {
        console.error(error.response);
        throw error;
      }
    };
    getHabitDetail();
  }, []);
  return habitDetail;
};

export default useFetchHabitDetail;
