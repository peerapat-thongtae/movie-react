import { cn } from '@/utils/tailwind.helper'

interface LoadingProps {
  textLoading?: string
  className?: string
}

const Loading = (props: LoadingProps) => {
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

export default Loading
