import { cn } from '@/utils/tailwind.helper'
import { useState } from 'react'
import ReactPlayer from 'react-player'

interface VideoProps {
  // { width, height, video, muted, setEnded, setStart }
  width: string
  height: string
  video: string
  muted?: boolean
  setEnded?: any
  setStart?: any
}
const Video = (props: VideoProps) => {
  const { muted, width, height, video } = props
  const [loaded, setLoaded] = useState(false)
  const isMuted = muted || false

  const onLoad = () => {
    setTimeout(() => {
      props.setStart && props.setStart(true)
      setLoaded(true)
    }, 500)
  }
  return (
    <div className={cn('hidden transition-all duration-300 ease-in', loaded ? 'block' : 'hidden', `h-[${height}] w-[${width}]`)}>
      <ReactPlayer
        // style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%', border: 'none', margin: 0, padding: 0, overflow: 'hidden' }}
        className={cn('frame-container bg-transparent rounded-lg !w-full !h-full')}
        onStart={() => onLoad()}
        onEnded={() => props.setEnded && props.setEnded(true)}
        url={`https://www.youtube.com/watch?v=${video}`}
        muted={isMuted}
        height={height}
        width={width}
        playing={true}
        controls={false}
        config={{
          youtube: {
            playerVars: { showinfo: 0, rel: 0, controls: 0, iv_load_policy: 3, cc_load_policy: 3 },
          },
        }}
      />
    </div>
  )
}

export default Video
