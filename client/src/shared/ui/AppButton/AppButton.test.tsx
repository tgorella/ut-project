import { render, screen } from '@testing-library/react'
import {AppButton, ButtonTheme} from './AppButton'
import React from 'react'

describe('AppButton', () => {
    test('text', () => {
        render(<AppButton>TEST</AppButton>)
        expect(screen.getByText('TEST')).toBeInTheDocument()
    })
    test('with clear class', () => {
        render(<AppButton theme={ButtonTheme.CLEAR}>TEST</AppButton>)
        expect(screen.getByText('TEST')).toHaveClass('clear')
        screen.debug()
    })
})