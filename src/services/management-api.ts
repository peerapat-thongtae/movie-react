import { ManagementClient } from 'auth0'

const managementAPI = new ManagementClient({
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: `${process.env.AUTH0_CLIENT_ID}`,
  clientSecret: `${process.env.AUTH0_CLIENT_SECRET}`,
})

export default managementAPI
