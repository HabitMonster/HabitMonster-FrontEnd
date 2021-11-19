import { ReactComponent as GreenLevelOne } from './green_1.svg';
import { ReactComponent as GreenLevelTwo } from './green_2.svg';
import { ReactComponent as GreenLevelThree } from './green_3.svg';
import { ReactComponent as GreenLevelFour } from './green_4.svg';
import { ReactComponent as GreenLevelFive } from './green_5.svg';

import { ReactComponent as PinkLevelOne } from './pink_1.svg';
import { ReactComponent as PinkLevelTwo } from './pink_2.svg';
import { ReactComponent as PinkLevelThree } from './pink_3.svg';
import { ReactComponent as PinkLevelFour } from './pink_4.svg';
import { ReactComponent as PinkLevelFive } from './pink_5.svg';

import { ReactComponent as YellowLevelOne } from './yellow_1.svg';
import { ReactComponent as YellowLevelTwo } from './yellow_2.svg';
import { ReactComponent as YellowLevelThree } from './yellow_3.svg';
import { ReactComponent as YellowLevelFour } from './yellow_4.svg';
import { ReactComponent as YellowLevelFive } from './yellow_5.svg';

const monsters = [
  {
    id: 1,
    component: GreenLevelOne,
  },
  {
    id: 2,
    component: GreenLevelTwo,
  },
  {
    id: 3,
    component: GreenLevelThree,
  },
  {
    id: 4,
    component: GreenLevelFour,
  },
  {
    id: 5,
    component: GreenLevelFive,
  },
  {
    id: 6,
    component: PinkLevelOne,
  },
  {
    id: 7,
    component: PinkLevelTwo,
  },
  {
    id: 8,
    component: PinkLevelThree,
  },
  {
    id: 9,
    component: PinkLevelFour,
  },
  {
    id: 10,
    component: PinkLevelFive,
  },
  {
    id: 16,
    component: YellowLevelOne,
  },
  {
    id: 17,
    component: YellowLevelTwo,
  },
  {
    id: 18,
    component: YellowLevelThree,
  },
  {
    id: 19,
    component: YellowLevelFour,
  },
  {
    id: 20,
    component: YellowLevelFive,
  },
];

export const levelOneMonsters = monsters.filter(({ id }) => id % 5 === 1);
export const greenMonsters = monsters.slice(0, 5);
export const pinkMonsters = monsters.slice(5, 10);

// SVG 전부 나와야 아래 변수 선언문이 올바르게 작동함.
// export const blueMonsters = monsters.slice(10, 15);
// export const yellowMonsters = monsters.slice(15, 20);
// export const orangeMonsters = monsters.slice(20, 25);
// export const redMonsters = monsters.slice(25, 30);

export default monsters;
