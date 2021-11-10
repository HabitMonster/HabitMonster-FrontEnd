import { css } from 'styled-components';

export const fontSize = (size) => css`
  font-size: ${size};
`;

export const whiteOpacity = (degree) => css`
  color: rgba(248, 248, 248, ${degree});
`;
