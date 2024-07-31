import { setStateRoute } from '@/stores/slice'
import { useState } from 'react'
// import { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Location, useLocation, useNavigate } from 'react-router-dom'

export const useRoute = () => {
  const location = useLocation()
  const navigateRoute = useNavigate()
  const dispatch = useDispatch()

  const [previousLocation, setPreviousLocation] = useState({})
  // const previousLocationsRef = useRef<any>([])

  // useEffect(() => {
  //   previousLocationsRef.current.push(location)
  //   if (previousLocationsRef.current.length > 1) {
  //     // setPreviousLocation(previousLocationsRef.current[previousLocationsRef.current.length - 2])
  //     const currLocation = previousLocationsRef.current[previousLocationsRef.current.length - 2]
  //     setStateLocation(currLocation, {})
  //   }
  // }, [location])

  const setStateLocation = (payloadLocation: Location, state: any) => {
    setPreviousLocation({ path: payloadLocation.pathname, state: state })
    dispatch(setStateRoute({ path: payloadLocation.pathname, state: state }))

    // sessionStorage.setItem(payloadLocation.pathname, state)
  }

  const navigate = (to: string) => {
    navigateRoute(to, {
    })
  }

  const defaultState = location?.state
  return { location, navigate, defaultState, previousLocation, setStateLocation }
}
