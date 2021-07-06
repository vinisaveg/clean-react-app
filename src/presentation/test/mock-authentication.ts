import { Authentication, AuthenticationParams } from '@/domain/useCases'
import { AccountModel } from '@/domain/models'
import { mockAccountModel } from '@/domain/test'

export class AuthenticationSpy implements Authentication {
  acount = mockAccountModel()
  params: AuthenticationParams

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params
    return Promise.resolve(this.acount)
  }
}
