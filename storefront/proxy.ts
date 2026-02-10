import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

const handleI18Routing = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
	const response = handleI18Routing(request);

	return response;
}

export const config = {
	matcher: [
		"/((?!api|trpc|_next/static|_next/image|favicon.ico|images|assets|png|svg|jpg|jpeg|gif|webp|.*\\..*).*)",
	],
};
