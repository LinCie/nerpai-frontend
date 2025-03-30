import ky from "ky"
import { api } from "../api"

interface IRegisterBody {
  email: string
  password: string
}

async function register(body: IRegisterBody) {
  await ky.get("http://localhost:8000/sanctum/csrf-cookie", {
    credentials: "include",
  })

  const response = await api.post("register", {
    headers: {
      "content-type": "application/json",
    },
    json: body,
    credentials: "include",
  })

  if (response.ok) {
    return response.json()
  }

  throw new Error(response.statusText)
}

export { register }
