"use client"

import Link from "next/link"
import {
  Rocket,
  Coins,
  Backpack,
  PersonStanding,
  Earth,
  Settings,
  ChevronRight,
  LucideProps,
  Home,
  ArrowLeft,
} from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { signOut as signOutService } from "@/api/services/auth"
import { redirect } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

interface INavItem {
  title: string
  url: string
}

interface IMainNav {
  title: string
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>
  items: INavItem[]
}

const items: IMainNav[] = [
  { title: "Spaces", icon: Rocket, items: [{ title: "Spaces", url: "#" }] },
  {
    title: "Transactions",
    icon: Coins,
    items: [{ title: "Transactions", url: "#" }],
  },
  {
    title: "Inventory",
    icon: Backpack,
    items: [
      { title: "Items", url: "#" },
      { title: "Inventory", url: "#" },
    ],
  },
  {
    title: "Players",
    icon: PersonStanding,
    items: [
      { title: "Players", url: "#" },
      { title: "Users", url: "#" },
      { title: "People", url: "#" },
      { title: "Groups", url: "#" },
    ],
  },
  {
    title: "World Access",
    icon: Earth,
    items: [
      { title: "World Roles", url: "#" },
      { title: "World Permission", url: "#" },
      { title: "World Settings", url: "#" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    items: [{ title: "Profile", url: "#" }],
  },
]

function AppSidebar() {
  async function signOut() {
    await signOutService()
    redirect("/signin")
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="mt-3 flex flex-col px-2">
          <Avatar className="mb-1 size-14">
            <AvatarImage className="size-14" src="/avatar.jpg" />
            <AvatarFallback className="size-14">BG</AvatarFallback>
          </Avatar>
          <span className="font-semibold">John Doe</span>
          <span className="text-muted-foreground text-xs">@username</span>
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Home" asChild>
                <Link href="/dashboard">
                  <Home />
                  <span className="font-semibold">Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {items.map((item) => (
              <Collapsible
                key={item.title}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="cursor-pointer"
                    >
                      {item.icon && <item.icon />}
                      <span className="font-semibold">{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
            <SidebarMenuItem>
              <AlertDialog>
                <SidebarMenuButton
                  tooltip="Exit"
                  asChild
                  className="cursor-pointer"
                >
                  <AlertDialogTrigger>
                    <ArrowLeft />
                    <span className="font-semibold">Exit World</span>
                  </AlertDialogTrigger>
                </SidebarMenuButton>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to exit world?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will sign you out from current session. You
                      will have to sign in again.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={signOut}>
                      Exit world
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

export { AppSidebar }
