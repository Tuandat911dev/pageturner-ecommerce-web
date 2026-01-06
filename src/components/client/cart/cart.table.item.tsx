import { useCurrentApp } from "@/components/context/app.context";
import { formatVND } from "@/services/helper";
import { PlusOutlined, MinusOutlined, DeleteOutlined } from "@ant-design/icons";
import { InputNumber } from "antd";
import { useState } from "react";

interface ICart {
  detail: IBookTable;
  quantity: number;
  _id: string;
}

interface IProps {
  cart: ICart;
}

type TInputNumber = "increase" | "decrease";

const CartTableItem = (props: IProps) => {
  const { cart } = props;
  const { setCart } = useCurrentApp();
  const [currentQuantity, setCurrentQuantity] = useState<number>(cart.quantity);

  const getImage = (imageName: string) => {
    return `${import.meta.env.VITE_BACKEND_URL}/images/book/${imageName}`;
  };

  const handleChangQuantity = (v: TInputNumber) => {
    const cartData = localStorage.getItem("carts");
    if (cartData) {
      const carts = JSON.parse(cartData) as ICart[];
      const modifyCart = carts.find((item) => item._id === cart._id);
      let modifyQuantity = currentQuantity;

      if (modifyCart) {
        if (v === "increase") {
          modifyQuantity++;
        } else {
          modifyQuantity--;
        }
        modifyCart.quantity = modifyQuantity;
      }
      localStorage.setItem("carts", JSON.stringify(carts));
      setCart(carts);
      setCurrentQuantity(modifyQuantity);
    }
  };

  return (
    <>
      <div className="cart-table-item">
        <div className="cart-table-item__checkbox">
          <input id={cart._id} type="checkbox" hidden />
          <label htmlFor={cart._id}></label>
        </div>
        <div className="cart-table-item__product">
          <div className="cart-table-item__product-wrapper">
            <img src={getImage(cart.detail.thumbnail)} alt="" className="cart-table-item__product-thumb" />
            <p className="cart-table-item__product-text">{cart.detail.mainText}</p>
          </div>
        </div>
        <div className="cart-table-item__price">
          <span>{formatVND(cart.detail.price)}</span>
        </div>
        <div className="cart-table-item__quantity">
          <div className="quantity-control">
            <div className="quantity__input-wrapper">
              <button
                className="quantity__input-btn decrease"
                onClick={() => handleChangQuantity("decrease")}
                disabled={currentQuantity <= 1}
              >
                <MinusOutlined />
              </button>
              <InputNumber
                min={1}
                max={cart.detail.quantity}
                value={currentQuantity}
                onChange={(value) => setCurrentQuantity(value || 1)}
                className="input-quantity"
                controls={false}
                readOnly={true}
              />
              <button
                className="quantity__input-btn increase"
                onClick={() => handleChangQuantity("increase")}
                disabled={currentQuantity >= cart.detail.quantity}
              >
                <PlusOutlined />
              </button>
            </div>
          </div>
        </div>
        <div className="cart-table-item__total-price">
          <span>{formatVND(cart.detail.price * cart.quantity)}</span>
        </div>
        <div className="cart-table-item__action">
          <span>
            <DeleteOutlined /> Xoá
          </span>
        </div>
      </div>
    </>
  );
};

export default CartTableItem;
