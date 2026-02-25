import "server-only"
import { cookies as nextCookies } from "next/headers"
import { NEXT_LOCALE_MAX_AGE, NEXT_LOCALE_NAME } from "@/lib/contants/cookies";

// retun {} but lint warning and i decided returning undefined
export const getAuthHeaders = async (): Promise<
  { authorization: string } | undefined
> => {
  try {
    const cookies = await nextCookies()
    const token = cookies.get("_medusa_jwt")?.value

    if (!token) return
    return { authorization: `Bearer ${token}` }
  } catch {
    return
  }
}

export const getCacheTag = async (tag: string): Promise<string> => {
  try {
    const cookies = await nextCookies()
    const cacheId = cookies.get("_medusa_cache_id")?.value

    if (!cacheId) {
      return ""
    }

    return `${tag}-${cacheId}`
  } catch (error) {
    return `${error}`
  }
}

// retun {} but lint warning and i decided returning undefined
export const getCacheOptions = async (
  tag: string
): Promise<{ tags: string[] } | undefined> => {
  if (typeof window !== "undefined") {
    return
  }

  const cacheTag = await getCacheTag(tag)

  if (!cacheTag) {
    return
  }

  return { tags: [`${cacheTag}`] }
}

export const setAuthToken = async (token: string) => {
  const cookies = await nextCookies()
  cookies.set("_medusa_jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export const removeAuthToken = async () => {
  const cookies = await nextCookies()
  cookies.set("_medusa_jwt", "", {
    maxAge: -1,
  })
}

export const getCartId = async () => {
  const cookies = await nextCookies()
  return cookies.get("_medusa_cart_id")?.value
}

export const setCartId = async (cartId: string) => {
  const cookies = await nextCookies()
  cookies.set("_medusa_cart_id", cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  })
}

export const removeCartId = async () => {
  const cookies = await nextCookies()
  cookies.set("_medusa_cart_id", "", {
    maxAge: -1,
  })
}

export const setLocale = async (locale: string) => {
  const cookies_ = await nextCookies()
  cookies_.set(NEXT_LOCALE_NAME, locale, { maxAge: NEXT_LOCALE_MAX_AGE })
}

export const getLocaleHeader = async () => {
  try {
    const cookies_ = await nextCookies()
    const locale = cookies_.get(NEXT_LOCALE_NAME)?.value
    return { "x-medusa-locale": locale }
  } catch {
    { }
  }
}

export const setRegion = async (regionId: string) => {
  try {
    const cookies_ = await nextCookies()
    cookies_.set('region_id', regionId, {
      maxAge: 60 * 60 * 24 * 365,
    })
  } catch {
    { }
  }
}