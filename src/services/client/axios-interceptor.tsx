import { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import todoApi from '@/services/client/todo-client'

const AxiosInterceptor = ({ children }: any) => {
  const { getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    console.log('yess')
    const requestInterceptor = todoApi.interceptors.request.use(
      async (config) => {
        try {
          const token = await getAccessTokenSilently()
          config.headers.Authorization = `Bearer ${token}`
          console.log('tooo', token)
        }
        catch (error) {
          console.error('Error getting token:', error)
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )

    return () => {
      todoApi.interceptors.request.eject(requestInterceptor)
    }
  }, [getAccessTokenSilently])

  return children
}

export default AxiosInterceptor
