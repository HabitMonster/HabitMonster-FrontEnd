import { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { addHabitApis } from '../api';
import { OK } from '../constants/statusCode';
import { habitsState } from '../recoil/states/habit';

export default function useHabitPresets() {
  const [presets, setPresets] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState(false);
  const { categoryId } = useParams();
  const history = useHistory();

  const [habitList, setHabitList] = useRecoilState(habitsState);

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
  }, []);

  const onPresetChosen = useCallback((presetId) => {
    setSelectedPresetId(presetId);
  }, []);

  const currentDay = new Date().getDay() === 0 ? 7 : new Date().getDay();

  const onPresetSaved = useCallback(async () => {
    try {
      const { data } = await addHabitApis.saveHabitWithPreset(selectedPresetId);

      // if the presets starts from now on(includes today in practiceDays)
      if (
        data.statusCode === OK &&
        data.habitDto.practiceDays.includes(String(currentDay))
      ) {
        const selectedPresetIndex = presets.findIndex((preset) => {
          return preset.presetId === selectedPresetId;
        });

        const defaultSettings = {
          category: presets[selectedPresetIndex].category,
          current: 0,
          isAccomplished: false,
          achievePercentage: 0,
        };

        const newHabit = { ...data.habitDto, ...defaultSettings };
        setHabitList([newHabit, ...habitList]);
      }
      history.replace('/');
    } catch (error) {
      console.error(error);
    }
  }, [selectedPresetId]);

  return {
    presetList: presets,
    selectedPresetId,
    onPresetClicked: onPresetChosen,
    onSaveButtonClicked: onPresetSaved,
  };
}
