"use client"

import ProductCard from './product-card'
import { HttpTypes } from "@medusajs/types"
import { useMemo } from 'react'
import { motion } from "motion/react"

const ProductsGrid = ({ products }: { products: HttpTypes.StoreProduct[] }) => {

  const delays = useMemo(
    () => products.map(() => Math.random()),
    [products.length]
  )

  return (
    <ul className='relative sm:grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 flex flex-wrap h-full w-full overflow-x-hidden overflow-y-auto scroll-smooth pb-30 no-scrollbar'
    >
      {products.map((product, index) => {
        return (
          <motion.li
            key={product.id}
            className='cursor-pointer outline-none focus:outline-none active:outline-none '
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: delays[index],
              duration: 0.25,
              ease: "easeOut"
            }}
          >
            <ProductCard product={product} className='product-card' />
          </motion.li>
        )
      })}
    </ul>
  )
}

export default ProductsGrid