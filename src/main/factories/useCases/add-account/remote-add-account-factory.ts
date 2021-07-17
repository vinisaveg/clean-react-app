import { RemoteAddAccount } from '@/data/useCases/add-account/remote-add-account'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { AddAccount } from '@/domain/useCases'
import { makeApiUrl } from '@/main/factories/http/api-url-factory'

export const makeRemoteAddAccount = (): AddAccount => {
  return new RemoteAddAccount(makeApiUrl('/signup'), makeAxiosHttpClient())
}
