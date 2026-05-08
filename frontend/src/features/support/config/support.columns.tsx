import type { Column } from "../../../components/data-table/DataTable";

export function createSupportColumns(): Column<any>[] {
  return [
    {
      key: "createdBy",
      label: "Utilisateur",
      render: (row) => 
        {
          const colorClass = row.createdBy.type === "user" ? "text-success" : "text-warning";
          return row.createdBy.firstname
          ? <span className={`${colorClass}`}>{row.createdBy.firstname} {row.createdBy.lastname}</span>
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
      label: "Dernier message",
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
      label: "",
      render: (row) =>
        row.unreadByAdmin 
          ? <div className={`sticker sticker-alert`}></div>
          : null,
    },
  ]
}
