import React, { FunctionComponent, useContext } from 'react'

import Styles from './form-status-styles.scss'

import Spinner from '@/presentation/components/spinner/spinner'

import Context from '@/presentation/context/form/form-context'

const FormStatus: FunctionComponent = () => {
  const { isLoading, errorMessage } = useContext(Context)

  return (
    <div data-testid="errorWrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
