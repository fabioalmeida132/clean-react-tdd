import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { makeAPiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  return new RemoteAuthentication(makeAPiUrl('/login'), makeAxiosHttpClient())
}
