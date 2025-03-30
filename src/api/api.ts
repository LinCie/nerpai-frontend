import { getCookie } from "@/lib/utils"
import ky from "ky"

const api = ky
  .create({
    prefixUrl: "http://localhost:8000",
  })
  .extend({
    hooks: {
      beforeRequest: [
        (request) => {
          const token = getCookie("XSRF-TOKEN")

          if (token) {
            request.headers.set("X-XSRF-TOKEN", decodeURIComponent(token))
          }
        },
      ],
    },
  })

export { api }
