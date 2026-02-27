"use client"
import { Link } from "@/i18n/navigation"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const ProductCard = ({ 
  product, 
  className, 
  ...props 
}: { product: HttpTypes.StoreProduct } & React.ComponentProps<"article">) => {
    return (
        <article className={cn("h-full", className)} {...props}>
            <Link 
              href={`/product/${product.handle}`} 
              className="flex flex-col h-full w-full"
            >
                <div className="relative w-full overflow-hidden rounded-lg sm:rounded-xl">
                    <div className="h-full w-full">
                        <div className="relative aspect-square w-full">
                            <Image
                                src={product.thumbnail!}
                                alt={product.title}
                                fill
                                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                                priority
                                placeholder="blur"
                                blurDataURL={product.thumbnail!}
                                className="object-cover transition-transform duration-300 ease-out hover:scale-105 active:scale-95"
                            />
                        </div>
                    </div>
                </div>
                <p className="product-label mt-2 sm:mt-3 w-full text-center text-xs sm:text-sm uppercase leading-tight px-1 line-clamp-2">
                  {product.title}
                </p>
            </Link>
        </article>
    )
}

export default ProductCard