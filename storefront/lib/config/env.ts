import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
    client: {
        NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: z.string().min(1),
        NEXT_PUBLIC_BASE_URL: z.url().default("http://localhost:8000"),
        NEXT_PUBLIC_DEFAULT_REGION: z.string().default("es"),
        NEXT_PUBLIC_STRIPE_KEY: z.string().min(1),
        NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY: z.string().min(1),
        NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID: z.string()
    },

    server: {
        REVALIDATE_SECRET: z.string().min(1),
        // MEDUSA_CLOUD_S3_HOSTNAME: z.string().min(1),
        // MEDUSA_CLOUD_S3_PATHNAME: z.string().min(1)
    },

    shared: {
        MEDUSA_BACKEND_URL: z.url().default("http://localhost:9000"),
        NODE_ENV: z.string().min(1)
    },

    runtimeEnv: {
        MEDUSA_BACKEND_URL: process.env.MEDUSA_BACKEND_URL,
        NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URLM,
        NEXT_PUBLIC_DEFAULT_REGION: process.env.NEXT_PUBLIC_DEFAULT_REGION,
        NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
        NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY,
        NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID: process.env.NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID,
        REVALIDATE_SECRET: process.env.REVALIDATE_SECRET,
        // MEDUSA_CLOUD_S3_HOSTNAME: process.env.MEDUSA_CLOUD_S3_HOSTNAME,
        // MEDUSA_CLOUD_S3_PATHNAME: process.env.MEDUSA_CLOUD_S3_PATHNAME,
        NODE_ENV: process.env.NODE_ENV
    }
})