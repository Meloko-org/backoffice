import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminPage } from "../../../hooks/useAdminPage";
import { useAdminLayout } from "../../../layouts/admin/contexts/AdminLayoutContext";
import { useConfirm } from "../../../layouts/admin/contexts/ConfirmContext";
import { useAdminList } from "../../../hooks/useAdminList";
import { getUsersList } from "../api/users.api";
import type { Product } from "../../products/types/product";
import type { ModelContext } from "../../../types/admin";
import { useInfoContext } from "../../../hooks/useInfoContext";
import { BallTriangle } from "react-loader-spinner";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import { Ban, Eye, Pencil, Trash2 } from "lucide-react";
import type { User } from "../types/user";
import { formatPriceToEuros } from "../../../utils/price/priceConverter";
import { DataRowMenu, type RowMenuAction } from "../../../components/data-table/DataRowMenu";
import type { RoleForSelect } from "../../roles/types/roles";
import { getRoleNames } from "../../roles/api/roles.api";
import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";

export default function UsersListPage() {
  const navigate = useNavigate();

  useAdminPage("Liste des utilisateurs");

  const { openRight, closeRight } = useAdminLayout();
  const { confirm } = useConfirm();


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

  

  /* filtres destinés à DataFiltersBar */

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


  /* affichage dans la sidebar droite */  
  const [ selectedUser, setSelectedUser ] = useState<User | null>();

  const infoContext: ModelContext = useMemo(() => {
    if (!selectedUser) return null;

    return {
      type: "user",
      title: "Détail du user",
      data: selectedUser,
      onEdit: () => handleEditUser(selectedUser),
      onDelete: () => handleDeleteUser(selectedUser),
    };
  }, [selectedUser]);

  useInfoContext(infoContext)



  useEffect(() => {
    if (selectedUser) {
      openRight();
    } else {
      closeRight();
    }
  }, [selectedUser])


  const handleSelectUser = (user: User) => {
    setSelectedUser(prev =>
      prev?._id === user._id ? null : user
    )
  }

  const handleEditUser = (user: User) => {
    navigate(`/admin/users/${user._id}/edit`)
  }

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user)
    openRight();
    confirm({
      title: "Supprimer le user",
      description: "Cette action est irréversible.",
      onConfirm: async () => {
        // await deleteUser(user._id);
        refetch();
      },
    });
  }


  const handleSearch = (value: string) => {
    setPage(1);
    setSearch(value);
  };



  useEffect(() => {
    return () => {
      closeRight();
    };
  }, []);


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


  /* Actions du RowMenu */
  const handleSuspendToggle = () => {}

  const userRowActions: RowMenuAction<User>[] = [
    {
      label: "Voir",
      icon: <Eye className="w-4 h-4" />,
      onClick: (user: User) => navigate(`/admin/users/${user._id}`),
    },
    {
      label: "Éditer",
      icon: <Pencil className="w-4 h-4" />,
      onClick: handleEditUser,
    },
    {
      label: (user: User) => user.isSuspended ? "Réactiver" : "Suspendre",
      icon: <Ban className="w-4 h-4" />,
      variant: "warning",
      onClick: handleSuspendToggle,
    },
    {
      label: (user: User) => user.isDeleted ? "Restaurer" : "Supprimer",
      icon: <Trash2 className="w-4 h-4" />,
      variant: "danger",
      onClick: handleDeleteUser,
    },
  ];

 


  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="#98B66E"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  console.log("filters :", filters)

  
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
                    user.roles.map(role => (
                      <p key={role._id} className="detail-info slug font-mono text-xs px-2 py-1 rounded inline-block mr-1">
                        {role.name}
                      </p>
                    ))
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