import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { listenForOutsideClick } from '@/utils/click-outside'

const Navbar = () => {
  const [showNav, setShowNav] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigate = useNavigate()

  const navbarRef = useRef(null)
  const [listening, setListening] = useState(false)
  const toggle = () => setShowNav(!showNav)

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
    <div ref={navbarRef} className={`fixed top-0 z-50  w-full items-center justify-between px-4 py-4 transition-all lg:px-10 lg:py-6 text-white ${isScrolled && 'bg-[#141414]'} hover:bg-[#141414]`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div onClick={() => navigate('/')} className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Movizius</span>
        </div>
        <button onClick={() => toggle()} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${!showNav && 'hidden'} w-full md:block md:w-auto lg:hidden" id="navbar-default`}>
          <MenuItems />
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
        menus.map(menu =>
          (
            <li>
              <span
                onClick={() => onClickTitle(menu.path)}
                className={`block py-2 px-3 text-white rounded md:bg-transparent cursor-pointer hover:text-yellow-500 ${isActivePath(menu.path) && 'text-yellow-500'}`}
              >
                {menu.title}
              </span>
            </li>
          ),
        )
      )}
      {/* <li>
        <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
      </li>
      <li>
        <a href="#" className="block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
      </li> */}
    </ul>
  )
}

export default Navbar
