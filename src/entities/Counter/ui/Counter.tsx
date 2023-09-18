import { useDispatch, useSelector } from 'react-redux'
import { AppButton, ButtonSize, ButtonTheme } from 'shared/ui/AppButton/AppButton'
import { counterActions } from '../model/slice/CounterSlice'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'

export const Counter = () => {
    const dispatch = useDispatch()
    const value = useSelector(getCounterValue)

    function increase() {
        dispatch(counterActions.increment())
    }

    function decrease() {
        dispatch(counterActions.decrement())
    }

    return ( 
        <div>
            <h2 data-testid="value-title">{value}</h2>
            <div style={{display: 'flex'}}>
                <AppButton data-testid='increment-btn' square={true} theme={ButtonTheme.SOLID} onClick={increase} size={ButtonSize.L}>+</AppButton>
                <AppButton data-testid='decrement-btn' square={true} theme={ButtonTheme.SOLID} onClick={decrease}  size={ButtonSize.L}>-</AppButton>
            </div>
            
        </div>
    )
}