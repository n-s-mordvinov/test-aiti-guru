import clsx from 'clsx';
import { setCurrentPage, usePagination } from '../../../entities/product';
import styles from './Footer.module.scss';
import { CaretLeftIcon, CaretRightIcon } from '../../../shared/ui';

export const Footer = () => {
  const { currentPage, pageSize, totalItems } = usePagination();

  const totalPages = Math.ceil(totalItems / pageSize);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Всегда показываем последнюю страницу
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (totalItems === 0) {
    return null;
  }

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.footer}>
      <div className={styles.footerShown}>
        Показано <span>{startItem}–{endItem}</span> из <span>{totalItems}</span>
      </div>
      <div className={styles.footerPagination}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={styles.footerPaginationArrow}
          aria-label="Предыдущая страница"
        >
          <CaretLeftIcon />
        </button>
        <div className={styles.footerPaginationNumbers}>
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => handlePageChange(page as number)}
                className={clsx(styles.footerPaginationNumber, {[styles.footerPaginationNumberActive]: currentPage === page})}
              >
                {page}
              </button>
            );
          })}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={styles.footerPaginationArrow}
          aria-label="Следующая страница"
        >
          <CaretRightIcon />
        </button>
      </div>
    </div>
  );
};
