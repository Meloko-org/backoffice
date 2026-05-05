import { useUser } from "@clerk/clerk-react";
import { getUserLogged } from "../features/users/api/users.api";
import { useEffect, useState } from "react"


export function useUserLogged() {
  const { user, isLoaded } = useUser()

  const [userLogged, setUserLogged] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return

    const fetchUser = async () => {
      try {
        const data = await getUserLogged(user.id)
        setUserLogged(data)
      } catch (err) {
        console.error("Erreur userLogged:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [user, isLoaded])

  return { userLogged, loading }
}
