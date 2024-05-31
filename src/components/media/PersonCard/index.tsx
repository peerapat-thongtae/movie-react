import { useNavigate } from 'react-router-dom'
import { CreditType } from '@/types/media.type'
import Image from '@/components/common/Image'
import { useConfigTMDB } from '@/hooks/useConfig'
import { Cast, Crew, Person } from 'moviedb-promise'

type PersonProps = {
  person: Person | Cast | Crew
  type?: CreditType
}
const PersonCard = (props: PersonProps) => {
  const type = props.type
  const person = props.person as Person & Cast & Crew
  const navigate = useNavigate()
  const config = useConfigTMDB()
  return (
    <div className="flex flex-col h-full w-full relative cursor-pointer" onClick={() => navigate(`/person/${person.id}`)}>
      <div className="w-full pb-2">
        <Image
          src={config.getImagePath(person.profile_path || '', 'poster')}
          alt={person.name}
          effect="zoomIn"
          className="h-[350px] w-[250px] rounded-lg"
          reEffect
        />
      </div>
      <div className="">
        <div className="truncate font-bold cursor-pointer hover:text-yellow-500">{person.name}</div>
        {type
        && (
          <div className="truncate text-xs font-light italic">
            {
              type === 'cast' ? person?.character : person?.job
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default PersonCard
