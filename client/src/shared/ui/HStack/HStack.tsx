import { Flex, FlexProps } from '../Flex'

type HStackProps = Omit<FlexProps, 'direction'>
export const HStack = (props: HStackProps) => {
    return ( 
        <Flex {...props} direction={'row'}/>
    )
}