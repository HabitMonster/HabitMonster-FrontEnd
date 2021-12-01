import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { setFontStyles } from '../../styles/Mixin';

function CircleProgress({ width, height, strokeWidth = 10, title, value }) {
  const circleX = useMemo(() => width / 2, [width]);
  const circleY = useMemo(() => height / 2, [height]);
  const circleRadius = useMemo(
    () => circleX - strokeWidth,
    [circleX, strokeWidth],
  );
  const circleDashArray = 2 * Math.PI * circleRadius;

  return (
    <CircleProgressContainer>
      <CircleProgressWrap
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        <CircleSvg
          cx={circleX}
          cy={circleY}
          r={circleRadius}
          strokeWidth={strokeWidth}
        />
        <CircleSvg
          cx={circleX}
          cy={circleY}
          r={circleRadius}
          strokeWidth={strokeWidth}
          strokeDashoffset={circleDashArray * (1 - value)}
          strokeDasharray={circleDashArray}
          type={'progress'}
        />
      </CircleProgressWrap>
      <DetailContainer>
        <DetailValue>
          {Math.round(value * 100)}
          <DetailPer>%</DetailPer>
        </DetailValue>
      </DetailContainer>
    </CircleProgressContainer>
  );
}

export default CircleProgress;

const CircleProgressContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const CircleProgressWrap = styled.svg`
  transform: rotate(-90deg);
`;

const CircleSvg = styled.circle`
  fill: none;
  stroke: ${({ type }) =>
    type === 'progress' ? 'var(--color-statistics)' : '#393939'};
  stroke-linecap: round;
`;

const DetailContainer = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 1;
`;

const DetailValue = styled.p`
  ${setFontStyles({
    color: 'primary',
    fontSize: 'xxxxl',
    fontWeight: 'regular',
    lineHeight: '52px',
  })}
`;

const DetailPer = styled.span`
  ${setFontStyles({
    color: 'primary-deemed',
    fontSize: 'xs',
    fontWeight: 'regular',
    lineHeight: '16px',
  })}
  margin-bottom: 5px;
  padding-left: 1px;
`;

CircleProgress.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  title: PropTypes.string,
  value: PropTypes.number.isRequired,
};
