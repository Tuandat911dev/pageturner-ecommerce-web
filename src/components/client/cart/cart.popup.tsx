import { useCurrentApp } from "@/components/context/app.context";
import CartProductList from "./cart.product.list";

interface IProps {
  children: React.ReactNode;
}

const ProductCart = (props: IProps) => {
  const { children } = props;
  const { cart } = useCurrentApp();
  return (
    <>
      <div className="cart-btn">
        {children}
        <div className="cart-preview">
          {cart.length === 0 ? (
            <div className="cart-message__wrapper">
              <p className="cart-message">Chưa Có Sản Phẩm</p>
            </div>
          ) : (
            <CartProductList />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCart;
