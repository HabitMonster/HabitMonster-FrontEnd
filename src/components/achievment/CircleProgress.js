import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// Reference: https://wit.nts-corp.com/2021/04/23/6338
function CircleProgress({ width, height, strokeWidth = 12, title, value }) {
  const circleX = useMemo(() => width / 2, [width]);
  const circleY = useMemo(() => height / 2, [height]);
  const circleRadius = useMemo(() => circleX - strokeWidth, []);
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
        <DetailTitle>{title}</DetailTitle>
        <DetailValue>{value * 100}</DetailValue>
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
  /* rotate로 시작점을 12시로 바꿔준다 */
  transform: rotate(-90deg);
`;

const CircleSvg = styled.circle`
  fill: none;
  stroke: ${({ type }) => (type === 'progress' ? '#492cf1' : '#efefef')};
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
const DetailTitle = styled.p`
  color: #9d95ca;
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 5px;
`;
const DetailValue = styled.p`
  color: #492cf1;
  font-size: 36px;
  font-weight: bold;
`;

CircleProgress.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  strokeWidth: PropTypes.strokeWidth,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};
