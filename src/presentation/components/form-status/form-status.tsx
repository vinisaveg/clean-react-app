import React, { FunctionComponent } from 'react'

import Styles from './form-status-styles.scss'

import Spinner from '@/presentation/components/spinner/spinner'

const FormStatus: FunctionComponent = () => {
  return (
    <div className={Styles.errorWrap}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>Erro</span>
    </div>
  )
}

export default FormStatus
