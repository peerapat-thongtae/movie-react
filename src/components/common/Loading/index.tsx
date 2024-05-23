interface LoadingProps {
  textLoading?: string
}

const Loading = (props: LoadingProps) => {
  return (
    <div className="overlay-content align-center w-full">
      <div className="wrapper">
        <div className="pacmancontainer">
          <div className="pacman" />
          <div className="pacman pac2" />
          <h2 className="animate font-bold text-2xl dark:text-black text-white">
            {props?.textLoading || 'Loading...' }
          </h2>
        </div>
      </div>
    </div>
  )
}

export default Loading
