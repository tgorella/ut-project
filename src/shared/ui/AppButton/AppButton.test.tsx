import { render, screen } from '@testing-library/react'
import {AppButton, ThemeButton} from './AppButton'
import React from 'react'

describe('AppButton', () => {
    test('text', () => {
        render(<AppButton>TEST</AppButton>)
        expect(screen.getByText('TEST')).toBeInTheDocument()
    })
    test('with clear class', () => {
        render(<AppButton theme={ThemeButton.CLEAR}>TEST</AppButton>)
        expect(screen.getByText('TEST')).toHaveClass('clear')
        screen.debug()
    })
})