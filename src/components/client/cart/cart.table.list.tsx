import { useCurrentApp } from "@/components/context/app.context";
import CartTableItem from "components/client/cart/cart.table.item";

interface ICart {
  detail: IBookTable;
  quantity: number;
  _id: string;
}

interface IProps {
  cartListChecked: ICart[];
  setCartListChecked: (v: ICart[]) => void;
  handleToggleAll: (v: boolean) => void;
}

const CartTableList = (props: IProps) => {
  const { cart } = useCurrentApp();
  const { cartListChecked, setCartListChecked, handleToggleAll } = props;
  return (
    <>
      {cart.length === 0 ? (
        <div>Chưa Có Sản Phẩm Nào Trong Giỏ Hàng</div>
      ) : (
        cart.map((item) => {
          return (
            <CartTableItem
              cart={item}
              key={item._id}
              cartListChecked={cartListChecked}
              setCartListChecked={setCartListChecked}
              handleToggleAll={handleToggleAll}
            />
          );
        })
      )}
    </>
  );
};

export default CartTableList;
