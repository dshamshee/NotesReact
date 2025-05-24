import { useMedia } from 'react-use';

export const useToastConfig = () => {
  const isDark = useMedia('(prefers-color-scheme: dark)', false);

  return {
    position: "bottom-right",
    theme: isDark ? "dark" : "light",
    autoClose: 3000
  };
}; 