import Image from '@/components/common/Image'
import { Company } from 'moviedb-promise'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="flex flex-col">
      <div className="relative group border border-yellow-500 w-full h-full aspect-video  bg-primary-light hover:bg-yellow-100 transition-all duration-500 rounded-lg cursor-pointer">
        <div className="absolute inset-0 bg-contain bg-center opacity-50 rounded-lg"></div>
        <div className="relative flex break-words justify-center w-full h-full max-h-72 items-center">
          <span className="md:text-3xl transition-all text-black duration-300 font-bold px-8">
            {company.logo_path
              ? (
                <Image
                  className="max-w-32 max-h-26 w-auto h-auto"
                  src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                  alt={company.name}
                  effect="zoomIn"
                />
              )
              : <div className="px-8">{company.name}</div>}

          </span>
        </div>
      </div>
      <div className="truncate text-left text-md font-bold hover:cursor-pointer dark:text-black hover:text-yellow-500 my-2 w-auto">

        <Tooltip id="my-tooltip" className="z-[99]" />
        <span
          data-tooltip-id="my-tooltip"
          data-tooltip-content={company.name}
          data-tooltip-place="top"
        >
          <Link to={`/company/${company.id}`}>
            { company.name }
          </Link>
        </span>
      </div>
    </div>
  )
}

export default CompanyCard
