import { Decorator } from '@storybook/react'
import { HTMLAttributes } from 'react'
import isChromatic from 'chromatic/isChromatic'

export const WithColorsTheme: Decorator = (Story, context) => {
    let { scheme } = context.globals
    if (isChromatic()) {
        scheme = 'both'
    }

    function Flex(props: HTMLAttributes<HTMLDivElement>) {

        return (
            <div
                {...props}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '40px',
                    width: '100%',
                    minHeight: 'auto',
                    alignItems: 'center'
                }}
            >
            </div>
        )
    }
  
    if (scheme === 'light' ) {
        return (
            <div>
                <Flex className='app app_light_theme' id='storie_wrapper'>
                    {Story()}
                </Flex>
            </div>
        )
    }

    if (scheme === 'dark' ) {
        return (
            <div >
                <Flex className='app app_dark_theme' id='storie_wrapper'>
                    {Story()}
                </Flex>
            </div>
        )
    }

    if (scheme === 'green' ) {
        return (
            <div >
                <Flex className='app app_green_theme' id='storie_wrapper'>
                    {Story()}
                </Flex>
            </div>
        )
    }

    return (
        <div >
            <Flex className='app app_light_theme' id='storie_wrapper'>
                {Story()}
            </Flex>
            <Flex className='app app_dark_theme' id='storie_wrapper'>
                {Story()}
            </Flex>
            <Flex className='app app_green_theme' id='storie_wrapper'>
                {Story()}
            </Flex>

        </div>
    ) 
}