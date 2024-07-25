import { cn } from '@/utils/tailwind.helper'
import { FaSpinner } from 'react-icons/fa6'

interface LoadingProps {
  textLoading?: string
  className?: string
}

const Loading2 = (props: LoadingProps) => {
  return (
    <div className={cn(`overlay-content align-center w-full`, props.className)}>
      <div className="wrapper">
        <div className="pacmancontainer">
          <div className="pacman" />
          <div className="pacman pac2" />
          <h2 className="animate font-bold text-2xl dark:text-black text-white">
            {props?.textLoading || 'Loading...' }
          </h2>
        </div>
      </div>
    </div>
  )
}

const Loading = (props: LoadingProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <FaSpinner size="40" className="text-yellow-500 animate-spin" />
    </div>
  )
}

export default Loading
