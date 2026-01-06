import { useCurrentApp } from "@/components/context/app.context";
import CartTableItem from "components/client/cart/cart.table.item";

interface IProps {
  checkAllBox: boolean;
}

const CartTableList = (props: IProps) => {
  const { cart } = useCurrentApp();
  const { checkAllBox } = props;
  return (
    <>
      {cart.length === 0 ? (
        <div>Chưa Có Sản Phẩm Nào Trong Giỏ Hàng</div>
      ) : (
        cart.map((item) => {
          return <CartTableItem cart={item} key={item._id} checkAllBox={checkAllBox} />;
        })
      )}
    </>
  );
};

export default CartTableList;
