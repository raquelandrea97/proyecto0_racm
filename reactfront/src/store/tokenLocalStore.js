import React from 'react';

const useStateWithLocalStorage = (localStorageKey) => {
  const [token, setToken] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, token);
  }, [token]);

  return [token, setToken];
};
export default useStateWithLocalStorage;