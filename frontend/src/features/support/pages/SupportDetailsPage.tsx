import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import TicketSidebar from "../components/TicketSidebar"
import MessageList from "../components/MessageList"
import ReplyBox from "../components/Replybox"
import { getTicketDetails, sendMessage, simulateUserReply, updateTicket } from "../api/support.api"
import type { Message, Ticket } from "../types/support"
import { socket } from "../../../lib/socket"
import Loader from "../../../components/admin/Loader"


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
    // chargement du ticket
    load()

    // modification de unreadByAdmin
    if (id) {
      const updates = {unreadByAdmin: false}
      updateTicket({ticketId: id, updates})
    }
    
  }, [id])


  useEffect(() => {
    const handler = (data: any) => {
      if (data.ticketId !== ticket?._id.toString()) return

      setMessages((prev: any[]) => {
        const exists = prev.some((m) => m._id === data.message._id)
        if (exists) return prev

        return [...prev, data.message]
      })
    }

    socket.on("message:created", handler)

    return () => {
      socket.off("message:created", handler)
    }
  }, [ticket?._id])


  if (loading) return <Loader />
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

    // await load()
  }

  return (
    <div className="mx-auto max-w-9xl h-full overflow-hidden pb-5">
  
      <div className="grid grid-cols-10 h-full overflow-hidden gap-3">

        {/* Sidebar */}
        <div className="col-span-3 overflow-y-auto support-container p-8">
          <TicketSidebar ticket={ticket} onUpdated={load} />
        </div>

        {/* Chat */}
        <div className="col-span-7 flex flex-col min-h-0 space-y-5">

          {/* Messages */}
          <div className="flex-1 min-h-0 support-container px-8 pt-8">
            <MessageList messages={messages} />
          </div>

          {/* Reply */}
          <div className="shrink-0 support-container p-8">
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










    // <div className="mx-auto max-w-9xl space-y-6">
    //   <div className="grid grid-cols-10 p-4 h-full">
    //     {/* Sidebar */}
    //     <div className="col-span-3 p-4">
    //       <TicketSidebar ticket={ticket} onUpdated={load}/>
    //     </div>

    //     {/* Messages */}
    //     <div className="col-span-7">
    //       <div className="grid grid-rows-10">
    //         <div className="row-span-8 h-full bg-warning">
    //           <MessageList messages={messages} />
    //         </div>

    //         <div className="row-span-2 p-4">
    //           <ReplyBox onSend={handleSend} />

    //           <button
    //             onClick={handleSimulateReply}
    //             className="mt-2 text-sm text-gray-500"
    //           >
    //             Simuler réponse utilisateur
    //           </button>
    //         </div>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
