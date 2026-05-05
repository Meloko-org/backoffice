export default function MessageBubble({ message }: any) {
  const isAdmin = message.sender.type === "admin"

  return (
    <div
      className={`flex mb-2 ${
        isAdmin ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`message ${
          message.isInternal
            ? "internal-message"
            : isAdmin
            ? "admin-message"
            : "user-message"
        }`}
      >
        {message.content}
      </div>
    </div>
  )
}
