import { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {
  habitIdListState,
  defaultHabitsState,
  myHabitCountState,
} from '../recoil/states/habit';

import { addHabitApis } from '../api';
import { OK } from '../constants/statusCode';

export default function useHabitPresets() {
  const [presets, setPresets] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState(false);
  const [habitIdList, setHabitIdList] = useRecoilState(habitIdListState);
  const [habits, setHabits] = useRecoilState(defaultHabitsState);
  const [totalHabitCount, setTotalHabitCount] =
    useRecoilState(myHabitCountState);
  const { categoryId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function getHabitPresetFromServer() {
      try {
        const { data } = await addHabitApis.getHabitPreset(categoryId);

        if (data.statusCode === OK) {
          setPresets(data.preSets);
        }
      } catch (error) {
        console.error(error);
      }
    }

    getHabitPresetFromServer();
  }, [categoryId]);

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
      history.replace('/');
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
