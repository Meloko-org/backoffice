import { useState } from "react";
import { useShopNotes } from "../hooks/useShopNotes";
import type { Column } from "../../../components/data-table/DataTable";
import { DataListLayout } from "../../../components/data-table/DataListLayout";
import { renderSourceNote } from "../utils/renderStates";
import { FlatStatCard } from "../../../components/admin/cards/FlatStatCard";
import type { ShopNote } from "../types/shop";
import { useRightPanel } from "../../../layouts/admin/contexts/RightPanelContext";

interface Props {
  shopId: string;
}

export default function ShopNoteSection({ shopId }: Props) {

  const { setMain } = useRightPanel();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [filters, setFilters] = useState({});

  const { data, isLoading } = useShopNotes(shopId, {
    page,
    limit,
    search,
    sortKey,
    sortDirection,
    filters,
  });



  if (!data) return null;

  const notes = data.items;
  const stats = data.stats;
  const pagination = data.pagination;

  console.log(data)

  const columns: Column<typeof notes[number]>[] = [
    {
      key: "customer",
      label: "Client",
      sortable: true,
      render: (note) => note.user.lastname
    },
    {
      key: "note",
      label: "note",
      sortable: true,
      // render: (note) => <RatingStars rating={note.note} />
    },
    {
      key: "source",
      label: "Type",
      render: (note) =>
        renderSourceNote(note.source)
    },
    {
      key: "createdAt",
      label: "Date",
      sortable: true,
      render: (note) => 
        new Date(note.createdAt).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })
    }
  ]

  const handleSelectNote = (shopNote: ShopNote) => {
    setMain(prev => {
      if (
        prev &&
        prev.type === "shopNote" &&
        "id" in prev &&
        prev.id === shopNote._id
      ) {
        return null; // toggle OFF
      }

      return {
        type: "shopNote",
        id: shopNote._id,
        title: "Détail de la note",
      };
    });
  }


  return (
    <div className="shop-dashboard-bloc">

      <div className="flex flex-row justify-between">
        <h2>Notes</h2>
        <div className="grow flex flex-row justify-end space-x-2">
          <FlatStatCard
            label="Total"
            value={stats.totalNotes}
            extraClasses="h-8"
          />
          <FlatStatCard
            label="Moyenne"
            value={stats.avgRating.toFixed(2)}
            extraClasses="h-8"
          />
        </div>
      </div>
      

      <DataListLayout
        data={notes ?? []}
        pagination={pagination}
        paginationAlign="center"
        columns={columns}
        loading={isLoading}

        search={search}
        onSearchChange={setSearch}

        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={(key) => {
          if (key === sortKey) {
            setSortDirection(prev => prev === "asc" ? "desc" : "asc");
          } else {
            setSortKey(key);
            setSortDirection("asc");
          }
        }}

        filters={filters}
        onFiltersChange={setFilters}

        limit={limit}
        onLimitChange={setLimit}

        onPageChange={setPage}
        getRowId={(row) => row._id}
        onRowClick={handleSelectNote}
      />

    </div>
  )
}