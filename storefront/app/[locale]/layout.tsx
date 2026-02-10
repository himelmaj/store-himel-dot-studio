import "@/styles/globals.css";

// import { env } from "@store/env/server";

// SEO
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
	title: "store",
	description: "store",
};

// Fonts

// Locale
import { notFound } from "next/navigation";
import { hasLocale, type Locale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";
import { fontsVariable } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default async function AppLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode;
	params: Promise<{ locale: Locale }>;
}>) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={cn(fontsVariable, "bg-neutral-950 antialiased")}>
				{/* {env.NODE_ENV === "development" && (
					<Script
						id="react-scan"
						crossOrigin="anonymous"
						src="https://unpkg.com/react-scan/dist/auto.global.js"
						strategy="afterInteractive"
					/>
				)} */}
				<NextIntlClientProvider>
					<Providers>{children}</Providers>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
