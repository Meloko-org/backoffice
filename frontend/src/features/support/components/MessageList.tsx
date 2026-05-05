import { useEffect, useRef } from "react"
import MessageBubble from "./MessageBubble"
import type { Message } from "../types/support"

type Props = {
  messages: Message[];
}

export default function MessageList({ messages }: Props) {

  // const containerRef = useRef()

  // useEffect(() => {
  //   containerRef.current?.scrollTo({
  //     top: containerRef.current.scrollHeight,
  //     behavior: "smooth",
  //   })
  // }, [messages])

  return (
    <div>
      {messages.map((msg: Message) => (
        <MessageBubble key={msg._id} message={msg} />
      ))}
    </div>
  )
}
