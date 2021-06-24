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
  })
})
