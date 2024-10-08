import { useEffect } from 'react';

interface MutationObserverOptions {
  attributes?: boolean;
  characterData?: boolean;
  childList?: boolean;
  subtree?: boolean;
}

export default function useMutationObserver(
  ref: React.RefObject<Element>,
  callback: MutationCallback,
  options: MutationObserverOptions = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) {
  useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [callback, options, ref]);
}
