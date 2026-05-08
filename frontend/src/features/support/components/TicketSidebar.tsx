import { useEffect, useState } from "react";
import { type Admin, type Ticket } from "../types/support"
import { getAdmins, updateTicket } from "../api/support.api";
import { useUser } from "@clerk/clerk-react";
import Usercard from "../../../components/admin/cards/UserCard";

type Props = {
  ticket: Ticket;
  onUpdated: () => void;
}

export default function TicketSidebar({ticket, onUpdated}: Props) {

  const [ status, setStatus ] = useState<string>(ticket.status);
  const [ assignedTo, setAssignedTo ] = useState(ticket.assignedTo?.id || "");
  const [ admins, setAdmins ] = useState<Admin[]>([])

  // clerkUser
  const { user } = useUser();
  
  useEffect(() => {
    getAdmins().then(setAdmins)
  }, [])

  const handleStatusChange = async (value: string) => {
    setStatus(value)

    await updateTicket({
      ticketId: ticket._id,
      updates: { status: value}
    })

    onUpdated()
  }

  const handleAssignChange = async (value: string) => {
    setAssignedTo(value)

    await updateTicket({
      ticketId: ticket._id,
      updates: { assignedTo: value ||null }
    })

    onUpdated()
  }

  const currentUser = admins.find(a => a.clerkUUID === user?.id)

  console.log("ticket sidebar :", ticket)
  console.log("admins :", admins)
  console.log("current user :", currentUser)

  return (
    <div className="">
      <div>
        <p className="ticket-sidebar-label">Utilisateur</p>
        <Usercard user={ticket.createdBy} />
        {/* <p className="ml-2">{ticket.createdBy?.lastname} {ticket.createdBy?.firstname}</p>
        <p>{ticket.createdBy.email}</p> */}
      </div>

      <div className="mb-5">
        <p className="ticket-sidebar-label">Statut</p>
        <select
          value={status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="border p-1 rounded w-auto ml-2"
        >
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="mb-5">
        <p className="ticket-sidebar-label">Catégorie</p>
        <p className="ml-2">{ticket.category}</p>
      </div>

      <div className="mb-5">
        <p className="ticket-sidebar-label">Assigné à</p>
        <div className="flex flex-row items-center justify-between">
          <select
            value={assignedTo}
            onChange={(e) => handleAssignChange(e.target.value)}
            className="border p-1 rounded w-auto ml-2"
          >
            <option value="">Non assigné</option>

            {admins.map((admin: any) => (
              <option key={admin._id} value={admin._id}>
                {admin.lastname} ({admin.firstname.slice(0, 1)}.)
              </option>
            ))}
          </select>
          <button 
            onClick={() => handleAssignChange(currentUser!._id)}
            className="btn-outline-primary"
          >
            M’assigner
          </button>
        </div>
        
      </div>

      {ticket.context?.entityId && (
        <div>
          <p className="ticket-sidebar-label">Contexte</p>
          <p>
            {ticket.context.entityType} - {ticket.context.entityId}
          </p>
        </div>
      )}
    </div>
  )
}
