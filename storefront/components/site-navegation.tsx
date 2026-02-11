"use client"

import React from "react"
import { motion } from "motion/react"
import { usePathname, Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const routes = [
    { href: "/", label: "Store" },
    { href: "/info", label: "Info" },
    { href: "/cart", label: "Cart" },
] as const;

const SiteNavegation = ({ openMenu }: { openMenu: boolean }) => {

    const pathname = usePathname()

    return (
        <motion.ul className="py-5 px-15 flex flex-col items-start justify-start h-full">
            {routes.map(({ href, label }) => {

                const currentPathname = pathname === href;
                return (
                    <div key={href} className={`flex items-center justify-between gap-2 group-${!currentPathname && "hover:translate-x-5"} transition-all duration-500`}>

                        <motion.div
                            className="flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: openMenu ? 1 : 0,
                                y: openMenu ? 0 : 50,
                                transition: {

                                    duration: 0.25,
                                    delay: openMenu ? 0.75 : 0,
                                }
                            }}
                        >
                            <span className={
                                cn("absolute w-2.5 h-2.5 rounded-full opacity-0",
                                    (currentPathname ? "bg-background opacity-100 -translate-x-5" : "bg-background/50 group-hover:-translate-x-5 group-hover:opacity-100"),
                                    "transition-all duration-250")} />
                        </motion.div>
                        <motion.li variants={{
                            closed: {
                                transition: {
                                    staggerChildren: 0.025
                                }
                            },
                            open: {
                                transition: {
                                    staggerChildren: 0.025
                                }
                            }
                        }} className="overflow-hidden">
                            <Link href={href} className=" block cursor">
                                <span className="text-9xl uppercase font-pixel">{label}</span>
                            </Link>
                        </motion.li>
                    </div>
                )
            })}
        </motion.ul>
    )
}

export default SiteNavegation