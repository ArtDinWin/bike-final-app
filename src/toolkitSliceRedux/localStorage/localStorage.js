import { KEY_LOCAL_STORAGE } from "./../../config";

export const saveToStorage = (data, key = KEY_LOCAL_STORAGE) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
  } catch {}
};

export const tokenFromStorage = (key = KEY_LOCAL_STORAGE) => {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch {
    return undefined;
  }
};

export const removeFromStorage = (key = KEY_LOCAL_STORAGE) => {
  try {
    window.localStorage.removeItem(key);
  } catch {}
};
