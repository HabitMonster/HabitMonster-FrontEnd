import { useState, useEffect, useCallback } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { addHabitApis } from '../api';
import { OK } from '../constants/statusCode';

export default function useFetchCategoryPresets() {
  const [presets, setPresets] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState(false);
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
  }, []);

  const onPresetChosen = useCallback((presetId) => {
    setSelectedPresetId(presetId);
  }, []);

  const onPresetSaved = useCallback(async () => {
    try {
      const { data } = await addHabitApis.saveHabitWithPreset(selectedPresetId);
      if (data.statusCode === OK) {
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
