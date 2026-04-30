import { useState,  useMemo, type ReactNode } from "react";
import { AdminLayoutContext } from "../contexts/AdminLayoutContext";

type Props = {
  children: ReactNode;
};

export default function AdminLayoutProvider({ children }: Props) {

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [pageTitle, setPageTitle ] = useState<string | null>(null);

  const toggleLeft = () => setIsLeftOpen((prev) => !prev);


  const value = useMemo(
    () => ({
      isLeftOpen,
      toggleLeft,
      pageTitle,
      setPageTitle,
    }),
    [isLeftOpen, pageTitle ] 
  );


  return (
    <AdminLayoutContext.Provider value={value} >
      {children}
    </AdminLayoutContext.Provider>
  );
}



/* 
Le Provider, c’est le composant qui :

- contient les useState
- expose les valeurs au layout, header, etc.
- devient la source de vérité de l’UI admin

*/