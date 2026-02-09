import SwapIconButton from "./buttons/SwapIconButton";
import { SidebarLeftIco } from "./icons/sideBarLeft";
import { SidebarLeftCollapseIco } from "./icons/sideBarLeftCollapse";
import { SidebarRightIco } from "./icons/sideBarRight";
import { SidebarRightCollapseIco } from "./icons/sideBarRightCollapse";
import DarkModeToggle from "../global/DarkModeToggle";

import { useAdminLayout } from "../../layouts/admin/AdminLayoutContext";


export default function AdminHeader() {

  const { 
    isLeftOpen,
    isRightOpen,
    toggleLeft,
    toggleRight,
    pageTitle,
  } = useAdminLayout();

console.log("HEADER left:", isLeftOpen);

  return (
    <header className="w-full flex justify-center items-center p-3">

      <div className="absolute top-0 left-0 pl-4 flex items-center h-15">
        <SwapIconButton
          iconOn={<SidebarLeftIco className="w-6 h-6" />}
          iconOff={<SidebarLeftCollapseIco className="w-6 h-6" />}
          isOn={isLeftOpen}
          onClick={toggleLeft}
          ariaLabel="Toggle History Panel"
          className="btn-sidebar"
        />
      </div>

      <div className="absolute top-0 right-0 pr-4 flex items-center h-15">
        <SwapIconButton
          iconOn={<SidebarRightIco className="w-6 h-6" />}
          iconOff={<SidebarRightCollapseIco className="w-6 h-6" />}
          isOn={isRightOpen}
          onClick={toggleRight}
          ariaLabel="Toggle tools Panel"
          className="btn-sidebar ml-2"
        />
      </div>

      <div className="flex w-[95%]">

        <div className="flex grow justify-center">
          <div className="flex">
            
            <h1 className="ml-2 text-xl font-bold text-gray-800 dark:text-white">{pageTitle}</h1>
          </div>
        </div>
          <div className="mr-5">
            <DarkModeToggle />
          </div>
      </div>
      
    </header>
  );
};




