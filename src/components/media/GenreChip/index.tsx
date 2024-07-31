import { Genre } from 'moviedb-promise'

interface IGenreChipProps {
  genre: Genre
}

const GenreChip = ({ genre }: IGenreChipProps) => {
  return (
    <div
      key={genre.id}
      className="cursor-pointer truncate px-2 py-0.5 text-center items-center rounded-lg text-xs bg-pink-600 hover:text-yellow-500 text-white font-bold"
    >
      {genre.name}
    </div>
  )
}

export default GenreChip
