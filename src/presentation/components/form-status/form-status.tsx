import React, { FunctionComponent, useContext } from 'react'

import Styles from './form-status-styles.scss'

import Spinner from '@/presentation/components/spinner/spinner'

import Context from '@/presentation/context/form/form-context'

const FormStatus: FunctionComponent = () => {
  const { state } = useContext(Context)

  const { isLoading, mainError } = state

  return (
    <div data-testid="errorWrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {mainError && <span className={Styles.error}>{mainError}</span>}
    </div>
  )
}

export default FormStatus
