import Medusa from "@medusajs/js-sdk"
import { env } from "@/lib/config/env"

export const medusa = new Medusa({
  baseUrl: env.MEDUSA_BACKEND_URL,
  debug: env.NODE_ENV === "development",
  publishableKey: env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
})
