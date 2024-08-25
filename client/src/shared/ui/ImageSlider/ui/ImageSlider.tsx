import cls from './ImageSlider.module.scss'
import classNames from '@/shared/lib/classNames/ClassNames'
import {memo, useEffect, useState} from 'react'
import ARROW_LEFT from '@/shared/assets/img/arrow-left.svg'
import ARROW_RIGHT from '@/shared/assets/img/arrow-right.svg'


interface ImageSliderProps {
  images: string[],
  withPreview?: boolean,
  className?: string,
  previewSide: 'left' | 'right' | 'bottom',
  autoplay?: boolean,
  changeTime?: number

}
export const ImageSlider = memo(({
    images, 
    withPreview = true, 
    className, 
    previewSide = 'right', 
    autoplay = false, 
    changeTime = 3000
} : ImageSliderProps) => {
    const [index, setIndex] = useState(0)
    const [loop, setLoop] = useState(0)
    const [loop2, setLoop2] = useState(0)

    const handleIncreaseIndex = () => {
        if (index === images.length - 1) {
            setIndex(0)
            setLoop2(prev => prev + 1)
        }  else if (index === 0) {
            setIndex(prev => prev + 1)
            setLoop((prev) => prev + 1)
        } else {
            setIndex((prev) => prev + 1)
            
        }
    }

    const handleDecreaseIndex = () =>  {
        if (index === 0) {
            setIndex(images.length - 1)
            setLoop2((prev) => prev - 1)
        }  else if (index === images.length - 1) {
            setIndex(prev => prev - 1)
            setLoop((prev) => prev - 1)
        } else {
            setIndex((prev) => prev - 1)
        }
    }
       
    useEffect(() => {
        if (autoplay) {
            const interval = setInterval(() => {
                if (index === images.length - 1) {
                    setIndex(0)
                } 
                else if (index < images.length - 1) {
                    setIndex((prev: number) => prev + 1)
                }
            }, changeTime)
            return (() => clearInterval(interval))
        }
    })

    return ( 
        <div className={classNames(cls.ImageSlider, {}, [className,cls[previewSide]])}>
            { <div className={cls.arrow + ' ' + cls['arrow-left']} onClick={handleDecreaseIndex} ><ARROW_LEFT className={cls.icon} /></div>}
            { <div className={cls.arrow + ' ' + cls['arrow-right']} onClick={handleIncreaseIndex} ><ARROW_RIGHT  className={cls.icon} /></div>}
            <div className={cls.large_image_wrapper}>
                <div className={cls.large_image_container} style={{width: `${images.length * 100}%`, transform: `translateX(${-1*(loop2*100 + (100 / images.length * index))}%)`}}>
                    {
                        images.map((img, index) => {
                            if (index === 0 ) {
                                return <img src={img} alt="" className={cls.img_large} key={index}
                                    style={{left: `${100 / images.length * index + 100*loop}%`}}
                                />
                            } else {
                                return <img src={img} alt="" className={cls.img_large} key={index}
                                    style={{left: `${100 / images.length * index + 100*loop2}%`}}
                                />}
                        }
                        )}
                </div>
            </div>
            {withPreview && <div className={cls.img_preview_wrapper+ ' ' + cls['img_preview_wrapper-'+ previewSide]}>
                {
                    images.map((img, i) => {
                        return <img key={i} src={img} alt='ímg' className={classNames(cls.img_preview, {}, [index === i ? cls.active : ''])} onClick={() => {}}/>})
                }
            </div>}
        </div>
    )
})