import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { statisticApi } from '../../api';

import { GlobalListItem } from './';

import { setFontStyles } from '../../styles/Mixin';

const GlobalStatistics = () => {
  const [statisticList, setStatisticList] = useState([]);

  const getGlobalStatistic = useCallback(async () => {
    try {
      const { data } = await statisticApi.getGlobalStatistics();
      if (data.statusCode === 200) {
        setStatisticList(data.statistics);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getGlobalStatistic();
  }, [getGlobalStatistic]);

  return (
    <GlobalContainer>
      <GlobalStatisticList>
        {statisticList?.length >= 0 &&
          statisticList.map((data) => {
            return <GlobalListItem key={data.value} data={data} />;
          })}
      </GlobalStatisticList>
      {statisticList?.length === null && (
        <EmptyPlace>
          <p>Global Statistics is Empty!</p>
        </EmptyPlace>
      )}
    </GlobalContainer>
  );
};

export default GlobalStatistics;

const GlobalContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
`;

const GlobalStatisticList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;

const EmptyPlace = styled.div`
  height: calc(100% - 120px);
  display: flex;
  justify-content: center;
  align-items: center;
  & p {
    ${setFontStyles({
      color: 'primary',
      fontSize: 'xs',
      fontWeight: 'semi-regular',
      lineHeight: '21px',
    })}
    opacity: 0.6;
  }
`;
