import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useAdminList } from "../../../hooks/useAdminList";
import { getUsersList } from "../api/users.api";
import type { ModelContext } from "../../../types/admin";
import { useInfoContext } from "../../../hooks/useInfoContext";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import type { User } from "../types/user";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { DataRowMenu, type RowMenuAction } from "../../../components/data-table/DataRowMenu";
import type { RoleForSelect } from "../../roles/types/roles";
import { getRoleNames } from "../../roles/api/roles.api";
import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";
import Loader from "../../../components/admin/Loader";
import { runUserAction, type UserActionContext } from "../config/user.actions";
import { useUserActionsContext } from "../../../hooks/useUserActionsContext";
import { userActionsRegistry } from "../config/userActionsRegistry";



export default function UsersListPage() {

  useAdminPage("Liste des utilisateurs");


  /* GESTION DES DONNEES A AFFICHER */
  const {
    items,
    pagination,
    loading,
    page,
    setPage,
    search,
    setSearch,
    sortKey,
    sortDirection,
    handleSort,
    filters,
    setFilters,
    limit,
    setLimit,
    refetch,
  } = useAdminList(getUsersList, { syncWithUrl: true });

  
  const defineStatus = (user: User): ReactNode => {
    let stickerClass = "sticker-success";

    if (user.isDeleted) stickerClass = "sticker-alert";
    else if (user.isSuspended) stickerClass = "sticker-warning";

    return (
      <div className="table-status">
        <div className={`sticker ${stickerClass}`}></div>
      </div>
    );
  }


  /* GESTION DES FILTRES POUR DataFiltersBar */

  // récupération des données nécessaires aux filtres: ici les roles
  const [ roles, setRoles ] = useState<RoleForSelect[]>([]);

  useEffect(() => {
    getRoleNames().then(setRoles)
  }, [])


  // configuration des filtres
  const filtersConfig: FilterConfig[] = [
    {
      type: "select",
      key: "role",
      label: "Rôle",
      options: roles.map((r) => ({
        label: r.name,
        value: r._id,
      })),
    },
    {
      type: "select",
      key: "status",
      label: "Statut",
      options: [
        { label: "Actif", value: "active" },
        { label: "Suspendu", value: "suspended" },
        { label: "Supprimé", value: "deleted" },
      ],
    },
  ];

  // retour page quand reset filters
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };



  /* GESTION DES ACTIONS DU USER */
  // appels à tous les hooks nécessaires 
  // const navigate = useNavigate();
  // const { openRight, closeRight } = useAdminLayout();
  // const { defineConfirm } = useConfirm();
  // const { suspend, unsuspend } = useSuspendUser();
  // const { del, restore } = useDeleteUser();

  // création du context des actions
  // const ctx = {
  //   navigate,
  //   openRight,
  //   defineConfirm,
  //   suspend,
  //   unsuspend,
  //   del,
  //   restore,
  //   refetch,
  // }

  // remplace le code précédent
  const baseCtx = useUserActionsContext();

  const ctx: UserActionContext = {
    ...baseCtx,
    refetch
  }




  /* GESTION DE L'AFFICHAGE DANS LE rightPanel */  
  const { openRight, closeRight } = useAdminLayout();
  const [ selectedUser, setSelectedUser ] = useState<User | null>();

  const infoContext: ModelContext = useMemo(() => {
    if (!selectedUser) return null;

    return {
      type: "user",
      title: "Détail du user",
      refetch,
      user: selectedUser,

      // onEdit: () => handleEditUser(selectedUser),
      // onDelete: () => handleDeleteUser(selectedUser),
      // onDisplay: () => navigate(`/admin/users/${selectedUser._id}`),
      // onSuspend: () => handleSuspendUser(selectedUser),
      // onUnsuspend: () => handleUnsuspendUser(selectedUser),
      // onRestore: () => handleRestoreUser(selectedUser), 
    };
  }, [selectedUser]);

  useInfoContext(infoContext)

  const handleSelectUser = (user: User) => {
    setSelectedUser(prev =>
      prev?._id === user._id ? null : user
    )
  }

  useEffect(() => {
    if (selectedUser) {
      openRight();
    } else {
      closeRight();
    }
  }, [selectedUser])

  useEffect(() => {
    return () => {
      closeRight();
    };
  }, []);

 

  const rowMenuKeys: (keyof typeof userActionsRegistry)[]  = ["display", "edit", "suspend", "delete"];

  const userRowActions: RowMenuAction<User>[] = rowMenuKeys.map((key) => {

    const def = userActionsRegistry[key];

    return {
      label: (user: User) => 
        typeof def.label === "function"
          ? def.label(user)
          : def.label,

      icon: <def.icon className="h-4 w-4" />,
      variant: def.variant,
      hidden: (user: User) => def.visible ? !def.visible(user) : false,
      onClick: (user: User) => def.run(user, ctx)
    }
  });

 


  if (loading) {
    return (
      <Loader />
    );
  }


  
  return (
    <>

      {items && (
        <div className="p-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <DataListLayout
              data={items}
              pagination={pagination!}
              paginationAlign="center"
              loading={loading}

              search={search}
              onSearchChange={handleSearch}

              sortKey={sortKey}
              sortDirection={sortDirection}
              onSort={handleSort}

              filters={filters}
              onFiltersChange={setFilters}
              filtersConfig={filtersConfig}
              filterReset={true}

              limit={limit}
              onLimitChange={setLimit}

              getRowId={(user) => user._id}
              onRowClick={handleSelectUser}
              onPageChange={setPage}
              columns={[
                { key: "email", label: "Email", sortable: true },
                { key: "firstname", label: "Nom", sortable: true },
                { 
                  key: "roles", 
                  label: "Rôles", 
                  sortable: true,
                  render: (user) => 
                      <p  className="detail-info slug font-mono text-xs px-2 py-1 rounded inline-block mr-1">
                        {user.role.name}
                      </p>
                 },
                { key: "totalOrders", label: "Commandes", sortable: true },
                {
                  key: "totalSpent", 
                  label: "Montant", 
                  sortable: true,
                  render: (user) => formatPriceToEuros(user.totalSpent)
                },
                {
                  key: "createdAt",
                  label: "Créée le",
                  sortable: true,
                  render: (user) =>
                    new Date(user.createdAt).toLocaleDateString(),
                },
                {
                  key: "",
                  label: "Status",
                  sortable: true,
                  render: (user) => defineStatus(user)
                },
                {
                  key: "actions",
                  label: "",
                  render: (user) => (
                    <div className="table-actions">
                      <DataRowMenu
                        row={user}
                        actions={userRowActions}
                      />
                    </div>
                  ),
                },
              ]}
              // actions={}
            />
          </div>
        </div>
      )}

    </>
  );
}