import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  :root {
    /* Color */
    --color-white: #ffffff;
    --color-black: #000000;
    --color-login-bg: #27173f;
    --color-kakao: #fee500;
    --color-naver: #03c75a;

    /* Font size */
    --font-large: 48px;
    --font-medium: 28px;
    --font-regular: 18px;
    --font-small: 16px;
    --font-micro: 14px;

    /* Font weight */
    --weight-heavy-bold: 900;
    --weight-bold: 700;
    --weight-semi-bold: 600;
    --weight-regular: 400;

    /* Size */
    --size-border-radius: 6px;

    /* Animation Duration */
    --animation-duration: 200ms;
    }
`;

export default GlobalStyle;
