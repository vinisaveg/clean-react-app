import React from 'react'

import { render } from '@testing-library/react'
import Login from './login'

describe('Login component', () => {
  test('Should start with initial state', async () => {
    const { getByTestId } = render(<Login />)

    const errorWrap = getByTestId('errorWrap')
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = getByTestId('submit') as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatorio')
    expect(emailStatus.textContent).toBe('🔴')

    const passwordStatus = getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatorio')
    expect(emailStatus.textContent).toBe('🔴')
  })
})
