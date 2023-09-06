import { fireEvent, render, screen } from '@testing-library/react'
import { Sidebar} from './Sidebar'
import React from 'react'

describe('Sidebar', () => {
    test('is on page', () => {
        render(<Sidebar />)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()

    })
    test('toggle sidebar', () => {
        render(<Sidebar />)
        const toggleBtn = screen.getByTestId('sidebar-toggle')
        expect(screen.getByTestId('sidebar')).toBeInTheDocument()
        fireEvent.click(toggleBtn)
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed')

    })
 
})