import React, { FunctionComponent, useContext } from 'react'

import Context from '@/presentation/context/form/form-context'

type Props = {
  text: string
}

const SubmitButton: FunctionComponent<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)

  return (
    <button data-testid="submit" type="submit" disabled={state.isFormInvalid}>
      Criar conta
    </button>
  )
}

export default SubmitButton
