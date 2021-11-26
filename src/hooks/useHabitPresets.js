import { useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  habitIdListState,
  defaultHabitsState,
  myHabitCountState,
  presetListSelector,
} from '../recoil/states/habit';

import { addHabitApis } from '../api';
import { OK } from '../constants/statusCode';

export default function useHabitPresets() {
  const [selectedPresetId, setSelectedPresetId] = useState(false);
  const [habitIdList, setHabitIdList] = useRecoilState(habitIdListState);
  const [habits, setHabits] = useRecoilState(defaultHabitsState);
  const [totalHabitCount, setTotalHabitCount] =
    useRecoilState(myHabitCountState);
  const { categoryId } = useParams();
  const presets = useRecoilValue(presetListSelector(categoryId));
  const history = useHistory();

  const onPresetChosen = useCallback((presetId) => {
    setSelectedPresetId(presetId);
  }, []);

  const currentDay = new Date().getDay() === 0 ? 7 : new Date().getDay();

  const onPresetSaved = async () => {
    try {
      const { data } = await addHabitApis.saveHabitWithPreset(selectedPresetId);
      console.log(data);

      if (
        data.statusCode === OK &&
        data.habit.practiceDays.includes(String(currentDay))
      ) {
        setHabitIdList([data.habit.habitId, ...habitIdList]);
        setHabits([data.habit, ...habits]);
        console.log('zc');
      }
      setTotalHabitCount(totalHabitCount + 1);
      // 버그가 일어날 가능성이 있지만..
      // 동기적으로 리코일 업데이트가 모두 끝난 다음에 히스토리를 보낸다.
      setTimeout(() => {
        history.replace('/');
      }, 0);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    presetList: presets,
    selectedPresetId,
    onPresetClicked: onPresetChosen,
    onSaveButtonClicked: onPresetSaved,
  };
}
