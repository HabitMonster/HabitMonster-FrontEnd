export const appendPostPosition = (name, type) => {
  const isEndWithConsonant = (name) => {
    const finalCharCode = name.charCodeAt(name.length - 1);
    const finalConsonantCode = (finalCharCode - 44032) % 28;
    return finalConsonantCode !== 0;
  };

  // return isEndWithConsonant(name) ? '은' : '는';
  return isEndWithConsonant(name) ? true : false;
};
