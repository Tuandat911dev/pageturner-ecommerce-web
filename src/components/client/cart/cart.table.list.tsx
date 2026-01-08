import { useCurrentApp } from "@/components/context/app.context";
import CartTableItem from "components/client/cart/cart.table.item";

interface IProps {
  handleToggleAll: (v: boolean) => void;
}

const CartTableList = (props: IProps) => {
  const { cart } = useCurrentApp();
  const { handleToggleAll } = props;
  return (
    <>
      {cart.length === 0 ? (
        <div>Chưa Có Sản Phẩm Nào Trong Giỏ Hàng</div>
      ) : (
        cart.map((item) => {
          return <CartTableItem cart={item} key={item._id} handleToggleAll={handleToggleAll} />;
        })
      )}
    </>
  );
};

export default CartTableList;
