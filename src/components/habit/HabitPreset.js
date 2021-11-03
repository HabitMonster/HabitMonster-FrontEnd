import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams, useLocation, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { BackButtonHeader } from '../common';
import PresetItem from './PresetItem';

import A from '../testing';

const HabitPreset = ({ category }) => {
  const [presets, setPresets] = useState([]);
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  const { state: selectedHabitCategory } = useLocation();
  const history = useHistory();
  const { categoryId } = useParams();

  useEffect(() => {
    A.get(`/categories/${categoryId}/presets`)
      .then(({ data: { preSets } }) => {
        setPresets(preSets);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSaveButtonClick = async () => {
    const { data } = await A.post(`/presets/${selectedPresetId}`);
    if (data.statusCode === 200) {
      history.replace('/');
    }
  };

  if (!selectedHabitCategory) {
    return <Redirect to="/new" />;
  }

  return (
    <>
      <Wrapper>
        <div style={{ marginTop: '44px', marginBottom: '26px' }}>
          <BackButtonHeader
            pageTitleText={category.name}
            onButtonClick={() => history.replace('/new')}
          />
        </div>
        <HelperText>추천 습관</HelperText>
        {presets.map(
          ({ count, description, period, practiceDays, title, presetId }) => (
            <PresetItem
              key={presetId}
              frequency={count}
              description={description}
              period={period}
              days={practiceDays}
              title={title}
              id={presetId}
              onClick={() => setSelectedPresetId(presetId)}
            />
          ),
        )}
        <button
          onClick={() =>
            history.push({
              pathname: 'detail',
              state: selectedHabitCategory,
            })
          }
        >
          직접 작성하기
        </button>
      </Wrapper>
      <ChooseButton onClick={handleSaveButtonClick}>저장하기</ChooseButton>
    </>
  );
};

HabitPreset.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 16px;
`;

const HelperText = styled.h2`
  color: #1a202c;
  font-size: 22px;
  line-height: 26px;
  font-weight: var(--weight-bold);
`;

const ChooseButton = styled.button`
  position: absolute;
  bottom: 0;
  z-index: 2;
  width: 100%;
  height: 64px;
  background: var(--color-purple);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--weight-bold);
  color: var(--color-white);
  font-size: 20px;
  line-height: 24px;
  border: none;
`;

export default HabitPreset;
