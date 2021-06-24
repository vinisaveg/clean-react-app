import React, { FunctionComponent, useContext } from 'react'

import Styles from './form-status-styles.scss'

import Spinner from '@/presentation/components/spinner/spinner'

import Context from '@/presentation/context/form/form-context'

const FormStatus: FunctionComponent = () => {
  const { state, errorState } = useContext(Context)
  const { isLoading } = state

  return (
    <div data-testid="errorWrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorState.main && <span className={Styles.error}>{errorState.main}</span>}
    </div>
  )
}

export default FormStatus
