import { useEffect, useState } from "react"
import { useAdminListController } from "../controllers/useAdminListController"
import { adminRegistry } from "../registries/admin/adminRegistry"
import { Loader } from "lucide-react"
import { DataListLayout } from "../../../components/data-table/DataListLayout"
import type { AdminModels } from "../registries/admin/adminModels"
import { useConfirm } from "../contexts/ConfirmContext"
import { useAdminLayout } from "../contexts/AdminLayoutContext"
import type { UserActionContext } from "../../../features/users/config/user.actions"




type Props<K extends keyof AdminModels> = {
  model: K
}

export default function AdminListPage<K extends keyof AdminModels>({ 
  model 
}: Props<K>) {

  const admin = adminRegistry.get(model)

  if (!admin.getList) {
    throw new Error(`No getList defined for model "${String(model)}"`)
  }

  /* ========================= */
  /* DATA */
  /* ========================= */

  const {
    items,
    pagination,
    loading,
    search,
    setSearch,
    sortKey,
    sortDirection,
    handleSort,
    filters,
    setFilters,
    limit,
    setLimit,
    setPage,
    refetch,
    onRowClick,
  } = useAdminListController(admin.getList, {
      enableRightPanel: !!admin.details,
      getInfoContext: admin.details
        ? (item) => ({
            type: admin.entityName,
            id: (item as any)._id,
            title: `Détail`,
          })
        : undefined,
    })


  /* ========================= */
  /* DYNAMIC FILTERS */
  /* ========================= */

  const [dynamicData, setDynamicData] = useState<Record<string, any>>({})

  useEffect(() => {
    const loaders = admin.loaders;
    if (!loaders) return

    const load = async () => {
      const entries = await Promise.all(
        Object.entries(loaders).map(async ([key, fn]) => {
          const data = await fn()
          return [key, data]
        })
      )

      setDynamicData(Object.fromEntries(entries))
    }

    load()
  }, [admin])

  const filtersConfig = admin.filters
    ? admin.filters(dynamicData.roles || [])
    : []


  /* ========================= */
  /* ACTIONS CONTEXT */
  /* ========================= */
  const ctx = admin.actions?.useContext?.() as UserActionContext

  const columns = admin.columns
    ? admin.columns(ctx)
    : []

  /* ========================= */
  /* UI */
  /* ========================= */

  if (loading) return <Loader />

  return (
    <div className="p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <DataListLayout
          data={items}
          pagination={pagination ?? undefined}
          paginationAlign="center"
          loading={loading}

          search={search}
          onSearchChange={(value) => {
            setPage(1)
            setSearch(value)
          }}

          sortKey={sortKey}
          sortDirection={sortDirection}
          onSort={handleSort}

          filters={filters}
          onFiltersChange={setFilters}
          filtersConfig={filtersConfig}
          filterReset

          limit={limit}
          onLimitChange={setLimit}

          getRowId={(item: any) => item._id}
          onRowClick={onRowClick}
          onPageChange={setPage}

          columns={columns as any}
        />
      </div>
    </div>
  )
}