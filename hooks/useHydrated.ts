import { useState, useEffect } from 'react';

export const useHydrated = () => {
  const [hydrated, setHydrated] = useState(false);
  //   useEffect(() => {
  //     setHydrated(true);
  //   }, []);
  useEffect(() => {
    // Виклик стає асинхронним, що прибирає попередження ESLint
    const handler = requestAnimationFrame(() => {
      setHydrated(true);
    });
    return () => cancelAnimationFrame(handler);
  }, []);

  return hydrated;
};
