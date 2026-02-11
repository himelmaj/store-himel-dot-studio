import "@/lib/config/env"
import { env } from "@/lib/config/env";

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
            },
            {
                protocol: "https",
                hostname: "medusa-public-images.s3.eu-west-1.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "medusa-server-testing.s3.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "medusa-server-testing.s3.us-east-1.amazonaws.com",
            }
        ],
        dangerouslyAllowLocalIP: env.NODE_ENV === 'development'
    }

};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
