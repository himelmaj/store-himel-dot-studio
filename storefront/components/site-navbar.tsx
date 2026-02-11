"use client"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import LocaleSwitcher from "./locale-switcher"
import SiteNavegation from "./site-navegation"

const StoreNavbar = ({ 
  openMenu, 
  setOpenMenu 
}: { 
  openMenu: boolean
  setOpenMenu: (value: boolean | ((old: boolean) => boolean | null) | null) => Promise<URLSearchParams>
}) => {
  
  const handleClose = () => {
    setOpenMenu(false) // No necesitas await aquí
  }

  return (
    <>
      <motion.nav 
        className="fixed inset-0 w-screen h-screen items-center justify-center bg-transparent z-90 flex flex-col"
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
        <div className="w-full h-full flex flex-col md:flex-row items-start justify-between p-4 sm:p-6 md:p-0">
          <AnimatePresence>
            <SiteNavegation openMenu={openMenu} />
          </AnimatePresence>
          
          <div className="w-full md:w-auto py-4 px-4 sm:py-5 sm:px-8 md:px-15 flex flex-col items-start justify-start h-auto md:h-full gap-4 sm:gap-6">
            <h2 className="text-lg sm:text-xl md:text-2xl">
              test
            </h2>
            <LocaleSwitcher />
            
            {openMenu && (
              <motion.button 
                className="flex items-center " 
                onClick={handleClose}
                // initial={{ opacity: 0, y: -10 }}
                // animate={{ opacity: 1, y: 0 }}
                // exit={{ opacity: 0, y: -10 }}
                // transition={{ duration: 0.2 }}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">Close</span>
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default StoreNavbar