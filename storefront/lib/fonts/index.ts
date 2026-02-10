import { Geist, Geist_Mono  } from "next/font/google";

import { GeistPixelSquare } from "geist/font/pixel";

import { cn } from "@/lib/utils";

const geistSans = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});



export const fontsVariable = cn(geistMono.variable, geistSans.variable, GeistPixelSquare.variable);
