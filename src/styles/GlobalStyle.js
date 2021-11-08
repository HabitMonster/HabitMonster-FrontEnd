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
    --color-progressbar: #f0f0f0;
    --color-layout: #eeeeee;
    --color-yellow: #fcec57;
    --color-title: #333333;
    --color-grey01: #131313;
    --color-deemed: #999999;
    --color-main: #7057fc;
    --color-subtext2: #868686;
    --color-deemed2: #E8E8E8;
    --color-detail: #f7f5ff;

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

    /* SEMYUNG: Font Size*/
    

    /* Font weight */
    --weight-heavy-bold: 900;
    --weight-extra-bold: 800;
    --weight-bold: 700;
    --weight-semi-bold: 600;
    --weight-regular: 500;
    --weight-semi-regular: 400;

    /* SEMYUNG: Font Weight */
    --font-extraLight: 200;
    --font-light: 300;
    --font-normal: 400;
    --font-medium: 500;
    --font-semiBold: 600;
    --font-bold: 700;
    --font-extraBold: 800;
    --font-heavy: 900;


    /* Size */
    --size-border-radius: 6px;
    --border-radius-progress: 10px;
    --border-radius-checkBtn: 20px;

    /* Animation Duration */
    --animation-duration: 200ms;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }
`;

export default GlobalStyle;
