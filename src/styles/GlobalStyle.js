import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset};

  :root {
    /* Color */
    --color-white: #ffffff;
    --color-gray: #999999;
    --color-black: #000000;
    --color-login-bg: #27173f;
    --color-kakao: #fee500;
    --color-naver: #03c75a;
    --color-progressbar: #f0f0f0;
    --color-gauge: #7057fc;
    --color-layout: #eeeeee;
    --color-yellow: #fcec57;
    --color-purple: #7057fc;


    /* Font name */
    --font-name-apple: 'Apple SD Gothic Neo';

    /* Font size */
    --font-large: 48px;
    --font-medium: 28px;
    --font-semi-medium: 24px;
    --font-regular: 18px;
    --font-small: 16px;
    --font-micro: 14px;
    --font-nano: 12px;

    /* Font weight */
    --weight-heavy-bold: 900;
    --weight-bold: 700;
    --weight-semi-bold: 600;
    --weight-regular: 500;
    --weight-semi-regular: 400;

    /* Size */
    --size-border-radius: 6px;
    --border-radius-progress: 10px;
    --border-radius-checkBtn: 20px;

    /* Animation Duration */
    --animation-duration: 200ms;
    }

    * {
      box-sizing: border-box;
    }
`;

export default GlobalStyle;
