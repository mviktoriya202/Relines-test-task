import { useEffect, useState } from 'react';
import { LinkedProduct, Product } from '../../../models';
import { useAppDispatch } from '../../../store';
import { setComparingProduct } from '../../../store/actions/product-page';
import { Modal } from '../common/modal';
import { ProductCard } from '../common/productCard';
import { useLessThenMediaQuery } from '../../hooks/media-query';

interface Props {
  linkedProducts: LinkedProduct[];
}

export const OtherProducts = ({ linkedProducts }: Props) => {
  const analogProducts = linkedProducts.filter((p) => p.linkType === "analog");
  const relatedProducts = linkedProducts.filter(
    (p) => p.linkType === "related"
  );
  const notRelatedProducts = linkedProducts.filter((p) => !p.linkType);
  const getProductTypeText = (product: LinkedProduct) => {
    switch (product.linkType) {
      case "analog":
        return "Аналог:";
      case "related":
        return "Сопутствующий товар:";
      default:
        return "";
    }
  };
  const dispatch = useAppDispatch();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const isMobile = useLessThenMediaQuery(450);

  const handleClick = (product: LinkedProduct) => {
    setSelectedProduct(product);
    if (product.linkType === "analog") {
      dispatch(setComparingProduct(product));
    } else {
      isMobile && window.history.pushState({ isModalOpen: true }, "");
      setModalOpen(true);
    }
  };
  const handleClose = () => {
    isMobile && window.history.replaceState({ isModalOpen: false }, "");
    setModalOpen(false);
  };

  useEffect(() => {
    const handlePopState = () => {
      setModalOpen(false);
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      <ul>
        {analogProducts.map((linkedProduct) => (
          <li key={linkedProduct.id}>
            {getProductTypeText(linkedProduct)}
            <button onClick={() => handleClick(linkedProduct)}>
              {linkedProduct.name}
            </button>
          </li>
        ))}
        {relatedProducts.map((linkedProduct) => (
          <li key={linkedProduct.id}>
            {getProductTypeText(linkedProduct)}
            <button onClick={() => handleClick(linkedProduct)}>
              {linkedProduct.name}
            </button>
          </li>
        ))}
        {notRelatedProducts.map((linkedProduct) => (
          <li key={linkedProduct.id}>
            {getProductTypeText(linkedProduct)}
            <button onClick={() => handleClick(linkedProduct)}>
              {linkedProduct.name}
            </button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <Modal isOpen={isModalOpen} onClose={handleClose}>
          <ProductCard product={selectedProduct} styles={{ border: "none" }} />
        </Modal>
      )}
    </>
  );
};
