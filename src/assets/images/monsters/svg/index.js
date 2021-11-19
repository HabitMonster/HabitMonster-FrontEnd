import { ReactComponent as BlueMonsterIcon } from './blue.svg';
import { ReactComponent as GreenMonsterIcon } from './green.svg';
import { ReactComponent as OrangeMonsterIcon } from './orange.svg';
import { ReactComponent as PinkMonsterIcon } from './pink.svg';
import { ReactComponent as RedMonsterIcon } from './red.svg';
import { ReactComponent as YellowMonsterIcon } from './yellow.svg';

export {
  BlueMonsterIcon,
  GreenMonsterIcon,
  OrangeMonsterIcon,
  PinkMonsterIcon,
  RedMonsterIcon,
  YellowMonsterIcon,
};

const levelOneMonsters = {
  1: {
    component: GreenMonsterIcon,
  },
  6: {
    component: PinkMonsterIcon,
  },
  11: {
    component: BlueMonsterIcon,
  },
  16: {
    component: YellowMonsterIcon,
  },
  21: {
    component: OrangeMonsterIcon,
  },
  26: {
    component: RedMonsterIcon,
  },
};

export default levelOneMonsters;
