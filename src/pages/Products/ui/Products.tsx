import { useEffect, useState } from 'react';
import type { SortDirection } from '@tanstack/react-table';
import { useSearchParams } from 'react-router';
import { enqueueSnackbar } from 'notistack';

import { ProductsTable, setCurrentPage, setProducts, setSearchQuery, setSorting, setTotalItems, usePagination, useProducts, useSearchQuery, useSorting } from '../../../entities/product';
import Button from '../../../shared/ui/Button';
import { Footer } from './Footer';
import { SearchProduct } from '../../../features/product';
import { ProductsService, type ProductsParams, type SearchProductsParams } from '../../../shared/api/products';
import { useDebounce } from '../../../shared/hooks';
import { AddProduct } from '../../../features/product/add-product/AddProduct';
import { ArrowsClockwiseIcon, PlusCircleIcon, SpinnerIcon } from '../../../shared/ui';

import styles from './Products.module.scss';


const ProductsPage = () => {
  const products = useProducts();
  const sorting = useSorting();
  const searchQuery = useSearchQuery();
  const pagination = usePagination();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [isMount, setIsMount] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams()

  const serializeProductsParams = (params: ProductsParams): URLSearchParams => {
    const searchParams = new URLSearchParams();
    if (params?.skip) {
      searchParams.set('page', String(params?.skip + 1));
    }
    if (params.sortBy && params.order) {
      searchParams.set('sortBy', params.sortBy);
      searchParams.set('order', params.order);
    }
    if (searchQuery) {
      searchParams.set('search', searchQuery);
    }
    return searchParams;
  }

  const deserializeProductsParams = (searchParams: URLSearchParams): ProductsParams => {
    const params: ProductsParams = {
      skip: Number(searchParams.get('page') || 0) * pagination.pageSize,
      limit: pagination.pageSize
    }
    const sortBy = searchParams.get('sortBy');
    const order = searchParams.get('order');
    if (sortBy && order) {
      params.sortBy = sortBy;
      params.order = order as SortDirection;
    }
    const q = searchParams.get('search');
    if (q) {
      params.q = q;
    }
    return params
  }

  useEffect(() => {
    setIsMount(true)
    const params = deserializeProductsParams(searchParams)
    if (params.order && params.sortBy) {
      setSorting([{
        desc: params.order === 'desc',
        id: params.sortBy,
      }])
    }
    if (params.q) {
      setSearchQuery(params.q)
    }
    if (params.skip) {
      setCurrentPage(params.skip)
    }
    loadProducts(params);
  }, []);

  useEffect(() => {
    if (!isMount) return;
    const params: ProductsParams = {
      skip: pagination.currentPage - 1,
      limit: pagination.pageSize,
    }
    if (sorting.length > 0) {
      const sort = sorting[0];
      params['sortBy'] = sort.id;
      params['order'] = sort.desc ? 'desc' : 'asc';
    }
    if (debouncedSearchQuery) {
      params['q'] = debouncedSearchQuery;
    }
    const newSearchParams = serializeProductsParams(params);
    if (newSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(newSearchParams)
      loadProducts(params);
    }
  }, [pagination.currentPage, sorting, debouncedSearchQuery]);

  const loadProducts = async (params: ProductsParams) => {
    setLoading(true);
    try {
      const data = params.q ? await ProductsService.getSearchProducts(params as SearchProductsParams) : await ProductsService.getAllProducts(params);
      setProducts(data.products);
      setTotalItems(data.total)
    } catch (err) {
      const error = err instanceof Error ? err.message : 'Ошибка загрузки';
      enqueueSnackbar(error, { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    const params = deserializeProductsParams(searchParams)
    loadProducts(params)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Товары</h1>
        <SearchProduct className={styles.headerSearch} />
      </div>
      <div className={styles.products}>
        <div className={styles.productsHeader}>
          <div className={styles.productsHeaderTitle}>Все позиции</div>
          <div className={styles.productsHeaderBtns}>
            <Button variant="outlined" className={styles.updateBtn} onClick={onRefresh}>
              <ArrowsClockwiseIcon />
            </Button>
            <Button
              renderBefore={<PlusCircleIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Добавить
            </Button>
          </div>
        </div>

        <div className={styles.productsContent}>
          {isLoading ? (
            <div className={styles.productsSpinnerWrapper}>
              <SpinnerIcon />
            </div>
          ) : (
            products.length === 0 ? (
              <div className={styles.productsEmpty}>{searchQuery ? 'Ничего не найдено' : 'Нет товаров'}</div>
            ) : (
              <ProductsTable />
            )
          )}
        </div>
        <div className={styles.productsFooter}>
          <Footer />
        </div>
        {isModalOpen && (
          <AddProduct
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
