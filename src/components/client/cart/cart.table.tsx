import CartTableHeader from "components/client/cart/cart.table.header";
import CartTableList from "components/client/cart/cart.table.list";

const CartTable = () => {
  return (
    <div className="cart-table-wrapper">
      <CartTableHeader />
      <CartTableList />
    </div>
  );
};

export default CartTable;
