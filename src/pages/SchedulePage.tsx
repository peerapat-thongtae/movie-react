import { useAuth0 } from '@auth0/auth0-react'
import { useEffect } from 'react'
import Slider from '@/components/common/Slider'

const SchedulePage = () => {
  const { getAccessTokenSilently } = useAuth0()
  useEffect(() => {
    getAccessTokenSilently().then(val => console.log(val))
  }, [])

  return (
    <div className="my-24 px-8">
      <Slider
        label="asdads"
        children={(
          <>
            <div>test</div>
          </>
        )}
      />
    </div>
  )
}

export default SchedulePage
