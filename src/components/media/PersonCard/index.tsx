import { useNavigate } from 'react-router-dom'
import { CreditType } from '@/types/media.type'
import Image from '@/components/common/Image'
import { Cast, Crew, Person } from 'moviedb-promise'
import { Tooltip } from 'react-tooltip'

type PersonProps = {
  person: Person | Cast | Crew
  type?: CreditType
}

const PersonCard = (props: PersonProps) => {
  const type = props.type
  const person = props.person as Person & Cast & Crew
  const navigate = useNavigate()

  const goToDetail = () => {
    navigate(`/person/${person.id}`)
  }
  return (
    <div className="w-full h-full relative aspect-[1_/_1.54] cursor-pointer group">
      <div className="relative text-center w-full aspect-[1_/_1.54] shadow-[0px_4px_5px_0px_hsla(0,0%,0%,0.14),0px_1px_10px_0px_hsla(0,0%,0%,0.12),0px_2px_4px_-1px_hsla(0,0%,0%,0.2)] overflow-hidden rounded-xl">
        <Image
          src={`https://image.tmdb.org/t/p/w780${person.profile_path}`}
          alt="poster"
          className="object-cover h-full w-full"
          effect="zoomIn"
          reEffect
          onClick={goToDetail}
        />
      </div>

      <div className="truncate text-left text-md font-bold hover:cursor-pointer dark:text-black hover:text-yellow-500 mt-2 w-auto" onClick={goToDetail}>
        <Tooltip id="my-tooltip" className="z-[99]" />
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={person.name}
          data-tooltip-place="top"
        >
          { person.name }
        </span>
      </div>
      {type
      && (
        <div className="truncate text-xs font-light italic">
          {
            type === 'cast' ? person?.character : person?.job
          }
        </div>
      )}
    </div>
  )
}

export default PersonCard
