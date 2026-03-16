import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useAdminList } from "../../../hooks/useAdminList";
import { getUsersList } from "../api/users.api";
import type { ModelContext } from "../../../types/admin";
import { useInfoContext } from "../../../hooks/useInfoContext";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import type { User } from "../types/user";
import type { RoleForSelect } from "../../roles/types/roles";
import { getRoleNames } from "../../roles/api/roles.api";
import Loader from "../../../components/admin/Loader";
import { type UserActionContext } from "../config/user.actions";
import { useUserActionsContext } from "../../../hooks/useUserActionsContext";
import { createUserFilters } from "../config/user.filters";
import { createUserColumns } from "../config/user.columns";
import { adminRegistry } from "../../../layouts/admin/registries/admin/adminRegistry";




export default function UsersListPage() {

  const admin = adminRegistry.get("users");

  console.log("registry admin :", admin)

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




  // retour page quand reset filters
  useEffect(() => {
    setPage(1);
  }, [filters]);

  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };



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

  
  /* GESTION DES ACTIONS DU USER */
  /* création du context des actions (récupère tous les hooks nécessaires) */
  const baseCtx = useUserActionsContext();

  const ctx: UserActionContext = {
    ...baseCtx,
    refetch
  }

  /* les actions sont récupérées directement dans les props de DataLayoutList */


  // configuration des filtres
  const filtersConfig = createUserFilters(roles)

  // configuration des columns
  const columns = createUserColumns(ctx)

  /* Loading */
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
              columns={columns}
            />
          </div>
        </div>
      )}

    </>
  );
}