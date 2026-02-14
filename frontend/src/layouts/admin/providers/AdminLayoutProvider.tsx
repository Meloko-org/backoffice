import { useState,  useMemo, type ReactNode } from "react";
import { AdminLayoutContext } from "../contexts/AdminLayoutContext";

type Props = {
  children: ReactNode;
};

export default function AdminLayoutProvider({ children }: Props) {

  /* AdminLayoutcontext */
  const [isLeftOpen, setIsLeftOpen] = useState(false);
  const [isRightOpen, setIsRightOpen] = useState(false);
  const [pageTitle, setPageTitle ] = useState<string | null>(null);
  // const [ sidebarRightContext, setSidebarRightContext ] = useState<SidebarRightContext>(null);

  const toggleLeft = () => setIsLeftOpen((prev) => !prev);
  const toggleRight = () => setIsRightOpen((prev) => !prev);
  const openRight = () => setIsRightOpen(true);
  const closeRight = () => setIsRightOpen(false);


  const value = useMemo(
    () => ({
      isLeftOpen,
      isRightOpen,
      toggleLeft,
      toggleRight,
      openRight,
      closeRight,
      pageTitle,
      setPageTitle,
    }),
    [isLeftOpen, isRightOpen, pageTitle ]
  );

  // console.log("PROVIDER :", value)

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