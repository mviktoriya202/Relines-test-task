import { PayloadAction, createReducer } from '@reduxjs/toolkit';
import { LinkedProduct, Product } from '../../models';

type CatalogPageState = {
  product: Product | undefined;
  linkedProducts: LinkedProduct[] | undefined;
  comparingProducts: Product[];
};

const defaultState: CatalogPageState = {
  product: undefined,
  linkedProducts: undefined,
  comparingProducts: [],
};

export const productPageReducer = createReducer<CatalogPageState>(
  defaultState,
  {
    "product-page/set-product": (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    "product-page/set-linked-product": (
      state,
      action: PayloadAction<LinkedProduct[]>
    ) => {
      state.linkedProducts = action.payload;
    },
    "product-page/set-comparing-product": (
      state,
      action: PayloadAction<LinkedProduct>
    ) => {
      if (
        state.comparingProducts.find(
          (product) => product.id === action.payload.id
        )
      ) {
        alert("Товар уже сравнивается.");
        return;
      }
      state.comparingProducts?.push(action.payload);
    },
    "product-page/reset-comparing-products": (state) => {
      state.comparingProducts = [];
    },
    "product-page/remove-comparing-product": (
      state,
      action: PayloadAction<string>
    ) => {
      state.comparingProducts = state.comparingProducts.filter(
        (product) => product.id !== action.payload
      );
    },
  }
);
