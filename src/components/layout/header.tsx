"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
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
    <header className="border-sidebar-accent bg-sidebar sticky flex items-center justify-between border-b px-4 py-3">
      <h1 className="text-foreground text-lg font-semibold">Game Bodo</h1>

      <div className="flex items-center gap-4">
        {mounted && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-300" />
            ) : (
              <Moon className="text-foreground h-5 w-5" />
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
