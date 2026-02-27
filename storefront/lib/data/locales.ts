"use server";

import { Locale } from "@/i18n/routing";
import { medusa } from "@/lib/medusa";
import { StoreLocale } from "@medusajs/types"


export const listLocales = async (): Promise<StoreLocale[]> => {

    const { locales } = await medusa.store.locale.list()

    return locales
}

export const getLocalesCodes = async (): Promise<StoreLocale["code"][]> => {

    const { locales } = await medusa.store.locale.list()

    const codes: StoreLocale["code"][] = locales.map(locale => locale.code)

    return codes
}