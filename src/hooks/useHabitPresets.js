import { useState, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  habitIdListState,
  habitListState,
  myHabitCountState,
  presetListById,
} from '../recoil/states/habit';

import { addHabitApis } from '../api';
import { OK } from '../constants/statusCode';

export default function useHabitPresets() {
  const [selectedPresetId, setSelectedPresetId] = useState(false);
  const [habitIdList, setHabitIdList] = useRecoilState(habitIdListState);
  const [habits, setHabits] = useRecoilState(habitListState);
  const [totalHabitCount, setTotalHabitCount] =
    useRecoilState(myHabitCountState);
  const { categoryId } = useParams();
  const presets = useRecoilValue(presetListById(categoryId));
  const history = useHistory();

  const onPresetChosen = useCallback((presetId) => {
    setSelectedPresetId(presetId);
  }, []);

  const currentDay = new Date().getDay() === 0 ? 7 : new Date().getDay();

  const onPresetSaved = async () => {
    try {
      const { data } = await addHabitApis.saveHabitWithPreset(selectedPresetId);

      if (
        data.statusCode === OK &&
        data.habit.practiceDays.includes(String(currentDay))
      ) {
        setHabitIdList([data.habit.habitId, ...habitIdList]);
        setHabits([data.habit, ...habits]);
      }
      setTotalHabitCount(totalHabitCount + 1);
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
