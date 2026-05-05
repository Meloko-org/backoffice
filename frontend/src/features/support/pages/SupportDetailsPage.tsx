import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TicketSidebar from "../components/TicketSidebar"
import MessageList from "../components/MessageList"
import ReplyBox from "../components/Replybox"
import { getTicketDetails, sendMessage, simulateUserReply } from "../api/support.api"
import type { Message, Ticket } from "../types/support"


export default function SupportDetailsPage() {
  const { id } = useParams()

  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  const load = async () => {
    if (!id) return

    setLoading(true)

    const data = await getTicketDetails(id)

    setTicket(data.ticket)
    setMessages(data.messages)

    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [id])

  if (loading) return <p>Chargement...</p>
  if (!ticket) return <p>Ticket introuvable</p>

  const handleSend = async (content: string, isInternal: boolean) => {
    await sendMessage({
      ticketId: ticket._id,
      content,
      isInternal,
    })

    await load()
  }

  const handleSimulateReply = async () => {
    await simulateUserReply({
      ticketId: ticket._id,
      userId: ticket.createdBy.id,
      content: "Réponse simulée utilisateur",
    })

    await load()
  }

  return (
    <div className="mx-auto max-w-9xl space-y-6">
      <div className="grid grid-cols-10 p-4 h-full">
        {/* Sidebar */}
        <div className="col-span-3 p-4">
          <TicketSidebar ticket={ticket} onUpdated={load}/>
        </div>

        {/* Messages */}
        <div className="col-span-7 h-full">
          <div className="grid grid-rows-10">
            <div className="row-span-8 overflow-y-auto p-4">
              <MessageList messages={messages} />
            </div>

            <div className="row-span-2 p-4">
              <ReplyBox onSend={handleSend} />

              <button
                onClick={handleSimulateReply}
                className="mt-2 text-sm text-gray-500"
              >
                Simuler réponse utilisateur
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
