import { cn } from '@/utils/tailwind.helper'
import { useRef, useState } from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import ReactPlayer from 'react-player'

const DemoComponent = ({ width, height, videoKey, muted }: any) => {
  const [loaded, setLoaded] = useState(false)
  const isMuted = muted || false

  const onLoad = () => {
    setTimeout(() => {
      setLoaded(true)
    }, 500)
  }
  return (
    <div className="w-full h-full bg-red-500">
      <div className={cn('hidden transition-all duration-300 ease-in', loaded ? 'flex justify-between' : 'hidden')}>
        <ReactPlayer
          // style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, width: '100%', height: '100%', border: 'none', margin: 0, padding: 0, overflow: 'hidden' }}
          className={cn(' rounded-lg')}
          onStart={() => onLoad()}
          onEnded={() => setLoaded(false)}
          url={`https://www.youtube.com/watch?v=${videoKey}`}
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
    </div>
  )
}

export const Demo = () => {
  const myRef = useRef(null)
  return (
    <div className="my-24">
      <LiteYouTubeEmbed
        wrapperClass="h-screen w-full object-cover bg-no-repeat bg-center"
        iframeClass="w-full h-screen pointer-events-none bg-no-repeat bg-center"
        id="L2vS_050c-M" // Default none, id of the video or playlist
        adNetwork={true} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
        params="showinfo=0&controls=0&rel=0&autoplay=1&mute=1&&amp;modestbranding=1" // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
        playlist={false} // Use true when your ID be from a playlist
        title="YouTube Embed" // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
        ref={myRef}
        thumbnail="https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/1sh2S5J7bTPu6LuOgS9gamkGs2J.jpg"
      />
    </div>
  )
}

export const Demo2 = () => {
  return (
    <div className="frame-container">
      <iframe
        style={{ width: '100%', height: '100%', border: 'none', margin: 0, padding: 0 }}
        src="https://www.youtube.com/embed/73_1biulkYk?autoplay=1&mute=1&loop=1&color=white&controls=0&modestbranding=1&playsinline=1&rel=0&enablejsapi=1"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      >
      </iframe>
    </div>
  )
}

export default DemoComponent
