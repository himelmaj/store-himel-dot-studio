"use client"
import { Link, usePathname } from "@/i18n/navigation"
import { MenuIcon } from "lucide-react"
import StoreNavbar from "./site-navbar"
import { AnimatePresence, motion } from "motion/react"
import Image from "next/image"
import Logo from "@/public/logo.png"
import { useQueryState, parseAsBoolean } from 'nuqs'

const SiteMenu = () => {
  const [openMenu, setOpenMenu] = useQueryState(
    'menu',
    parseAsBoolean.withDefault(false).withOptions({ 
      shallow: true,
      history: 'push'
    })
  )
  
  const pathname = usePathname()
  
  const routes: Record<string, string> = {
    "/": "Store",
    "/info": "Info",
    "/sign-in": "Sign In",
    "/sign-up": "Sign Up"
  }
  
  const pathnameTitle: string | undefined = routes[pathname]
  
  const toggleMenu = () => {
    setOpenMenu(prev => !prev)
  }
  
  return (
    <>
      <AnimatePresence>
        <StoreNavbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      </AnimatePresence>
      
      <motion.div 
        className="w-[calc(100%-2rem)] sm:w-[calc(100%-4rem)] md:w-120 max-w-2xl bg-background z-10 border h-12 sm:h-10 items-center flex fixed bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 rounded-full sm:rounded-none shadow-lg sm:shadow-none"
        style={{
          transformOrigin: "center"
        }}
        variants={{
          open: {
            opacity: 1,
            transition: {
              duration: 0.7,
              ease: "easeInOut"
            }
          },
          closed: {
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
        {/* Logo */}
        <Link 
          href={"/"} 
          className="px-3 sm:px-4 flex items-center h-full z-20 shrink-0"
          aria-label="Home"
        >
          <Image 
            src={Logo} 
            width={24} 
            height={24} 
            alt="Logo"
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </Link>
        
        {/* Title - Hidden on very small screens */}
        <span className="hidden xs:block absolute left-1/2 -translate-x-1/2 uppercase pointer-events-none z-10 text-xs sm:text-sm font-medium truncate max-w-[40%] sm:max-w-none">
          {pathnameTitle}
        </span>
        
        {/* Menu Button */}
        <button 
          className="h-full flex-1 flex items-center border-0 appearance-none active:scale-95 transition-transform" 
          onClick={toggleMenu}
          aria-label={openMenu ? "Close menu" : "Open menu"}
          aria-expanded={openMenu}
        >
          <div className="ml-auto px-3 sm:px-4">
            <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </button>
      </motion.div>
    </>
  )
}

export default SiteMenu