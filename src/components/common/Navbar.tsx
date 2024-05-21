import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { listenForOutsideClick } from '@/utils/click-outside'
import { useTheme } from '@/contexts/theme-context'
import { FiMoon, FiSun } from 'react-icons/fi'

const Navbar = () => {
  const [showNav, setShowNav] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()
  const { darkTheme, toggleTheme } = useTheme()

  const navbarRef = useRef(null)
  const [listening, setListening] = useState(false)
  const toggleNavbar = () => setShowNav(!showNav)

  useEffect(listenForOutsideClick(
    listening,
    setListening,
    navbarRef,
    setShowNav,
  ))

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      }
      else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div ref={navbarRef} className={`fixed top-0 z-50  w-full items-center justify-between px-4 py-4 transition-all lg:px-10 lg:py-2 text-white ${isScrolled && 'bg-[#141414] dark:bg-primary-light'} dark:hover:bg-secondary-light hover:bg-[#141414]`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between p-4">
        <div onClick={() => navigate('/')} className="flex flex-1 items-center space-x-3 rtl:space-x-reverse cursor-pointer">
          <img src="/movizius.svg" className="h-8" alt="Movizius" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-yellow-700">Movizius</span>
        </div>
        <button onClick={() => toggleNavbar()} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${!showNav && 'hidden'} w-full md:block md:w-auto flex-1 bg-red-500 lg:hidden"`} id="navbar-default">
          <MenuItems />
        </div>
        <div className="">
          <span
            onClick={() => toggleTheme()}
            aria-label="Theme Switcher"
            className="lg:md:block hidden ml-0 dark:bg-primary-dark dark:bg-opacity-5 bg-ternary-dark p-3 shadow-sm rounded-xl cursor-pointer"
          >
            {darkTheme
              ? (
                <FiMoon className="text-gray-200 hover:text-gray-400 text-xl" />
              )
              : (
                <FiSun className="text-gray-500 hover:text-ternary-dark text-xl" />
              )}
          </span>
        </div>
      </div>
    </div>
  )
}

interface IMenuItem {
  title: string
  path: string
}
const MenuItems = () => {
  const menus: IMenuItem[] = [
    {
      path: '/',
      title: 'Home',
    },
    {
      path: '/movie',
      title: 'Movie',
    },
    {
      path: '/tv',
      title: 'TV Show',
    },
    {
      path: '/schedule',
      title: 'Schedule',
    },
  ]

  const location = useLocation()
  const navigate = useNavigate()

  const isActivePath = (path: string) => {
    if (path === location.pathname) {
      return true
    }

    return false
  }

  const onClickTitle = (path: string) => {
    navigate(path)
  }
  return (
    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
      {menus && menus.length > 0
      && (
        menus.map((menu, index) =>
          (
            <li key={index}>
              <span
                onClick={() => onClickTitle(menu.path)}
                className={`font-bold block py-2 px-3 text-white rounded md:bg-transparent cursor-pointer dark:hover:text-yellow-500 hover:text-yellow-500 dark:text-primary-dark ${isActivePath(menu.path) && 'text-yellow-500 dark:text-yellow-500'}`}
              >
                {menu.title}
              </span>
            </li>
          ),
        )
      )}
    </ul>
  )
}

export default Navbar