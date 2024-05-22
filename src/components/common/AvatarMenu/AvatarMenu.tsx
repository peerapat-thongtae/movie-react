import { useAuth0 } from '@auth0/auth0-react'
import { useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useClickAway } from 'react-use'

const AvatarMenu = () => {
  const [show, setShow] = useState(false)
  const { logout, user } = useAuth0()

  const menuRef = useRef(null)
  const profileBarRef = useRef<HTMLInputElement>(null)
  useClickAway(profileBarRef, (event) => {
    // Case : click profile menu bar
    if (profileBarRef.current && profileBarRef.current.contains(event?.target as Node)) {
      return
    }

    if (show) {
      setShow(false)
    }
  })

  return (
    <>
      {user
      && (
        <>
          <div ref={profileBarRef} onClick={() => setShow(!show)} className="flex items-center gap-4 cursor-pointer">
            <LazyLoadImage
              src={user?.picture || '/assets/images/image-not-found.png'}
              className="w-8 h-8 rounded-full cursor-pointer"
            />
            <div className="font-medium dark:text-black text-white">
              <div className="text-sm">{user?.given_name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{user?.family_name}</div>
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
                  <a href="#" className="block px-4 py-2 dark:hover:bg-gray-100 hover:bg-gray-600 hover:text-white dark:text-gray-700">Dashboard</a>
                </li>
              </ul>
              <div className="py-1">
                <a onClick={() => logout()} className="cursor-pointer block px-4 py-2 text-sm dark:text-gray-700 dark:hover:bg-gray-100 hover:bg-gray-600 text-gray-200 hover:text-white">Log out</a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AvatarMenu
