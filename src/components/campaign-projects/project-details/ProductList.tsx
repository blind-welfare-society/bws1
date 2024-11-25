/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from 'react';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface ProductListProps {
  products: {
    id: number[];
    name: string[];
    price: string[];
    description: string[];
    image: string[];
    totalproducts: number[];
    productQty: number[];
    totalproductsPercent: number[];
  };
  setTotalPrice: (price: number) => void;
  onProductChange: (formattedProducts: string[]) => void;
  resetQuantities: boolean;
  onResetComplete: () => void;
  onProductAdd: () => void;
}

const ProductList = ({ products, setTotalPrice, onProductChange, resetQuantities, onResetComplete, onProductAdd }: ProductListProps) => {
  // State to manage visibility and quantity of each product
  const [quantitySelectors, setQuantitySelectors] = useState<{ [key: number]: { visible: boolean; quantity: number; productPrice: any } }>({});
  

  const addProduct = (id: number, price: any) => {
    setQuantitySelectors((prev) => ({
      ...prev,
      [id]: {
        visible: true,
        quantity: prev[id]?.quantity ? prev[id].quantity + 1 : 1, // Set quantity to 1 on first add, increment if already exists
        productPrice: price * (prev[id]?.quantity ? prev[id].quantity + 1 : 1),
      },
    }));
    onProductAdd();
  };

  
  const incrementQuantity = (id: number, price: any) => {
    setQuantitySelectors((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        quantity: prev[id].quantity + 1,
        productPrice: price * (prev[id]?.quantity ? prev[id].quantity + 1 : 1),
      },
    }));
  };

  const decrementQuantity = (id: number, price: any) => {
    setQuantitySelectors((prev) => {
      const updatedPrev = {
        ...prev,
        [id]: {
          ...prev[id],
          quantity: prev[id]?.quantity ? prev[id].quantity - 1 : 0, // Minimum quantity of 1
          productPrice: price * (prev[id]?.quantity ? prev[id].quantity - 1 : 0),
        },
      };

      if (updatedPrev[id].quantity === 0) {
        updatedPrev[id].visible = false;
      }

      return updatedPrev;
    });
  };

  useEffect(() => {
    if (resetQuantities) {
      setQuantitySelectors({});
      onResetComplete(); // Notify parent reset is complete
    }
  }, [resetQuantities, onResetComplete]);

  
  useEffect(() => {
    const total = Object.values(quantitySelectors).reduce((acc, curr) => {
        return acc + curr.productPrice;
    }, 0) as number;
    
    setTotalPrice(total);

    const formattedProducts = Object.entries(quantitySelectors)
      .filter(([_, selector]) => selector.quantity > 0)
      .map(([id, selector]) => `${id}####${selector.quantity}####${selector.productPrice}`);
    
    onProductChange(formattedProducts);
    

  }, [quantitySelectors, setTotalPrice, onProductChange]);  

  

  return (
    <div className="row" id="productsTab">
      {products?.id?.map((id, index) => (
        
        <div className="col-md-4" key={id}>
          <div className="product_card">
            <div className="productCardWrapper">
              <h4 className="productTitle">{products.name[index]}</h4>
              <div className="productImg">
                <img src={products.image[index]} alt={products.name[index]} />
              </div>

              <div className="progressBarHeading">
                <p className="mb-0">
                  {`${products.productQty[index]} of ${products.totalproducts[index]} Quantity Obtained `}
                </p>
                <div
                  className="progress"
                  title={`${products.totalproductsPercent[index]}% raised`}
                >
                  <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={products.totalproductsPercent[index]}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: `${products.totalproductsPercent[index]}%` }}
                  ></div>
                </div>
              </div>

              <div className="product_details">
                <div className="product-desc">
                  Description
                  <span
                    className="js-btn-tooltip--custom"
                    data-tooltip-id="product-tooltip"
                    data-tooltip-content={products.description[index].replace(/<\/?[^>]+(>|$)/g, "")}
                    aria-describedby="product-tooltip"
                    >
                    i
                  </span>
                  <ReactTooltip id="product-tooltip" role="tooltip" />
                </div>
                <div className="productPrice">
                  ₹{products.price[index]}<i>/</i><span>unit</span>
                </div>
              </div>

              <div className="product_add_to_cart" id={`prod_${index}`}>
                {!quantitySelectors[id]?.visible ? (
                  <button
                    type="button"
                    onClick={() => addProduct(id, products.price[index])}
                    className="product_quantity_btn plus"
                    data-id={id}
                  >
                    ADD+
                  </button>
                ) : (
                  <div className={`number num${id}`}>
                    <input type="hidden" className="itemActual" value={products.price[index]} />
                    <span className="minus" data-id={id} onClick={() => decrementQuantity(id, products.price[index])}>-</span>
                    <input type="text" name="noOfItem[]" className="noOfItem" value={quantitySelectors[id].quantity} readOnly />
                    <span className="plus" data-id={id} onClick={() => incrementQuantity(id, products.price[index])}>+</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;