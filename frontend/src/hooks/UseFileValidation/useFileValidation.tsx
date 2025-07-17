import { useMemo } from 'react';

const MAX_SIZE_MB = 100;

export const useFileValidation = (file?: File) => {
  const result = useMemo(() => {
    if (!file) return { isTooLarge: false, sizeInMB: 0 };

    const sizeInMB = file.size / (1024 * 1024);
    const isTooLarge = sizeInMB > MAX_SIZE_MB;

    return { isTooLarge, sizeInMB };
  }, [file]);

  return {
    ...result,
    MAX_SIZE_MB,
  };
};
