import { CSSProperties } from 'react';
import { Product } from '../../../models';

interface Props {
  product: Product;
  styles?: CSSProperties;
  isForCompare?: boolean;
  onDelete?: () => void;
}

const containerStyles: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  border: '1px dashed black',
  position: 'relative',
};

const headerStyles: CSSProperties = {
  margin: '5px',
};

const priceStyles: CSSProperties = {
  margin: '5px',
};
const btnStyles: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  margin: '5px',
};

export const ProductCard = ({
  product,
  styles,
  isForCompare,
  onDelete,
}: Props) => {
  return (
    <div style={{ ...containerStyles, ...styles }}>
      {isForCompare && (
        <button type="button" onClick={onDelete} style={btnStyles}>
          X
        </button>
      )}
      <h3 style={headerStyles}>{product.name}</h3>
      <p style={priceStyles}>Price: {product.price}</p>
    </div>
  );
};
