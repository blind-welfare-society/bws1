// components/QuantitySelector.tsx
import React from 'react';

interface QuantitySelectorProps {
  productId: number;
  quantity: number;
  onIncrement: (productId: number) => void;
  onDecrement: (productId: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ productId, quantity, onIncrement, onDecrement }) => {
  console.log(quantity);
  return (
    <div className="quantity-selector">
      <button className="minus" onClick={() => onDecrement(productId)}>-</button>
      <input type="text" readOnly value={quantity} className="noOfItem" />
      <button className="plus" onClick={() => onIncrement(productId)}>+</button>
    </div>
  );
};

export default QuantitySelector;