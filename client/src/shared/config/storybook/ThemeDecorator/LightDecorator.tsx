import { Decorator } from '@storybook/react'
import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider'
import { HTMLAttributes } from 'react'

export const LightDecorator: Decorator = (Story) => {

    function Flex(props: HTMLAttributes<HTMLDivElement>) {

        return (
            <div
                {...props}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '20px',
                    width: '100%',
                    minHeight: '100vh',
                    alignItems: 'center'
                }}
            >
            </div>
        )
    }
  
    return (
        <ThemeProvider initialTheme={Theme.LIGHT} >
            <Flex className={`app ${Theme.LIGHT}`}>
                {Story()}
            </Flex>
        </ThemeProvider>
    )
}
