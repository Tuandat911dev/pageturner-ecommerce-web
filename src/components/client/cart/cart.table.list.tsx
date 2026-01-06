import { useCurrentApp } from "@/components/context/app.context";
import CartTableItem from "components/client/cart/cart.table.item";

const CartTableList = () => {
  const { cart } = useCurrentApp();
  return (
    <>
      {cart.length === 0 ? (
        <div>Chưa Có Sản Phẩm Nào Trong Giỏ Hàng</div>
      ) : (
        cart.map((item) => {
          return <CartTableItem cart={item} key={item._id} />;
        })
      )}
    </>
  );
};

export default CartTableList;
