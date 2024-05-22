import '@/components/media/MediaCard/style.css'
import { motion } from 'framer-motion'
import { SkeletonTheme } from 'react-loading-skeleton'

interface MediaCardProps {
  title: string
  imagePath: string
}
const MediaCard = (props: MediaCardProps) => {
  return (
    <SkeletonTheme
      baseColor="#202020"
      highlightColor="#444"
    >
      <motion.div
        className="inline-block flex-shrink-0 drop-shadow-lg bg-neutral-900 h-[330px] w-44 rounded-lg cursor"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <>
          <img
            className="w-fit rounded-lg rounded-b-none"
            src={props.imagePath}
            alt="Couldn't find image"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null // prevents looping
              currentTarget.src = 'https://images.unsplash.com/photo-1662675117392-561a414fcefc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
            }}
          />
          <div className="p-2.5 space-y-1">
            <p
              className="text-neutral-500 text-xs"
            >
              {/* {`${props.data.vote_average} • ${props.data.vote_count.toLocaleString()} votes • ${year[0] || 'N/A'}`} */}
            </p>
            <p
              className="text-neutral-100 text-sm truncate text-ellipsis line-clamp-1"
            >
              {props.title}
              asdasdadsadsadsadacscxzxzcsaxq
            </p>
          </div>
        </>
      </motion.div>
    </SkeletonTheme>
  )
}

{ /* <div className=" w-[400px] h-[600px] border ">
        <LazyLoadImage
          src="https://www.themoviedb.org/t/p/w1280/pKaA8VvfkNfEMUPMiiuL5qSPQYy.jpg"
          loading="lazy"
          className="w-full h-full object-cover object-center"
        />
      </div> */ }
export default MediaCard
