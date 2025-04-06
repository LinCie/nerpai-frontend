import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import { getSession } from "@/lib/auth/session"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Header } from "@/components/layout/header"

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const session = await getSession()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  if (!session) {
    return redirect("/signin")
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="w-full">
        <Header />
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </SidebarProvider>
  )
}
