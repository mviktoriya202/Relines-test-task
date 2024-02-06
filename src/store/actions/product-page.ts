import { createAction } from '@reduxjs/toolkit';
import { LinkedProduct, Product } from '../../models';

export const setProduct = createAction<Product>('product-page/set-product');

export const setLinkedProducts = createAction<LinkedProduct[]>(
  'product-page/set-linked-product'
);

export const addProductToCompareList = createAction<Product>(
  'product-page/add-product-to-compare-list'
);

export const setComparingProduct = createAction<LinkedProduct>(
  'product-page/set-comparing-product'
);

export const resetComparingProducts = createAction(
  'product-page/reset-comparing-products'
);
export const removeComparingProduct = createAction<string>(
  'product-page/remove-comparing-product'
);
