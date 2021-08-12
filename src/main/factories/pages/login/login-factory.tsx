import React, { FunctionComponent } from 'react'

import { makeRemoteAuthentication } from '../../useCases/authentication/remote-authentication-factory'
import { makeValidationComposite } from './login-validation-factory'
import { makeLocalUpdateCurrentAccount } from '../../useCases/update-current-account/local-update-current-account-factory'

import { Login } from '@/presentation/pages'

export const makeLogin: FunctionComponent = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeValidationComposite()}
      updateCurrentAccount={makeLocalUpdateCurrentAccount()}
    />
  )
}
