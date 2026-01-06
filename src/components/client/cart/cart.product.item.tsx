import { formatVND } from "@/services/helper";
import { Typography } from "antd";

interface ICart {
  detail: IBookTable;
  quantity: number;
  _id: string;
}

interface IProps {
  cart: ICart;
}

const getImage = (imageName: string) => {
  return `${import.meta.env.VITE_BACKEND_URL}/images/book/${imageName}`;
};

const CartProductItem = (props: IProps) => {
  const { cart } = props;
  const { Text } = Typography;
  return (
    <>
      <div className="cart-product__item-wrapper">
        <div className="cart-product__item-left">
          <img src={getImage(cart.detail.thumbnail)} alt="" className="cart-product__item-thumb" />
          <Text className="cart-product__item-text">{cart.detail.mainText}</Text>
        </div>
        <div className="cart-product__item-right">
          <span className="cart-product__item-price">{`${formatVND(cart.detail.price)} x ${cart.quantity}`}</span>
        </div>
      </div>
    </>
  );
};

export default CartProductItem;
