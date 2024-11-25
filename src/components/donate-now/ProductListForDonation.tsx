import { useEffect, useState } from "react";
import axios from "@/lib/axios";
import Image from "next/image";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css"

interface ProductListProps { 
    setTotalPrice: (price: number) => void;
    setFormattedProducts: (setFormattedProducts: string[]) => void;
}

const ProductListForDonation = ({ setTotalPrice, setFormattedProducts}: ProductListProps) => { 
    const pathName = "/product-list-for-donate";
    const [productList, setProductList] = useState({} as any);
    const [quantitySelectors, setQuantitySelectors] = useState<{ [key: number]: { visible: boolean; quantity: number; productPrice: any } }>({});
    
    useEffect(() => {
        axios.get(pathName).then((res) => {
            setProductList(res.data);
        });
    }, [pathName]);

    const donationItemList = productList.data?.donationItems;
    
    const addProduct = (id: number, price: any) => {
    setQuantitySelectors((prev) => ({
      ...prev,
      [id]: {
        visible: true,
        quantity: prev[id]?.quantity ? prev[id].quantity + 1 : 1, // Set quantity to 1 on first add, increment if already exists
        productPrice: price * (prev[id]?.quantity ? prev[id].quantity + 1 : 1),
      },
    }));
    //onProductAdd();
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

    //console.log(quantitySelectors);
    useEffect(() => {
        const total = Object.values(quantitySelectors).reduce((acc, curr) => {
            return acc + curr.productPrice;
        }, 0) as number;
        
        setTotalPrice(total);

        const formattedProductsList = Object.entries(quantitySelectors)
        .filter(([_, selector]) => selector.quantity > 0)
        .map(([id, selector]) => `${id}#${selector.quantity}#${selector.productPrice}`);
        
        setFormattedProducts(formattedProductsList);

    }, [quantitySelectors, setTotalPrice, setFormattedProducts]); 

    return (
        <div className="row donationItems">
            {
            donationItemList?.map((item: any) => (
                <div className="col-md-12 itemContainer" key={item.id}>
                    <div className="row">
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-5">
                                    <Image src={item.image} alt="Image" width={125} height={100} />
                                </div>
                                <div className="col-md-7">
                                    <p className="itemName">{item.name}<br /><small>tax benifits: 50%</small></p>
                                    <div className="product-desc">
                                        Description
                                        <span
                                            className="js-btn-tooltip--custom"
                                            data-tooltip-id="product-tooltip"
                                            data-tooltip-content={item?.description?.replace(/<\/?[^>]+(>|$)/g, "")}
                                            aria-describedby="product-tooltip"
                                            >i</span>
                                        <ReactTooltip id="product-tooltip" role="tooltip" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="row">
                                <div className="col-md-4">₹ {item.price}</div>
                                <div className="col-md-4 text-center">
                                    <div className="product_add_to_cart" id={`prod_${item.id}`}>
                                        {!quantitySelectors[item.id]?.visible ? (
                                        <button
                                            type="button"
                                            onClick={() => addProduct(item.id, item.price)}
                                            className="product_quantity_btn plus"
                                            data-id={item.id}
                                        >
                                            ADD+
                                        </button>
                                        ) : (
                                        <div className={`number num${item.id}`}>

                                            <span className="minus" data-id={item.id} onClick={() => decrementQuantity(item.id, item.price)}>-</span>
                                            <input type="text" name="noOfItem[]" className="noOfItem" value={quantitySelectors[item.id].quantity} readOnly />
                                            <span className="plus" data-id={item.id} onClick={() => incrementQuantity(item.id, item.price)}>+</span>
                                        </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-md-4 text-right">₹<span className="itemTotal">{quantitySelectors[item.id]?.productPrice || 0}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div>
    )
}

export default ProductListForDonation;