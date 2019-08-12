import { useState, useEffect } from 'react';

export default function useLocalStorageState(key, initialValue = null) {
  const invalidKey = typeof key !== 'string' || key.length < 1;

  if (invalidKey) throw TypeError('Storage key must be a non-empty string.');

  const [state, setState] = useState(() => {
    let value;
    try {
      value = JSON.parse(window.localStorage.getItem(key) || JSON.stringify(initialValue));
    } catch (err) {
      value = initialValue;
    }
    return value;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
}
