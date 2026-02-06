import { useState,  useMemo, type ReactNode } from "react";
import { AdminLayoutContext } from "./AdminLayoutContext";

type Props = {
  children: ReactNode;
};

export default function AdminLayoutProvider({ children }: Props) {

  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);

  const toggleLeft = () => {setIsLeftOpen((prev) => !prev)};
  const toggleRight = () => setIsRightOpen((prev) => !prev);

  const value = useMemo(
    () => ({
      isLeftOpen,
      isRightOpen,
      toggleLeft,
      toggleRight,
    }),
    [isLeftOpen, isRightOpen]
  );

  console.log("PROVIDER left :", isLeftOpen)

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