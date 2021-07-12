import React, { FunctionComponent } from 'react'

import { makeRemoteAuthentication } from '../../useCases/authentication/remote-authentication-factory'
import { makeValidationComposite } from './login-validation-factory'
import { makeLocalSaveAccessToken } from '../../useCases/save-access-token/local-save-access-token-factory'

import { Login } from '@/presentation/pages'

export const makeLogin: FunctionComponent = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeValidationComposite()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  )
}
