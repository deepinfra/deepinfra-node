export const URLUtils = {
  isValidUrl: (urlString: string): boolean => {
    try {
      const url = new URL(urlString);
      return ['http:', 'https:'].includes(url.protocol);
    } catch {
      return false;
    }
  },
};
