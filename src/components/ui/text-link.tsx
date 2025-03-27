import Link from "next/link"
import { cn } from "@/lib/utils"

function TextLink({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "text-secondary-foreground visited:text-muted-foreground hover:underline",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  )
}

export { TextLink }
