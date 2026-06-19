export const getSubdomain = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (parts.length >= 2 && parts[0] !== 'www') {
      return parts[0];
    }
  }
  return '';
};
