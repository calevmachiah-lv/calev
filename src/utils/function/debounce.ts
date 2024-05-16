type DebouncedFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void;

// export const debounce = (func, delay:number) => {
//   let timeoutId;
//   return function (...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(this, args), delay);
//   };
// };

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): DebouncedFunction<T> => {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>): void => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};
