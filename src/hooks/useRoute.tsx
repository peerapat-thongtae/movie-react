import { setStateRoute } from '@/stores/slice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

export const useRoute = (keepState: any = {}) => {
  const location = useLocation()
  const navigateRoute = useNavigate()
  const dispatch = useDispatch()

  const goTo = (to: string) => {
    navigateRoute(to, {
      state: { from: location.pathname, to: to, state: keepState },
    })
    dispatch(setStateRoute({ path: to, state: keepState }))
  }

  const defaultState = location.state.state
  useEffect(() => {
    console.log('location', location)
    // return () => {
    //   console.log('to', to, from)
    // }
  }, [])

  return { goTo, defaultState }
}
