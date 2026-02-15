import { create } from 'zustand';
import type { SortingState } from '@tanstack/react-table';
import type { Product, PaginationConfig } from './types';

interface InitialState {
  products: Product[];
  sorting: SortingState;
  searchQuery: string;
  pagination: PaginationConfig;
}

interface ActionsState { 
  setProducts: (products: Product[]) => void;
  setSorting: (updater: SortingState | ((prev: SortingState) => SortingState)) => void
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalItems: (totalItems: number) => void;
}

interface State extends InitialState, ActionsState {};

const initialState: InitialState = {
  products: [],
  sorting: [],
  searchQuery: '',
  pagination: {
    currentPage: 1,
    pageSize: 20,
    totalItems: 0,
  },
}

const useProductsStore =  create<State>()((set) => ({
  ...initialState,
  setProducts: (products) => set(() => ({
    products,
  })),
  setSorting: (updater) =>
    set((state) => ({
      sorting:
        typeof updater === 'function'
          ? updater(state.sorting)
          : updater,
  })),
  setSearchQuery: (searchQuery) => set(() => ({
    searchQuery,
  })),
  setCurrentPage: (page) => set((state) => ({
    pagination: { ...state.pagination, currentPage: page },
  })),
  setPageSize: (size) => set((state) => ({
    pagination: { ...state.pagination, pageSize: size, currentPage: 1 },
  })),
  setTotalItems: (totalItems) => set((state) => ({
    pagination: { ...state.pagination, totalItems: totalItems },
  })),
}))

export const useProducts = () => useProductsStore((state) => state.products);
export const useSorting = () => useProductsStore((state) => state.sorting);
export const useSearchQuery = () => useProductsStore((state) => state.searchQuery);
export const usePagination = () => useProductsStore((state) => state.pagination);

export const setProducts: ActionsState['setProducts'] = (products) => useProductsStore.getState().setProducts(products);
export const setSorting: ActionsState['setSorting'] = (sorting) => useProductsStore.getState().setSorting(sorting);
export const setSearchQuery: ActionsState['setSearchQuery'] = (searchQuery) => useProductsStore.getState().setSearchQuery(searchQuery);
export const setCurrentPage: ActionsState['setCurrentPage'] = (page) => useProductsStore.getState().setCurrentPage(page);
export const setPageSize: ActionsState['setPageSize'] = (size) => useProductsStore.getState().setPageSize(size);
export const setTotalItems: ActionsState['setTotalItems'] = (totalItems) => useProductsStore.getState().setTotalItems(totalItems);
