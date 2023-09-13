import { Decorator } from '@storybook/react'

export const DarkDecorator: Decorator = (Story) => (
    <div className='app dark' style={{padding: '20px'}}>
        {Story()}
    </div>
)
