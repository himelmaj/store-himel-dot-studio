import type { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing, LOCALE_COOKIE_CONFIG } from "@/i18n/routing";


const handleI18Routing = createMiddleware(routing);


const setLocaleCookie = (response: NextResponse, request: NextRequest) => {

	const locale = response.headers.get("x-middleware-request-x-next-intl-locale") ?? request.headers.get("accept-language")?.split(",")[0]
  
	const localeCookie = response.cookies.get(LOCALE_COOKIE_CONFIG.name)
  
	if (locale && !localeCookie) response.cookies.set(LOCALE_COOKIE_CONFIG.name, locale, { maxAge: LOCALE_COOKIE_CONFIG.maxAge })
  
	return response
  }

export default async function proxy(request: NextRequest) {
	const response = handleI18Routing(request);

	return setLocaleCookie(response, request)
}

export const config = {
	matcher: [
		"/((?!api|trpc|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp|.*\\..*).*)",
	],
};
