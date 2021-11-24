import { css } from 'styled-components';

// export const fontSize = (size) => css`
//   font-size: ${size};
// `;

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
