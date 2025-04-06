import { redirect } from "next/navigation"
import { Header } from "@/components/layout/header"
import { getSession } from "@/lib/auth/session"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  if (!session) {
    return redirect("/signin")
  }

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
