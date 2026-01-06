import CartTableHeader from "components/client/cart/cart.table.header";
import CartTableList from "components/client/cart/cart.table.list";
import { useState } from "react";
import CartTableFooter from "./cart.table.footer";

const CartTable = () => {
  const [checkAllBox, setCheckAllBox] = useState<boolean>(false);

  return (
    <div className="cart-table-wrapper">
      <CartTableHeader checkAllBox={checkAllBox} setCheckAllBox={setCheckAllBox} />
      <CartTableList checkAllBox={checkAllBox} />
      <CartTableFooter checkAllBox={checkAllBox} setCheckAllBox={setCheckAllBox} />
    </div>
  );
};

export default CartTable;
