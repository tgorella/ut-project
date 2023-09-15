import { Decorator } from '@storybook/react'

export const LightDecorator: Decorator = (Story) => (
    <div className='app light' style={{padding: '20px',  minHeight: 'auto'}}>
        <div>
            {Story()}
        </div>
    </div>
)
