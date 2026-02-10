"use client"

import { Link, usePathname } from "@/i18n/navigation"
import { MenuIcon } from "lucide-react"
import { useState } from "react"
import StoreNavbar from "./site-navbar"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import Logo from "@/public/logo.png"

const SiteMenu = () => {

  const [openMenu, setOpenMenu] = useState<boolean>(false)

  const pathname = usePathname()

  const routes: Record<string, string> = {
    "/": "Store",
    "/info": "Info",
    "/sign-in": "Sign In",
    "/sign-up": "Sign Up"
  }

  const pathnameTitle: string | undefined = routes[pathname]

  return (
    <>

      {/* <button onClick={() => setOpenMenu(!openMenu)}>
        close
      </button> */}

      <AnimatePresence>
        <StoreNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </AnimatePresence>

      <motion.div className="md:w-120 bg-background z-10 border h-10 items-center flex fixed bottom-8 left-1/2 -translate-x-1/2"
        style={{
          transformOrigin: "center"
        }}
        variants={{
          open: {
            // clipPath: "inset(0% 0% 0% 0%)",
            // scaleX: 1,
            opacity: 1,
            transition: {
              duration: 0.7,
              ease: "easeInOut"
            }
          },
          closed: {
            // clipPath: "inset(50% 0% 50% 0%)",
            // scaleX: 0,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeInOut"
            }
          }
        }}
        initial="open"
        animate={openMenu ? "closed" : "open"}
      >
        <Link href={"/"} className="px-4 flex items-center h-full z-20">
          <Image src={Logo} width={24} height={24} alt="Logo"/>
        </Link>

        <span className="absolute left-1/2 -translate-x-1/2 uppercase pointer-events-none z-10 ">
          {pathnameTitle}
        </span>

        <button className="h-full flex-1 flex items-center border-0 appearance-none " onClick={() => setOpenMenu(!openMenu)}>
          <div className="ml-auto px-4">
            <MenuIcon />
          </div>
        </button>
      </motion.div>
    </>
  )
}

export default SiteMenu