import type { AxiosResponse } from "axios";
import api from './axios.instance';

import type { NewProduct, Product, ProductsResponse } from "../../entities/product/model/types";

export interface ProductsParams {
  limit?: number;
  skip?: number;
  select?: string;
  q?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface SearchProductsParams extends Omit<ProductsParams, 'q'>  {
  q: string;
}

export const ProductsService = {
  async getAllProducts(params?: ProductsParams): Promise<ProductsResponse> {
    const response: AxiosResponse<ProductsResponse> = await api.get('/products', {
      params
    });
    return response.data;
  },

  async getSearchProducts(params?: SearchProductsParams): Promise<ProductsResponse> {
    const response: AxiosResponse<ProductsResponse> = await api.get('/products/search', {
      params
    });
    return response.data;
  },

  async addProduct(data: NewProduct): Promise<Product> {
    const response: AxiosResponse<Product> = await api.post('/products/add', data);
    return response.data;
  },
};
