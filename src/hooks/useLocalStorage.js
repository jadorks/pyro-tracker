import { ethers } from "ethers";
import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || defaultValue;
}

export const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name

    const meetsLimit = value.length === 42;
    const isAddress = ethers.utils.isAddress(value);

    if (meetsLimit && isAddress) {
        localStorage.setItem(key, JSON.stringify(value));    
    }

    if (!isAddress) {
      setIsValidAddress(false);
    }

    
  }, [key, value]);

  return [value, setValue];
};
