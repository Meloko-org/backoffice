import { useState } from "react"
import Checkbox from "../../../core/forms/components/checkbox"

export default function ReplyBox({ onSend }: any) {
  const [content, setContent] = useState("")
  const [isInternal, setIsInternal] = useState(false)

  const handleSend = () => {
    if (!content.trim()) return

    onSend(content, isInternal)

    setContent("")
    setIsInternal(false)
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded"
        placeholder="Écrire un message..."
      />

      <div className="flex items-center justify-between">
        <label className="text-sm">
          <input
            type="checkbox"
            checked={isInternal}
            onChange={() => setIsInternal(!isInternal)}
          />
          Note interne
        </label>
        {/* <Checkbox
          label="Note interne"
          checked={isInternal}
          value={isInternal.toString()}
          onChange={() => setIsInternal(!isInternal)}
        /> */}

        <button
          onClick={handleSend}
          className="btn-outline-primary"
        >
          Envoyer
        </button>
      </div>
    </div>
  )
}
