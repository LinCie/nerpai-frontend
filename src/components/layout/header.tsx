"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Header() {
  const { setTheme, theme } = useTheme()

  return (
    <header className="border-accent bg-background sticky flex items-center justify-between border-b px-4 py-3">
      <h1 className="text-foreground text-lg font-semibold">Game Bodo</h1>

      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? (
            <Sun className="text-foreground h-5 w-5" />
          ) : (
            <Moon className="text-foreground h-5 w-5" />
          )}
        </Button>

        <Avatar>
          <AvatarImage src="/avatar.png" alt="@user" />
          <AvatarFallback>GB</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export { Header }
