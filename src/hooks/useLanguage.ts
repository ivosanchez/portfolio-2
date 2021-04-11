import { MUTAIONS, useStore } from '@/store';

export const useLanguage = () => {
  const { commit } = useStore();

  const useKorean = () => {
    commit(MUTAIONS.TOGGLE_LANGUAGE, 'ko');
  };

  const useEnglish = () => {
    commit(MUTAIONS.TOGGLE_LANGUAGE, 'en');
  };

  return { useKorean, useEnglish };
};
