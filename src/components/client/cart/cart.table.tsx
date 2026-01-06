import CartTableHeader from "components/client/cart/cart.table.header";
import CartTableList from "components/client/cart/cart.table.list";
import { useState } from "react";

const CartTable = () => {
  const [checkAllBox, setCheckAllBox] = useState<boolean>(false);

  return (
    <div className="cart-table-wrapper">
      <CartTableHeader checkAllBox={checkAllBox} setCheckAllBox={setCheckAllBox} />
      <CartTableList checkAllBox={checkAllBox} />
    </div>
  );
};

export default CartTable;
