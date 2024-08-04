import Image from '@/components/common/Image'
import Loading from '@/components/common/Loading'
import SocialButton from '@/components/common/SocialButton'
import { usePersonDetail } from '@/hooks/useMedia'
import { DateHelper } from '@/utils/date.helper'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const PersonDetailPage = () => {
  const param = useParams()
  const personId = Number(param.id)
  const { data: person, isLoading, isError } = usePersonDetail(personId)
  const externalIds = useMemo(() => {
    const data = person as any
    return data?.external_ids
  }, [person])

  const renderTitleAndDetail = (title: string, detail: string | undefined | null) => {
    return (
      <>
        <span className="text-yellow-300">{title}</span>
        <span>:</span>
        <span>{detail || '-'}</span>
      </>
    )
  }

  const movieCredits = useMemo(() => {
    const data = person as any
    return data?.movie_credits
  }, [person])

  const tvCredits = useMemo(() => {
    const data = person as any
    return data?.tv_credits
  }, [person])

  const goToExternalSocial = (provider: string, id: number | string | undefined) => {
    if (!id) {
      return
    }
    if (provider === 'imdb') {
      window.open(`https://imdb.com/name/${id}`)
    }

    if (provider === 'facebook') {
      window.open(`https://facebook.com/${id}`)
    }

    if (provider === 'instagram') {
      window.open(`https://instagram.com/${id}`)
    }
  }
  return (
    <div className="w-full relative flex items-center justify-center h-screen">
      {isLoading && (
        <div>
          <Loading />
        </div>
      )}
      {isError && (
        <div>Error</div>
      )}
      {!isLoading && person
      && (
        <div className="py-32 px-4 md:px-24 h-full w-full">
          <div className="flex flex-col md:flex-row gap-8 md:gap-24">
            <div className="md:min-w-[22rem] w-auto min-h-[32rem] md:h-[32rem]">
              <Image
                src={`https://image.tmdb.org/t/p//original/${person?.profile_path}`}
                alt={person.name}
                className="w-full h-full rounded-lg object-cover object-center"
                effect="zoomIn"
              />
              <div className="my-4 flex gap-2 justify-center">
                {externalIds.facebook_id && <SocialButton size="small" provider="facebook" onClick={() => goToExternalSocial('facebook', externalIds.facebook_id)} label={person.name || ''} />}
                {externalIds.instagram_id && <SocialButton size="small" provider="instagram" onClick={() => goToExternalSocial('instagram', externalIds.instagram_id)} label={person.name || ''} />}
                {externalIds.imdb_id && <SocialButton size="small" provider="imdb" onClick={() => goToExternalSocial('imdb', externalIds.imdb_id)} label={person.name || ''} />}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-3xl md:text-4xl font-extrabold">{person.name}</h1>
              <hr className="my-4" />
              <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                  {renderTitleAndDetail('Known For', person.known_for_department)}
                </div>
                <div className="flex gap-2">
                  {renderTitleAndDetail('Birthdate', person.birthday ? `${DateHelper.formatDate(person.birthday, 'DD/MM/YYYY')}` : '')}
                </div>
                <div className="flex gap-2">
                  {renderTitleAndDetail('Age', person.birthday ? `${DateHelper.getAge(person.birthday)} Years` : '')}
                </div>
                <div className="flex gap-2">
                  {renderTitleAndDetail('Hometown', person.place_of_birth)}
                </div>
                <div className="flex gap-2">
                  {renderTitleAndDetail('Credits ', `${movieCredits?.cast?.length} Movies and ${tvCredits?.cast?.length} TV Series`)}
                </div>
              </div>
              <hr className="my-4" />
              <div className="flex flex-col gap-2">
                <span className="text-xl md:text-2xl font-semibold text-yellow-300">Biography</span>
                <p className="break-words">
                  {person.biography}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default PersonDetailPage
