import { delay } from './api';
import { getStorageItem, setStorageItem } from './storageService';
import { Profile } from '../types';

export const fetchProfiles = async (): Promise<Profile[]> => {
  await delay(300);
  const profiles = await getStorageItem<Profile[]>('@profiles');
  return (
    profiles || [
      { id: '1', name: 'Param', avatar: 'stormtrooper', active: true },
      { id: '2', name: 'Guest', avatar: 'elsa', active: false }
    ]
  );
};

export const saveProfiles = async (profiles: Profile[]): Promise<void> => {
  await delay(300);
  await setStorageItem('@profiles', profiles);
};

export default {
  fetchProfiles,
  saveProfiles
};
