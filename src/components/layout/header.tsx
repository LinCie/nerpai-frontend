"use client"

import { useEffect, useState } from "react"
import { Moon, Sun, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Header() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="border-sidebar-accent bg-sidebar sticky flex items-center justify-between gap-2 border-b px-4 py-3">
      <Button variant="ghost" size="icon">
        <Menu className="size-5" />
      </Button>
      <h1 className="text-xl font-semibold">Game Bodo</h1>

      <div className="flex-1" />

      <div className="flex items-center gap-4">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="size-5 text-yellow-300" />
            ) : (
              <Moon className="size-5" />
            )}
          </Button>
        )}

        <Avatar>
          <AvatarImage src="/avatar.png" alt="@user" />
          <AvatarFallback>GB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export { Header }
