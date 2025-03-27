import Image from "next/image"
import { Box } from "lucide-react"
import deskImage from "@/assets/images/desk.webp"
import { Card } from "@/components/ui/card"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex">
      <main className="flex h-screen w-full max-w-xl flex-col justify-center gap-3 px-4 py-6 md:gap-6 md:px-10 md:py-16">
        <div className="flex items-center gap-1 select-none md:gap-2">
          <Box className="size-6 md:size-8" />
          <div className="text-2xl font-semibold tracking-tight md:text-3xl">
            Nerpai
          </div>
        </div>
        <Card>{children}</Card>
        <p className="text-xs leading-none font-medium">
          Copyright © 2025 Nerpai. All rights reserved.
        </p>
      </main>
      <aside
        aria-hidden
        className="relative hidden flex-1 select-none md:block"
      >
        <Image
          className="h-screen w-full object-cover"
          src={deskImage}
          alt=""
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-xs" />
      </aside>
    </div>
  )
}
