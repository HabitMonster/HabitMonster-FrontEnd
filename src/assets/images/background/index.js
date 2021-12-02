import clayPhone from './clay.webp';
import loading from './loading.webp';
import mainLevelOne from './main_1.webp';
import mainLevelTwo from './main_2.webp';
import mainLevelThree from './main_3.webp';
import mainLevelFour from './main_4.webp';
import mainLevelFive from './main_5.webp';
import popupBlue from './popupBlue.webp';
import popupRed from './popupRed.webp';
import popupYellow from './popupYellow.webp';
import webBackground from './web2.webp';
import cloudBackground from './web3.webp';

const background = {
  1: webBackground,
  2: clayPhone,
  3: loading,
  4: cloudBackground,
  5: popupRed,
  10: popupBlue,
  15: popupYellow,
  20: popupRed,
  25: popupBlue,
  30: popupYellow,
};

export const mainBackground = {
  1: mainLevelOne,
  2: mainLevelTwo,
  3: mainLevelThree,
  4: mainLevelFour,
  5: mainLevelFive,
};

export default background;
