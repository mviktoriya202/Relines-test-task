import { ProductCard } from "../common/productCard";
import { compareListSelector } from "../../../store/selectors/product-page";
import useUnMount from "../../hooks/useUnMount";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  removeComparingProduct,
  resetComparingProducts,
} from "../../../store/actions/product-page";
import { Product } from "../../../models";

export const CompareProducts = () => {
  const comparingProducts = useAppSelector(compareListSelector);
  const dispatch = useAppDispatch();

  const handleDelete = (product: Product) => {
    dispatch(removeComparingProduct(product.id));
  };

  useUnMount(() => {
    dispatch(resetComparingProducts());
  });

  return (
    <>
      {comparingProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isForCompare
          onDelete={() => handleDelete(product)}
          styles={{ width: "120px" }}
        />
      ))}
    </>
  );
};
