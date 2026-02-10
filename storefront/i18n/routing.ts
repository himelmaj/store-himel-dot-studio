// i18n/routing.ts
import { defineRouting } from "next-intl/routing";

export const LOCALES = ["en-US", "es-ES"] as const;
export const DEFAULT_LOCALE = "en-US" satisfies (typeof LOCALES)[number];

export type Locale = (typeof LOCALES)[number];

export const LOCALES_PREFIXES = {
	"en-US": "/en/us",
	"es-ES": "/es",
} as const satisfies Record<Locale, string>;

const LOCALE_COOKIE_CONFIG = {
	name: "NEXT_LOCALE",
	maxAge: 60 * 60 * 24 * 7,
	sameSite: "lax",
} as const;

const LOCALE_PREFIX_CONFIG = {
	mode: "always",
	prefixes: LOCALES_PREFIXES,
} as const;

export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
	localeDetection: true,
	localeCookie: LOCALE_COOKIE_CONFIG,
	localePrefix: LOCALE_PREFIX_CONFIG,
});

export const { locales, defaultLocale, localeCookie } = routing;
