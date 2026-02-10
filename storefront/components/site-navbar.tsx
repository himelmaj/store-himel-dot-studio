"use client"

import { X } from "lucide-react"
import { SetStateAction, Dispatch } from "react"
import { AnimatePresence, motion } from "motion/react"
import LocaleSwitcher from "./locale-switcher"
import SiteNavegation from "./site-navegation"


const StoreNavbar = ({ openMenu, setOpenMenu }: { openMenu: boolean, setOpenMenu: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <>
      <motion.nav className="fixed inset-0 w-screen h-screen items-center justify-center bg-transparent z-90 flex flex-col "
        variants={{
          closed: {
            y: "-100%",
            transition: {
              duration: 0.5,
              ease: [0.215, 0.61, 0.355, 1],
              staggerChildren: 0.0715,
              delay: 0.2
            }
          },
          open: {
            y: "0%",
            transition: {
              duration: 0.5,
              ease: [0.215, 0.61, 0.355, 1],
              when: "beforeChildren",
              staggerChildren: 0.0715,
              delay: 0.1
            }
          }
        }}
        initial={"closed"}
        animate={openMenu ? "open" : "closed"}
      >


        <div className="w-full h-full flex items-start justify-between">
          <AnimatePresence>
            <SiteNavegation openMenu={openMenu} />
          </AnimatePresence>

          <div className="py-5 px-15 flex flex-col items-start justify-start h-full">
            <h2>
              test
            </h2>
            <LocaleSwitcher />
          </div>

        </div>


      </motion.nav>

      {/* {openMenu && (

        <motion.button className=" inset-0 fixed z-110 " onClick={() => setOpenMenu(!openMenu)}>
          <X />
        </motion.button>
      )} */}
    </>
  )
}

export default StoreNavbar