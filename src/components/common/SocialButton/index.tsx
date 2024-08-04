import { useMemo } from 'react'
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa6'
import { SiImdb, SiThemoviedatabase } from 'react-icons/si'

type ProviderType = 'facebook' | 'instagram' | 'imdb' | 'tmdb'
type SizeType = '' | 'large' | 'small'
interface SocialButtonProps {
  onClick?: () => void
  provider: ProviderType
  label: string
  showDetail?: boolean
  size?: SizeType
  to?: string
}
export const _SocialButton2 = (props: SocialButtonProps) => {
  const { provider, onClick, label } = props
  const showDetail = props.showDetail
  const size: SizeType = props.size || ''

  const iconClass = 'w-6 h-6 shrink-0'
  const colorClass = useMemo(() => {
    if (provider === 'facebook') {
      return 'hover:bg-sky-600 bg-sky-700 before:bg-sky-700 before:hover:bg-sky-600'
    }

    if (provider === 'instagram') {
      return 'hover:bg-pink-600 bg-pink-700 before:bg-pink-700 before:hover:bg-pink-600'
    }

    if (provider === 'imdb') {
      return 'hover:bg-yellow-600 bg-yellow-700 before:bg-yellow-700 before:hover:bg-yellow-600'
    }

    if (provider === 'tmdb') {
      return 'hover:bg-blue-600 bg-blue-700 before:bg-blue-700 before:hover:bg-blue-600'
    }
  }, [provider])

  const sizeClass = useMemo(() => {
    if (size === 'large') {
      return 'w-12 h-12'
    }

    if (size === 'small') {
      return 'w-10 h-10'
    }

    return 'w-12 h-12'
  }, [size])

  return (
    <button
      className={`group ${showDetail && 'hover:w-44'} ${sizeClass} relative
      rounded text-neutral-50 duration-700 before:duration-700
      before:hover:500 font-bold flex justify-start gap-2 items-center p-2 pr-6
      before:absolute before:-z-10 before:left-8 before:hover:left-40 before:w-6
      before:h-6 before:rotate-45 ${colorClass}`}
      onClick={onClick}
    >
      <span className="">
        {provider === 'facebook' && <BsFacebook className={iconClass} />}
        {provider === 'instagram' && <BsInstagram className={iconClass} />}
        {provider === 'imdb' && <SiImdb className={iconClass} />}
        {provider === 'tmdb' && <SiThemoviedatabase className={iconClass} />}
      </span>
      <span
        className={`${!showDetail && 'hidden'} truncate origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-2 transform scale-x-0 group-hover:scale-x-100 transition-all`}
      >
        <div className="animate-marquee whitespace-nowrap">
          {label}
        </div>

      </span>
    </button>
  )
}

const SocialButton = (props: SocialButtonProps) => {
  const { onClick, provider } = props
  const size: SizeType = props.size || ''

  const colorClass = useMemo(() => {
    if (provider === 'facebook') {
      return 'hover:bg-sky-600 before:bg-sky-700 before:hover:bg-sky-600'
    }

    if (provider === 'instagram') {
      return 'hover:bg-pink-600  before:bg-pink-700 before:hover:bg-pink-600'
    }

    if (provider === 'imdb') {
      return 'hover:bg-yellow-600 before:bg-yellow-700 before:hover:bg-yellow-600'
    }

    if (provider === 'tmdb') {
      return 'hover:bg-blue-600 before:bg-blue-700 before:hover:bg-blue-600'
    }
  }, [provider])

  const sizeClass = useMemo(() => {
    if (size === 'large') {
      return 'w-12 h-12'
    }

    if (size === 'small') {
      return 'w-10 h-10'
    }

    return 'w-12 h-12'
  }, [size])
  return (
    <div
      className={`group cursor-pointer rounded-full ${sizeClass}
       hover:border-0 border border-yellow-500 ${colorClass}`}
      onClick={onClick}
    >
      <div className="w-full h-full flex justify-center items-center ">
        {provider === 'facebook' && <FaFacebookF size="20" />}
        {provider === 'instagram' && <BsInstagram size="20" />}
        {provider === 'imdb' && <SiImdb size="20" />}
        {provider === 'tmdb' && <SiThemoviedatabase size="20" />}
      </div>
      {/* <span
        className={`${!showDetail && 'hidden'} truncate origin-left inline-flex duration-100 group-hover:duration-300 group-hover:delay-500 opacity-0 group-hover:opacity-100 border-l-2 px-2 transform scale-x-0 group-hover:scale-x-100 transition-all`}
      >
        <div className="animate-marquee whitespace-nowrap">
          {label}
        </div>

      </span> */}
    </div>
  )
}

export default SocialButton
