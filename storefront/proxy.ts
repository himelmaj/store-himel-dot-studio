import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"
import { NEXT_LOCALE_NAME, NEXT_LOCALE_MAX_AGE } from "./lib/contants/cookies"
import { routing } from "./i18n/routing"

const handleI18Routing = createMiddleware(routing)

const setLocaleCookie = (response: NextResponse, request: NextRequest) => {

  const locale = response.headers.get("x-middleware-request-x-next-intl-locale") ?? request.headers.get("accept-language")?.split(",")[0]

  const localeCookie = response.cookies.get(NEXT_LOCALE_NAME)

  if (locale && !localeCookie) response.cookies.set(NEXT_LOCALE_NAME, locale, { maxAge: NEXT_LOCALE_MAX_AGE })

  return response
}

export default async function proxy(request: NextRequest) {

  const response = handleI18Routing(request)

  return setLocaleCookie(response, request)
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp|.*\\..*).*)",
  ],
}
