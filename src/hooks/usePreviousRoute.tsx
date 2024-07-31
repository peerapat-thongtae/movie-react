import { getStateRouteFromPath, setStateRoute } from '@/stores/slice'
import { IRootState } from '@/stores/store'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const usePreviousRoute = () => {
  const location = useLocation()
  // const [previousLocation, setPreviousLocation] = useState<any>()
  const dispatch = useDispatch()
  const previousLocation = useSelector((state: IRootState) => getStateRouteFromPath(state, location.pathname))

  const previousLocationsRef = useRef<any>([])

  useEffect(() => {
    previousLocationsRef.current.push(location)
    if (previousLocationsRef.current.length > 1) {
      // setPreviousLocation(previousLocationsRef.current[previousLocationsRef.current.length - 2])
      dispatch(setStateRoute({ path: location.pathname, state: previousLocationsRef.current[previousLocationsRef.current.length - 2] }))
    }
  }, [location])

  return previousLocation
}

export default usePreviousRoute
