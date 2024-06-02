import Image from '@/components/common/Image'

const Posters2 = ({ posters }: any) => {
  return (
    <div className="grid grid-cols-4 place-items-center gap-[clamp(20px,3vw,32px)]">
      {posters.map((media: any) => {
        return (
          <div className="w-full h-auto">
            <div className="relative text-center w-full aspect-[1_/_1.54] shadow-[0px_4px_5px_0px_hsla(0,0%,0%,0.14),0px_1px_10px_0px_hsla(0,0%,0%,0.12),0px_2px_4px_-1px_hsla(0,0%,0%,0.2)] overflow-hidden rounded-xl">
              <Image
                src={`https://image.tmdb.org/t/p/w500${media.file_path}`}
                alt="poster"
                className="object-cover h-full w-full"
              />
            </div>
            <div className="mt-2">Test Name ....</div>
          </div>
        )
      })}
    </div>
  )
}

export default Posters2
