import React, { FunctionComponent } from 'react'

import { makeRemoteAddAccount } from '../../useCases/add-account/remote-add-account-factory'
import { makeSignUpValidation } from './signup-validation-factory'

import { SignUp } from '@/presentation/pages'

export const makeSignUp: FunctionComponent = () => {
  return <SignUp addAccount={makeRemoteAddAccount()} validation={makeSignUpValidation()} />
}
