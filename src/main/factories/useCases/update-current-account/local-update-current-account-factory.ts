import { LocalUpdateCurrentAccount } from '@/data/useCases/update-current-account/local-update-current-account'
import { UpdateCurrentAccount } from '@/domain/useCases'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const makeLocalUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
