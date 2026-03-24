import { useEffect, useState } from "react";
import type { FilterConfig } from "../../../components/data-table/DataFiltersBar";
import type { PostalCodeForSelect } from "../types/markets";
import { getPostalCodes } from "../api/markets.api";

export function createMarketFilters(
  data: Record<string, any>
): FilterConfig[] {

  // const postalCodes: PostalCodeForSelect[] = data.postalCodes || [];

  const [ postalCodes, setPostalCodes ] = useState<string[]>([]);
  
    useEffect(() => {
      getPostalCodes().then(setPostalCodes)
    }, [])

  return [
    {
      type: "select",
      key: "postalCode",
      label: "Code postal",
      options: postalCodes.map((code) => ({
        label: code,
        value: code,
      })),
    },
  ]
}