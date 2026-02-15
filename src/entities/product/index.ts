export type { Product, SortConfig, NewProduct, PaginationConfig } from './model/types';
export {
  useProducts,
  useSorting,
  useSearchQuery,
  usePagination,
  setProducts,
  setSorting,
  setSearchQuery,
  setCurrentPage,
  setPageSize,
  setTotalItems
} from './model/productsStore';
export { ProductsTable } from './ui/ProductsTable';
