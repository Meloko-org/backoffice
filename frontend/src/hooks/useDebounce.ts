import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

/*
	le debounce permet de ne pas déclancher un appel APi à chque fois
	qu'on tape une lettre dans le champ de recherche. 
	L'idée c'est d'attendre un certain délai après la dernière frappe. 
 */