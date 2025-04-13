import { ColumnDef } from "@tanstack/react-table"
import { IPerson } from "@/schema/person"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"

export const peopleColumns: ColumnDef<IPerson>[] = [
  {
    accessorKey: "id",
    header: () => <div className="w-10 text-center">ID</div>,
    cell: ({ row }) => (
      <div className="w-10 text-center">{row.original.id}</div>
    ),
  },
  {
    accessorKey: "number",
    header: "Number",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const person = row.original
      return <div>{person.status === "active" ? "Active" : "Inactive"}</div>
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const person = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Eye /> View person
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Pencil /> Edit person
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Trash /> Delete person
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
