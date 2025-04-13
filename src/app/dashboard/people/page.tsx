"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/table/data-table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { AutoForm } from "@/components/ui/autoform"
import { Button } from "@/components/ui/button"
import { personSchema, personSchemaProvider, IPerson } from "@/schema/person"
import { getPeople, createPerson } from "@/api/services/people"
import { zodResolver } from "@hookform/resolvers/zod"
import useDebounce from "@/hooks/use-debounce"
import { peopleColumns } from "./columns"

interface AddPersonModalProps {
  onSuccess: () => Promise<void>
}

function AddPersonModal({ onSuccess }: AddPersonModalProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof personSchema>>({
    resolver: zodResolver(personSchema),
    defaultValues: {
      number: "",
      username: "",
      fullName: "",
      birthDate: undefined,
      deathDate: undefined,
      sex: undefined,
      address: { country: "", province: "", city: "", street: "", postal: "" },
      status: undefined,
      notes: "",
    },
  })

  async function handleSubmit(values: z.output<typeof personSchema>) {
    const response = createPerson(values)
    toast.promise(response, {
      loading: "Adding a person...",
      success: async () => {
        await onSuccess()
        setOpen(false)
        form.reset()
        return `A person with username ${values.username} has been added`
      },
      error: "There is an error while trying to add a person",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Add Person <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-125 overflow-scroll md:max-h-150">
        <DialogHeader>
          <DialogTitle>Add Person</DialogTitle>
          <DialogDescription>Register a person to bodo</DialogDescription>
        </DialogHeader>
        <AutoForm schema={personSchemaProvider} onSubmit={handleSubmit}>
          <div className="flex justify-end gap-2 md:gap-4">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit">Submit</Button>
          </div>
        </AutoForm>
      </DialogContent>
    </Dialog>
  )
}

export default function PeoplePage() {
  const searchParams = useSearchParams()
  const page = parseInt(searchParams.get("page") || "1")

  const [people, setPeople] = useState<IPerson[]>([])
  const [count, setCount] = useState(0)
  const [params, setParams] = useState({
    show: parseInt(searchParams.get("pageSize") || "10"),
    search: "",
    searchBy: "all",
  })

  const debouncedSearch = useDebounce(params.search, 300)
  const searchByOptions = [
    { value: "id", label: "ID" },
    { value: "number", label: "Number" },
    { value: "username", label: "Username" },
    { value: "fullName", label: "Full Name" },
  ]

  const fetchPeople = useCallback(async () => {
    const res = await getPeople(
      page,
      params.show,
      debouncedSearch,
      params.searchBy,
    )
    const json = await res.json()
    setPeople(json.people)
    setCount(json.count)
  }, [params, debouncedSearch, page])

  useEffect(() => {
    fetchPeople()
  }, [params, fetchPeople])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Persons</CardTitle>
        <CardDescription>
          Create, edit, and manage your persons listings.
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-2 md:space-y-4">
        <DataTable
          columns={peopleColumns}
          data={people}
          page={page}
          count={count}
          params={params}
          setParams={setParams}
          searchByOptions={searchByOptions}
        >
          <AddPersonModal onSuccess={fetchPeople} />
        </DataTable>
      </CardContent>
    </Card>
  )
}
