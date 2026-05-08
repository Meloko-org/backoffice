import { useNavigate } from "react-router-dom"
import AdminListPage from "../../../layouts/admin/pages/AdminListPage"
import { useAdminPage } from "../../../hooks/useAdminPage";

export default function SupportListPage() {
  const navigate = useNavigate()
  useAdminPage("Support");



  return (
    <AdminListPage
      model="support"
      overrideOnRowClick={(ticket) => {
        navigate(`/admin/support/${ticket._id}`)
      }}
    />
  )
}
