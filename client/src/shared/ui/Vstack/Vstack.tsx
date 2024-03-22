import { Flex, FlexProps } from '../Flex'

type HStackProps = Omit<FlexProps, 'direction'>
export const VStack = (props: HStackProps) => {
    return ( 
        <Flex {...props} direction={'column'}/>
    )
}