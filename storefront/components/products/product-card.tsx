"use client"

import { Link } from "@/i18n/navigation"
import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const ProductCard = ({ product, className, ...props }: { product: HttpTypes.StoreProduct } & React.ComponentProps<"article">) => {

    return (
        <article className={cn(className)} {...props}>
            <Link href={`/product/${product.handle}`} className="z-10 w-full max-w-full text-center whitespace-nowrap uppercase">
                <div className="relative w-full overflow-hidden">
                    <div className="h-full w-full">
                        <div className="relative aspect-square w-full max-w-full">
                            <Image
                                src={product.thumbnail!}
                                alt={product.title}
                                width={375}
                                height={375}
                                sizes="(max-width: 767px) 375px, 560px"
                                priority
                                placeholder="blur"
                                blurDataURL={product.thumbnail!}
                                className={cn(
                                    // "absolute inset-0 h-full w-full scale-(--scale) ease-in-out hover:scale-105 transform object-contain select-none transition-opacity duration-500 opacity-100"
                                    "transform transition-transform duration-300 ease-out hover:scale-105 shadow"
                                )}
                            />
                        </div>
                    </div>
                </div>
                <p className="product-label z-10 w-full max-w-full text-center whitespace-nowrap uppercase">{product.title}</p>
            </Link>
        </article>
    )
}

export default ProductCard