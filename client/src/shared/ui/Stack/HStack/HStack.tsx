import { Flex, FlexProps } from '../Flex/Flex'
import cls from './HStack.module.scss'

type StackProps = Omit<FlexProps, 'direction'>

interface HStackProps extends StackProps {
  mobile?: 'column' | 'row'
}
export const HStack = ({mobile = 'column', ...props}: HStackProps) => {

    return ( 
        <Flex {...props} direction={'row'} className={cls[mobile]} />
    )
}