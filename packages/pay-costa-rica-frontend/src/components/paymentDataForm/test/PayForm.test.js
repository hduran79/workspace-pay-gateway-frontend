import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PayForm from '../PayForm'

test('rendering and submitting a basic Formik form', async () => {
    const handleSubmit = jest.fn()
    render(<PayForm onSubmit={handleSubmit} />)

    userEvent.type(screen.getByTestId('number'), '123456')
    userEvent.selectOptions(screen.getByTestId('month'), '01')
    userEvent.selectOptions(screen.getByTestId('year'), '21')
    userEvent.type(screen.getByTestId('code'), '3322')
    userEvent.type(screen.getByTestId('owner'), 'hduran')

    userEvent.click(screen.getByRole('button'))

    await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalledWith({
            number: '123456',
            month: '01',
            year: '21',
            code: '3322',
            owner: 'hduran'
        })
    )
})