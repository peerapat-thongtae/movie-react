import { Genre } from 'moviedb-promise'

const GenreCard = ({ genre }: { genre: Genre }) => {
  return (
    <div className="relative group border border-yellow-500 w-full h-full aspect-video  bg-primary-dark hover:bg-yellow-700 transition-all duration-500 rounded-lg cursor-pointer">
      <div className={`absolute inset-0 bg-cover bg-center opacity-50 bg-genre-${genre.id} rounded-lg`}></div>
      <div className="relative flex break-words justify-center w-full h-full items-center">
        <span className="md:text-3xl transition-all duration-300 md:group-hover:text-4xl font-bold px-8">
          {genre.name}
        </span>
      </div>
    </div>
  )
}

export default GenreCard
