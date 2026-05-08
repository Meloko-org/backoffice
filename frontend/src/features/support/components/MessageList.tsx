import { useEffect, useRef, useState } from "react"
import MessageBubble from "./MessageBubble"
import type { Message } from "../types/support"

type Props = {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {

  const containerRef = useRef<HTMLDivElement>(null);
  const [showNewMessageBadge, setShowNewMessageBadge] = useState(false)

  const prevLengthRef = useRef(messages.length)


  const isAtBottom = () => {
    const el = containerRef.current
    if (!el) return true
    return el.scrollTop + el.clientHeight >= el.scrollHeight - 20
  }

  const scrollToBottom = () => {
    const el = containerRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }

  // 🔥 détecte nouveau message
  useEffect(() => {
    if (messages.length > prevLengthRef.current) {
      if (isAtBottom()) {
        scrollToBottom()
      } else {
        setShowNewMessageBadge(true)
      }
    }

    prevLengthRef.current = messages.length
  }, [messages])


  // cacher le badge quand scroll
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onScroll = () => {
      if (isAtBottom()) {
        setShowNewMessageBadge(false)
      }
    }

    el.addEventListener("scroll", onScroll)

    return () => el.removeEventListener("scroll", onScroll)
  }, [])

  return (

    <div className="relative h-full">

      <div ref={containerRef} className="overflow-y-auto h-full p-4 space-y-2 support-scrollbar">
        {messages.map((msg: Message) => (
          <MessageBubble key={msg._id} message={msg} />
        ))}
      </div>

      {showNewMessageBadge && (
        <button
          onClick={() => {
            scrollToBottom()
            setShowNewMessageBadge(false)
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2
                    bg-primary text-white px-4 py-2 rounded-full shadow"
        >
          Nouveau message ↓
        </button>
      )}

    </div>

  )
}
