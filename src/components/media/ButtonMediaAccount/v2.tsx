// import useMediaAccountState from '@/shared/hooks/useMediaAccountState'
import Popper from '@mui/material/Popper'
import { ClickAwayListener } from '@mui/material'
import { FaSpinner, FaStar } from 'react-icons/fa'
import { useMemo, useState } from 'react'
import { MdBookmarkAdd } from 'react-icons/md'
import { TbProgressCheck } from 'react-icons/tb'
import { useMediaAccountStateById } from '@/hooks/useMedia'
import { FaCheck } from 'react-icons/fa6'

const ButtonMediaAccount = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const media = props.media
  const mediaType = props.mediaType || media.media_type || 'movie'
  // const disabledAccountState = props.disabledAccountState
  const { data: accountState, isLoading, addToWatchlist, addRated } = useMediaAccountStateById(mediaType, media.id)
  // const mediaStatus = useMemo(() => {
  //   if (accountState) {
  //     if (mediaType === 'movie') {
  //       if (accountState.watchlist === true) {
  //         return 'watchlist'
  //       }
  //       if (accountState.watched === true) {
  //         return 'watched'
  //       }
  //       return ''
  //     }
  //     else {
  //       if (media.number_of_episodes === accountState.episode_watched.length) {
  //         return 'watched'
  //       }
  //       else if (accountState.episode_watched.length > 0) {
  //         return 'watching'
  //       }
  //       else {
  //         return 'watchlist'
  //       }
  //     }
  //   }

  //   return ''
  // }, [accountState])
  const mediaStatus = useMemo(() => {
    return accountState?.account_status || ''
  }, [media, accountState, isLoading])

  const iconState = useMemo(() => {
    const color = mediaStatus
      || isLoading
      ? 'yellow'
      : 'white'
    if (isLoading) {
      return <FaSpinner className="animate-spin" color={color} />
    }

    if (mediaStatus === 'watching') {
      return <TbProgressCheck size={20} className={`${isLoading && 'animate-spin'} `} color={color} />
    }

    if (mediaStatus !== 'watched') {
      return <FaStar size={20} className={`${isLoading && 'animate-spin'} stroke-black stroke-[20px]`} color={color} />
    }
    else {
      return <FaCheck size={20} className={`${isLoading && 'animate-spin'} stroke-black stroke-[20px]`} color={color} />
    }
  }, [mediaStatus, isLoading, media])

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const clickWatchlist = () => {
    // setLoading(true);
    setAnchorEl(null)
    addToWatchlist(!accountState?.watchlist)
    // movie.my_states = new_state;
  }

  const clickWatched = () => {
    setAnchorEl(null)
    addRated()
  }
  return (
    <>
      <button className="" onClick={handleClick}>
        {iconState}
      </button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className="z-[99]"
      >
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <div
            aria-describedby={id}
            className="mt-2 w-100 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-[9999]"
          >
            <div className="py-1" role="">
              <div
                className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm cursor-pointer"
                role="menuitem"
                id="menu-item-1"
                // onClick={clickWatchlist}
                onClick={clickWatchlist}
              >
                <div className="flex items-center gap-1">
                  <MdBookmarkAdd size={20} className={`${mediaStatus === 'watchlist' ? 'text-yellow-500' : 'text-black'}`} />
                  <span>Watchlist</span>
                </div>
              </div>
              <div
                className="text-gray-700 hover:bg-gray-200 block px-4 py-2 text-sm cursor-pointer"
                role="menuitem"
                id="menu-item-2"
                // onClick={() => { props.setShowPopOverRating(true); props.setShowPopOver(false)}}
                onClick={clickWatched}
              >
                <div className="flex items-center gap-1">
                  /
                  <FaCheck size={20} className={`${mediaStatus === 'watched' ? 'text-yellow-500' : 'text-black'}`} />
                  <span>
                    Watched
                  </span>
                </div>
              </div>
            </div>
          </div>
        </ClickAwayListener>
      </Popper>

    </>

  )
}

export default ButtonMediaAccount
