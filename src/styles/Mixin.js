import { isMobile } from 'react-device-detect';
import { css } from 'styled-components';

export const whiteOpacity = (degree) => css`
  color: rgba(248, 248, 248, ${degree});
`;

export const loginBtnStyle = (colorType) => css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 300px;
  height: 45px;
  background-color: var(--color-${colorType});
  border-radius: var(--border-radius-checkBtn);
  cursor: pointer;
  font-size: var(--font-s);
`;

export const disappearScrollbar = () => css`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const determineViewPort = (isMobile) => css``;
