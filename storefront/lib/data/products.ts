"use server";

import { medusa } from "@/lib/medusa";
import { HttpTypes } from "@medusajs/types"
import { getRegion, retrieveRegion } from "./regions"
import { getAuthHeaders, 
  // getCacheOptions 
} from "./cookies"
import { getLocaleHeader } from "./cookies"

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
  countryCode?: string
  regionId?: string
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number }
  nextPage: number | null
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductListParams
}> => {

  if (!countryCode && !regionId) {
    throw new Error("Country code or region ID is required")
  }

  const limit = queryParams?.limit || 12
  const _pageParam = Math.max(pageParam, 1)
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit

  let region: HttpTypes.StoreRegion | undefined | null

  if (countryCode) {
    region = await getRegion(countryCode)
  } else {
    region = await retrieveRegion(regionId!)
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    }
  }

  const headers = {
    ...(await getAuthHeaders()),
  }

  // const next = {
  //   ...(await getCacheOptions("products")),
  // }

  return medusa.client
    .fetch<{ products: HttpTypes.StoreProduct[]; count: number }>(
      `/store/products`,
      {
        method: "GET",
        query: {
          limit,
          offset,
          region_id: region?.id,
          fields:
            "+metadata,+tags,",
          ...queryParams,
        },
        headers,
        // next: { revalidate: 60, ...next },
        cache: "no-cache",
      }
    )
    .then(({ products, count }) => {
      const nextPage = count > offset + limit ? pageParam + 1 : null

      return {
        response: {
          products,
          count,
        },
        nextPage: nextPage,
        queryParams,
      }
    })
}


// export const getProducts = async ({ page, region }: { page: number, region: HttpTypes.StoreRegion }):
export const getProducts = async ({ region }: { page: number, region: HttpTypes.StoreRegion }):

  Promise<{
    products: HttpTypes.StoreProduct[]; count: number, offset: number, limit: number
  }> => {

  const headers = {
    ...(await getAuthHeaders()),
    // "x-medusa-locale": "es-ES"
    ...(await getLocaleHeader())
  }

  // console.log(await getLocaleHeader())

  const { products, count, offset, limit } = await medusa.store.product.list({
    fields: "id,title,handle,thumbnail,metadata,images,*variants.calculated_price",
    region_id: region?.id,
  }, headers)

  const {} = await medusa.client.fetch<{products: HttpTypes.StoreProduct[]; count: number; offset: number; limit: number}>('/store/products', {
    headers: headers
  })

  return { products, count, offset, limit }
}