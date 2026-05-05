import type { Column } from "../../../components/data-table/DataTable";

export function createSupportColumns(): Column<any>[] {
  return [
    {
      key: "createdBy",
      label: "Utilisateur",
      render: (row) => 
        {
          return row.createdBy.firstname
          ? `${row.createdBy.firstname} ${row.createdBy.lastname}`
          : "Utilisateur inconnu";
        },
    },
    {
      key: "category",
      label: "Catégorie",
    },
    {
      key: "lastMessage",
      label: "Dernier message",
      render: (row) => {
        const text = row.lastMessagePreview || ""

        return text.length > 15 
          ? text.slice(0, 12) + "..."
          : text
      },
    },
    {
      key: "status",
      label: "Statut",
      sortable: true,
    },
    {
      key: "assignedTo",
      label: "Assigné",
      render: (row) => 
        row.assignedTo
          ? `${row.assignedTo.lastname} (${row.assignedTo.firstname.slice(0, 1)}.)`
          : "—",
    },
    {
      key: "lastMessageAt",
      label: "Date",
      sortable: true,
      render: (row) =>
        new Date(row.lastMessageAt).toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
    },
    {
      key: "unread",
      label: "Lu",
      render: (row) =>
        row.unreadByAdmin 
          ? <div className={`sticker sticker-alert`}></div>
          : <div className={`sticker sticker-success`}></div>,
    },
  ]
}
