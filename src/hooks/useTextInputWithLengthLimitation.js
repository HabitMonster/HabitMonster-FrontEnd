import { useState, useCallback } from 'react';

// initialText: String
// limitationLength: Number

export default function useTextInputWithLengthLimitation({
  initialText,
  limitationLength,
}) {
  const [value, setValue] = useState(
    initialText.length >= limitationLength ? '' : initialText,
  );

  const isValidated = value.length < limitationLength;

  const onValueChanged = useCallback((nextValue) => {
    if (nextValue.length > limitationLength) {
      return;
    }
    setValue(nextValue);
  }, []);

  return [value, isValidated, onValueChanged];
}
