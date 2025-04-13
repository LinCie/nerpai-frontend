import { IPerson, personSchema } from "@/schema/person"
import { z } from "zod"
import { api } from "../api"

async function getPeople(
  page: number = 1,
  show: number = 10,
  search: string = "",
  searchBy: string = "",
) {
  const response = await api.get<{ people: IPerson[]; count: number }>(
    "people",
    {
      searchParams: { page, show, search, searchBy },
    },
  )

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response
}

async function createPerson(body: z.output<typeof personSchema>) {
  const response = await api.post<IPerson>("people", {
    headers: {
      "content-type": "application/json",
    },
    json: body,
  })

  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response
}

export { createPerson, getPeople }
