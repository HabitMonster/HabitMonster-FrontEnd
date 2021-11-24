import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

import { statisticApi } from '../../api';

import { GlobalListItem } from './';

const GlobalStatistics = () => {
  //const [statisticList, setStatisticList] = useState([]);

  // const getGlobalStatistic = useCallback(async () => {
  //   try {
  //     const { data } = await statisticApi.getGlobalStatistics();
  //     if (data.status === 200) {
  //       console.log('globalData', data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getGlobalStatistic();
  // }, [getGlobalStatistic]);

  const statisticsList = [
    {
      content: '가장 많은 감점을 받은 카테고리는?',
      value: '관계',
    },
    {
      content: '지난 달 성공된 습관의 총 개수',
      value: '144',
    },
    {
      content: '지난 달 운동 카테고리의 평균 성공률',
      value: '50%',
    },
    {
      content: '지난 달 가장 많이 선택된 카테고리는?',
      value: '기타',
    },
    {
      content: '사람들이 평균적으로 유지하고 있는 습관 수',
      value: '16',
    },
  ];

  return (
    <GlobalContainer>
      <GlobalStatisticList>
        {statisticsList.map((data) => {
          return <GlobalListItem key={data.value} data={data} />;
        })}
      </GlobalStatisticList>
    </GlobalContainer>
  );
};

export default GlobalStatistics;

const GlobalContainer = styled.div`
  background-color: var(--bg-wrapper);
  width: 100%;
  /* height: calc(100% - (80px + 64px)); */
`;

const GlobalStatisticList = styled.ul`
  color: var(--color-primary);
  margin: 0;
  padding: 0;
`;
