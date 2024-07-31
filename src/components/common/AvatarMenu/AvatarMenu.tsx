import { useAuth0 } from '@auth0/auth0-react'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { useClickAway } from 'react-use'
import NotFoundImage from '@/assets/images/avatar-placeholder.jpeg'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useNavigate } from 'react-router-dom'

const AvatarMenu = () => {
  const [show, setShow] = useState(false)
  const { logout, user } = useAuth0()

  const menuRef = useRef(null)
  const profileBarRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  useClickAway(menuRef, (event) => {
    // Case : click profile menu bar
    if (profileBarRef.current && profileBarRef.current.contains(event?.target as Node)) {
      return
    }

    if (show) {
      setShow(false)
    }
  })

  useEffect(() => {
    setShow(false)
  }, [navigate])

  return (
    <>
      {user
      && (
        <>
          <div ref={profileBarRef} onClick={() => setShow(!show)} className="flex items-center gap-4 cursor-pointer hover:border-[0.5px] rounded-lg px-4 py-0.5">
            <LazyLoadImage
              src={user?.picture || '/assets/images/image-not-found.png'}
              className="w-6 h-6 rounded-full"
              onError={({ currentTarget }) => {
                currentTarget.onerror = null // prevents looping
                currentTarget.src = NotFoundImage
              }}
            />
            <div className="font-medium dark:text-black text-white hidden md:block ">
              <div className="text-sm w-12 truncate">{user?.given_name || user?.email}</div>
              <div className="text-xs text-gray-200 dark:text-gray-400">{user?.family_name}</div>
            </div>
            <div>
              {show ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>
          <div ref={menuRef}>
            <div id="userDropdown" className={`${!show && 'hidden'} absolute right-6 mt-2 z-10 dark:bg-white divide-y dark:divide-gray-100 rounded-lg shadow w-56 bg-gray-800 divide-gray-600`}>
              <div className="px-4 py-3 text-sm dark:text-gray-900 text-white">
                <div>{user?.name}</div>
                <div className="font-medium truncate">{user?.email}</div>
              </div>
              <ul className="py-2 text-sm dark:text-gray-700 text-gray-200" aria-labelledby="avatarButton">
                <li>
                  <Link to="/account" className="cursor-pointer block px-4 py-2 dark:hover:bg-gray-100 hover:bg-gray-600 hover:text-white dark:text-gray-700">Dashboard</Link>
                </li>
              </ul>
              <div className="py-1">
                <a onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="cursor-pointer block px-4 py-2 text-sm dark:text-gray-700 dark:hover:bg-gray-100 hover:bg-gray-600 text-gray-200 hover:text-white">Log out</a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AvatarMenu
