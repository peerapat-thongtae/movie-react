import { FaMagnifyingGlassArrowRight } from 'react-icons/fa6'

const Input = () => {
  return (
    <div className="flex shadow-sm w-20 h-8">
      <input
        className="py-1 indent-2 w-[80%] text-sm rounded-s-lg focus:outline-none dark:text-white text-black bg-ternary-light"
        name="text"
        type="text"
      />
      <button
        className="py-1 rounded-e-lg text-black bg-yellow-500 flex justify-center items-center w-10 h-auto"
      >
        <FaMagnifyingGlassArrowRight />
      </button>
    </div>

  )
}

export default Input
