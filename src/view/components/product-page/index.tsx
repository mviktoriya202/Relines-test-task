import { CSSProperties, FC, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  setLinkedProducts,
  setProduct,
} from "../../../store/actions/product-page";
import {
  compareListSelector,
  linkedProductsSelector,
  productSelector,
} from "../../../store/selectors/product-page";
import { linkedProductsMapper } from "../../../utils/product";
import { ProductCard } from "../common/productCard";
import { CompareProducts } from "./compareProducts";
import { OtherProducts } from "./otherProducts";
import {
  getCategories,
  getLinkedProducts,
  getProduct,
} from "../../../services/products/api";

const containerStyles: CSSProperties = {
  display: "flex",
  gap: "15px",
};
const compareContainerStyles: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "15px",
  width: "50%",
  position: "relative",
};
const titleStyles: CSSProperties = {
  position: "absolute",
  top: 0,
  left: "51%",
  fontWeight: "bold",
};

export const ProductPage: FC = () => {
  const { productId } = useParams();
  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    (async () => {
      if (productId) {
        const product = await getProduct(productId);
        dispatch(setProduct(product));
        const linkedProducts = await getLinkedProducts(productId);
        const categories = await getCategories();
        const mappedLinkedProducts = linkedProductsMapper(
          product,
          linkedProducts,
          categories
        );
        dispatch(setLinkedProducts(mappedLinkedProducts));
      }
    })();
  }, [dispatch, productId]);

  const product = useAppSelector(productSelector);
  const linkedProducts = useAppSelector(linkedProductsSelector);
  const comparingProducts = useAppSelector(compareListSelector);

  if (!product) return <>Product is not found</>;

  return (
    <>
      <div style={containerStyles}>
        <ProductCard product={product} styles={{ width: "50%" }} />
        {comparingProducts.length ? <p style={titleStyles}>Сравнение</p> : null}
        <div style={compareContainerStyles}>
          <CompareProducts />
        </div>
      </div>
      <OtherProducts linkedProducts={linkedProducts} />
    </>
  );
};
