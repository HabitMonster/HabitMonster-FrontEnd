import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { addHabitApis } from '../api';
import { OK, FORBIDDEN } from '../constants/statusCode';

export default function useFetchCategories() {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getCategoryListFromServer() {
      try {
        const { data } = await addHabitApis.getCategoryList();
        if (data.statusCode === OK) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === FORBIDDEN) {
          history.replace('/login');
        }
        history.replace('/');
      }
    }

    getCategoryListFromServer();
  }, [history]);

  return categories;
}
