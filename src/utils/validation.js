import { MAX_MONSTER_NAME_LENGTH } from '../constants/validation';

const isCharacterEnglish = (char) => {
  const ascii = char.charCodeAt(0);
  return (ascii >= 97 && ascii <= 122) || (ascii >= 65 && ascii <= 90);
};

const isCharacterNumber = (char) => {
  const ascii = char.charCodeAt(0);
  return ascii >= 48 && ascii <= 57;
};

export const validateMonsterName = (name) => {
  if (name.length > MAX_MONSTER_NAME_LENGTH) {
    return false;
  }

  for (const char of name) {
    const koreanRegex = /[\u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3]/g;

    if (
      !koreanRegex.test(char) &&
      !isCharacterEnglish(char) &&
      !isCharacterNumber(char)
    ) {
      return false;
    }
  }
  return true;
};
