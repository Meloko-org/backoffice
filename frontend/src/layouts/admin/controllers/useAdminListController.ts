import { useEffect, useMemo, useState } from "react"
import { useAdminList } from "../../../hooks/useAdminList"
import { useAdminLayout } from "../contexts/AdminLayoutContext"
import { useInfoContext } from "../../../hooks/useInfoContext"


type Options<T> = {
  syncWithUrl?: boolean
  enableRightPanel?: boolean
  getInfoContext?: (item: T, refetch: () => void) => any
}


export function useAdminListController<T>(
  queryFn: any,
  options?: Options<T>
) {

  const {
    enableRightPanel = false,
    getInfoContext,
    ...restOptions
  } = options || {}

  const list = useAdminList<T>(queryFn, {
    syncWithUrl: true,
    ...restOptions,
  })

  const {
    filters,
    setFilters,
    setPage,
    refetch,
  } = list

  /* reset page quand filtres changent */
  useEffect(() => {
    setPage(1)
  }, [filters])

  
  /* ========================== */
  /*   RIGHT PANEL MANAGEMENT   */
  /* ========================== */

  const { openRight, closeRight } = useAdminLayout()

  const [selectedItem, setSelectedItem] = useState<T | null>(null)

  const infoContext = useMemo(() => {
    if (!selectedItem || !getInfoContext) return null

    return getInfoContext(selectedItem, refetch)
  }, [selectedItem, refetch, getInfoContext])

  useInfoContext(infoContext)

  const onRowClick = (item: T) => {
    if (!enableRightPanel) return

    setSelectedItem((prev) =>
      (prev as any)?._id === (item as any)._id ? null : item
    )
  }

  useEffect(() => {
    if (!enableRightPanel) return

    if (selectedItem) openRight()
    else closeRight()
  }, [selectedItem])

  useEffect(() => {
    return () => {
      if (enableRightPanel) closeRight()
    }
  }, [])

  return {
    ...list,

    /* nouveau */
    selectedItem,
    setSelectedItem,
    onRowClick,
  }
}