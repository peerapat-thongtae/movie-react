import Image from '@/components/common/Image'
import { Company } from 'moviedb-promise'

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="relative group border border-yellow-500 w-full h-full aspect-video  bg-primary-light hover:bg-yellow-100 transition-all duration-500 rounded-lg cursor-pointer">
      <div className="absolute inset-0 bg-contain bg-center opacity-50 rounded-lg"></div>
      <div className="relative flex break-words justify-center w-full h-full max-h-72 items-center">
        <span className="md:text-3xl transition-all text-black duration-300 font-bold px-8">
          {company.logo_path
            ? (
              <Image
                className="max-w-32 max-h-26"
                src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                alt={company.name}
                effect="zoomIn"
              />
            )
            : <div className="px-8">{company.name}</div>}

        </span>
      </div>
    </div>
  )
}

export default CompanyCard
