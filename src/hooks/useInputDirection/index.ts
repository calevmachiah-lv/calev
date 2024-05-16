import { useCallback, useEffect } from 'react';
import { isRTLCharacter } from '../../utils/function/functions';

export const useInputDirection = ({
  inputRef,
}: {
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const value = inputRef.current?.value;

  const setRTLDirection = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.direction = 'rtl';
    }
  }, [inputRef]);

  const setLTRDirection = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.style.direction = 'ltr';
    }
  }, [inputRef]);

  useEffect(() => {
    if (value) {
      if (isRTLCharacter(value?.[0])) {
        setRTLDirection();
      } else {
        setLTRDirection();
      }
    }
  }, [value, inputRef, setRTLDirection, setLTRDirection]);
};

export default useInputDirection;
