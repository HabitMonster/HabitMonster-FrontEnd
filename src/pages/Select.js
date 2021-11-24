import React, { useState } from 'react';
import {
  LevelOneMonstersDisplay,
  LevelOneMonsterForm,
} from '../components/monster';
import FirstLoginUserGuide from '../components/onBoard/FirstLoginUserGuide';

//* 각 컴포넌트마다 주석 달았습니다.

const Select = () => {
  const [step, setStep] = useState(1);
  const goNextStep = () => setStep((prev) => prev + 1);

  switch (step) {
    case 1: {
      return <LevelOneMonstersDisplay go={goNextStep} />;
    }
    case 2: {
      return <LevelOneMonsterForm showGuide={goNextStep} />;
    }
    case 3: {
      return <FirstLoginUserGuide />;
    }
    default:
      return null;
  }
};

export default Select;
