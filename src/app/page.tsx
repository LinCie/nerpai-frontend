import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await getSession()

  if (!session) {
    return redirect("/signin")
  }

  return redirect("/dashboard")
}
