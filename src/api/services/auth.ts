import { api } from "../api"

interface IRegisterBody {
  email: string
  password: string
}

async function register(body: IRegisterBody) {
  const response = await api.post("auth/signup", {
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

interface ISignInBody {
  email: string
  password: string
}

async function signIn(body: ISignInBody) {
  const response = await api.post("auth/signin", {
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

async function signOut() {
  const response = await api.delete("auth/signout")
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response
}

export { register, signIn, signOut }
