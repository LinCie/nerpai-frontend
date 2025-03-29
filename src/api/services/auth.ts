import { api } from "../api"

interface IRegisterBody {
  email: string
  password: string
}

async function register(body: IRegisterBody) {
  const response = await api.post("register", {
    headers: {
      "content-type": "application/json",
    },
    json: body,
  })

  if (response.ok) {
    return response.json()
  }

  throw new Error(response.statusText)
}

export { register }
