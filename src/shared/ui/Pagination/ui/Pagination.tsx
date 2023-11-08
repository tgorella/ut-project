import { useTranslation } from 'react-i18next'
import cls from './Pagination.module.scss'
import classNames from 'shared/lib/classNames/ClassNames'
import { memo } from 'react'

interface PaginationProps {
  className?: string;
  itemsLength: number;
  itemsPerPage: number;
  currentPage: number;
  pages?: boolean;
  totalItems?: boolean;
  onPageUp: (page: number) => void;
  onPageDown: (page: number) => void;
}
export const Pagination = memo(({className, itemsLength, itemsPerPage, currentPage, totalItems = true, pages = true, onPageDown, onPageUp} : PaginationProps) => {
    const {t} = useTranslation()
    const totalPages = Math.ceil(itemsLength / itemsPerPage)
    return ( 
        <div className={classNames(cls.Pagination, {}, [className])}>
            <div className={cls.wrapper}>
                {currentPage !== 1 && (
                    <>
                        <div className={cls.page} onClick={() => onPageDown(1)}>
                            {t('«')}
                        </div>
                        <div
                            className={cls.page}
                            onClick={() => onPageDown(currentPage-1)}>
                            {t('←')}
                        </div>
                    </>
                )}
                <div className={cls.page} >{currentPage}</div>
                {currentPage !== totalPages && (
                    <>
                        <div className={cls.page} onClick={() => onPageUp(currentPage+1)}>
                            {t('→')}
                        </div>
                        <div className={cls.page} onClick={() => onPageUp(totalPages)}>
                            {t('»')}
                        </div>
                    </>
                )}

            </div>
            {pages && <div className={cls.info}>{t('Всего страниц')}: {totalPages} </div>}
            {totalItems && <div className={cls.info}>{t('Всего записей')}: {itemsLength}</div> }
        </div>
    )
})