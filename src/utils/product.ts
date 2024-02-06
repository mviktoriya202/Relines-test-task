import { Category, LinkedProduct, Product } from '../models';
import getCategoriesIds from './categories';

export const linkedProductsMapper = (
  product: Product,
  linkedProducts: Product[],
  categories: Category[]
): LinkedProduct[] => {
  const categoryIds = getCategoriesIds(categories);
  return linkedProducts.map((linkedProduct) => ({
    ...linkedProduct,
    linkType: linkedProduct.category?.id
      ? linkedProduct.category?.id === product.category?.id
        ? "analog"
        : categoryIds.includes(linkedProduct.category?.id)
        ? "related"
        : undefined
      : undefined,
  }));
};
