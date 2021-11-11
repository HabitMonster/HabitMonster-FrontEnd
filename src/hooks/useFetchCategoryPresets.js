import { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { addHabitApis } from '../api';
import { OK } from '../constants/statusCode';
import { habitsState } from '../recoil/states/habit';
import {
  getPresetDurationStart,
  getPresetDurationEnd,
} from '../utils/getDuration';

export default function useFetchCategoryPresets() {
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

  const onPresetSaved = useCallback(async () => {
    try {
      const { data } = await addHabitApis.saveHabitWithPreset(selectedPresetId);

      if (data.statusCode === OK) {
        const originHabitList = habitList.slice();
        const selectedPresetIndex = presets.findIndex((preset) => {
          return preset.presetId === selectedPresetId;
        });
        const selectedPreset = presets[selectedPresetIndex];
        const durationStart = getPresetDurationEnd();
        const durationEnd = getPresetDurationStart();

        setHabitList([
          ...originHabitList,
          {
            ...selectedPreset,
            durationStart,
            durationEnd,
            achievePercentage: 0,
            current: 0,
            isAccomplished: false,
          },
        ]);
        history.replace('/');
      }
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
