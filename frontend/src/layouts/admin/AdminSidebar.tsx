import { NavLink, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useAdminLayout } from "./contexts/AdminLayoutContext";
import SidebarIconButton from "./components/SidebarIconButton";
import type { AdminMenuItem } from "./config/adminMenu"
import { adminMenu } from "./config/adminMenu";
import SignoutButton from "../../components/admin/buttons/SignoutButton";
import { useUserRole } from "../../hooks/useUserRole";
import { useCurrentPermissions } from "../../hooks/useCurrentPermissions";


/* détermine les éléments autorisés du menu en fonction des permissions par rôle */
function useFilteredAdminMenu() {
	
	const permissions = useCurrentPermissions();

	return adminMenu
		.map((item) => {

			if (item.type === "link") {
				if (!item.permission) return item;

				return permissions.includes(item.permission)
					? item
					: null;
			}

			if (item.type === "group") {
				const children = item.children.filter((child) => {
					if (!child.permission) return true;
					return permissions.includes(child.permission);
				});

				if (children.length === 0) return null;

				return {
					...item,
					children,
				};
			}

			return null;
		})
		.filter((item): item is AdminMenuItem => item !== null);		
}

/*
- le filter permet de supprimer tous les éléments falsy. 
- (item): item is AdminMenuItem => item !== null : permet de garantir que useFilteredAdminMenu
 	retourne des éléments de type AdminMenuItem. C'est type guard.
*/






export default function AdminSidebar() {
  const { isLeftOpen, toggleLeft } = useAdminLayout();
  const navigate = useNavigate();

	const { user } = useUser();
	const { role } = useUserRole();

	const menu = useFilteredAdminMenu();


  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-10
        transition-all duration-300
        ${isLeftOpen ? "w-50" : "w-16"}
				overflow-visible
      `}
      style={{ background: "var(--app-sidebar-bg)" }}
    >
      {/* Conteneur commun */}
      <div className="relative h-full">

        {/* ======================= */}
        {/* TINY BAR (icônes seules) */}
        {/* ======================= */}
        <div
          className={`
            absolute inset-0
            flex flex-col
            items-start
            gap-1
            px-2 pt-4
            transition-opacity duration-200
            ${isLeftOpen ? "opacity-0 pointer-events-none" : "opacity-100"}
						border border-r-neutral-100/20 border-neutral-100/0
						overflow-visible
          `}
        >
					<div className="h-20 flex items-center justify-start mb-5">
						<div className="h-16 w-16 -m-2.5">
							<img
								src="/images/icone_la_charrue.png"
								alt="Meloko"
								className="h-full w-full object-contain"
							/>
						</div>
					</div>

					<div>
						{menu.map((item) => {
							const Icon = item.icon;

							const handleClick = () => {
								if (item.type === "link") {
									navigate(item.path);
								} else {
									toggleLeft();
								}
							};

							return (
								<SidebarIconButton
									key={item.key}
									icon={<Icon className="w-5 h-5" />}
									onClick={handleClick}
									showTooltip={!isLeftOpen}
									tooltips={item.label}
								/>
							);
						})}
					</div>

					<div className="grow"></div>

					{/* zone utilisateur */}
					<div className="h-37">
						<div className=" mb-5">
							<div className="h-11 w-11 user" onClick={toggleLeft}>
								<div className="h-11 w-11">
									<img
										src={user?.imageUrl || "/images/avatar.svg"}
										onError={(e) => {
											e.currentTarget.src = "/images/avatar.svg"
										}}
										alt="Meloko"
										className="h-full w-full object-fill rounded-md"
									/>
								</div>
							</div>
						</div>
					</div>
        </div>

        {/* ======================= */}
        {/* FULL BAR (icône + label) */}
        {/* ======================= */}
        <div
          className={`
            absolute inset-0
            flex flex-col
            gap-1
            px-2 pt-4
            transition-opacity duration-200
            ${isLeftOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
          `}
        >
					<div className="h-20 px-2 mb-5">
						<div className="h-20 w-full flex items-center justify-center">
							<img
								src="/images/logo_lacharrue.png"
								alt="Meloko Admin"
								className="h-full w-auto object-contain"
							/>
						</div>
					</div>

					<div>
						{menu.map((item) => {
							const Icon = item.icon;

							// -------- LINK --------
							if (item.type === "link") {
								return (
									<NavLink key={item.key} to={item.path}>
										{({ isActive }) => (
											<SidebarIconButton
												icon={<Icon className="w-5 h-5" />}
												label={item.label}
												isActive={isActive}
											/>
										)}
									</NavLink>
								);
							}

							// -------- GROUP --------
							return (
								<div key={item.key}>
									{/* Bouton group (non cliquable quand ouvert) */}
									<SidebarIconButton
										icon={<Icon className="w-5 h-5" />}
										label={item.label}
									/>

									{/* Sublinks */}
									<div className="ml-6 mt-1 space-y-1">
										{item.children.map((child) => {
											if (child.type !== "sublink") return null;

											const ChildIcon = child.icon;

											return (
												<NavLink key={child.key} to={child.path}>
													{({ isActive }) => (
														<SidebarIconButton
															icon={
																<ChildIcon className="w-4 h-4 opacity-70" />
															}
															label={child.label}
															isActive={isActive}
														/>
													)}
												</NavLink>
											);
										})}
									</div>
								</div>
							);
						})}
					</div>

					<div className="grow"></div>

					{/* zone utilisateur */}
					<div className="h-40 ">

						<div className="">
							<div className="flex justify-center items-center p-1 user">

								<div className="h-11 w-11">
									<img
										src={user?.imageUrl || "/images/avatar.svg"}
										onError={(e) => {
											e.currentTarget.src = "/images/avatar.svg"
										}}
										alt="Meloko"
										className="h-full w-full object-fill rounded-md"
									/>
								</div>
								<div className="ml-4 ">
									<div>username</div>
									<div className="text-xs text-neutral-400 capitalize">{role}</div>
								</div>
							</div>
							
							<div className="w-full flex justify-center mt-5">
								<SignoutButton />
							</div>
						</div>

					</div>



        </div>

      </div>
    </aside>
  );
}
