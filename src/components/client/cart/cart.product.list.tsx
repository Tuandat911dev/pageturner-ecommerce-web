import { useCurrentApp } from "@/components/context/app.context";
import { Button } from "antd";
import CartProductItem from "components/client/cart/cart.product.item";

const CartProductList = () => {
  const { cart } = useCurrentApp();
  return (
    <>
      <div className="cart-product__list-wrapper">
        <p className="cart-product__list-title">Sản Phẩm Mới Thêm</p>
        <div className="cart-product__list">
          {cart.map((item) => {
            return <CartProductItem cart={item} key={item._id} />;
          })}
        </div>
        <div className="cart-product__list-cta">
          <Button type="primary" className="cart-product__list-btn">
            Xem Giỏ Hàng
          </Button>
        </div>
      </div>
    </>
  );
};

export default CartProductList;
