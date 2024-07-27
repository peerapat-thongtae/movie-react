import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

const usePreviousRoute = () => {
  const location = useLocation()
  const [previousLocation, setPreviousLocation] = useState<any>(null)
  const previousLocationsRef = useRef<any>([])

  useEffect(() => {
    previousLocationsRef.current.push(location)
    if (previousLocationsRef.current.length > 1) {
      setPreviousLocation(previousLocationsRef.current[previousLocationsRef.current.length - 2])
    }
  }, [location])

  return previousLocation
}

export default usePreviousRoute
