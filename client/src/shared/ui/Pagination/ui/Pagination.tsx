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
  onPageChange: (page: number) => void;
}
export const Pagination = memo(({className, itemsLength, itemsPerPage, currentPage, totalItems = true, pages = true, onPageChange} : PaginationProps) => {
    const {t} = useTranslation()
    const totalPages = Math.ceil(itemsLength / itemsPerPage) === 0 ? 1 : Math.ceil(itemsLength / itemsPerPage)
    
    return ( 
        <div className={classNames(cls.Pagination, {}, [className])}>
            <div className={cls.wrapper}>
                {currentPage !== 1 && (
                    <>
                        <div className={cls.page} onClick={() => onPageChange(1)}>
                            {t('«')}
                        </div>
                        <div
                            className={cls.page}
                            onClick={() => onPageChange(currentPage-1)}>
                            {t('←')}
                        </div>
                    </>
                )}
                <div className={cls.page} >{currentPage}</div>
                {currentPage !== totalPages && (
                    <>
                        <div className={cls.page} onClick={() => onPageChange(currentPage+1)}>
                            {t('→')}
                        </div>
                        <div className={cls.page} onClick={() => onPageChange(totalPages)}>
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