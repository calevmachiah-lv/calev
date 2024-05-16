import { useEffect } from 'react';
interface propsType {
  element: HTMLCanvasElement | null | undefined;
  callback: any;
  options?: any;
}
const useMutationObserver = ({
  element,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  },
}: propsType) => {
  useEffect(() => {
    if (element) {
      const observer = new MutationObserver (function (mutationsList, observer) {
      for (const mutation of mutationsList) {
        const { type, attributeName , target} = mutation;
       
        if (type == 'attributes' && attributeName == 'style') {
          if (element.style.width!=="1px"){
            callback()
            }
        }
      }
    });
      observer.observe(element, options);
      return () => observer.disconnect();
    }
  }, [callback, options]);
};

export default useMutationObserver