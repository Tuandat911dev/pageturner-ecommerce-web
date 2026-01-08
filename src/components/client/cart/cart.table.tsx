import CartTableHeader from "components/client/cart/cart.table.header";
import CartTableList from "components/client/cart/cart.table.list";
import { useState } from "react";
import CartTableFooter from "./cart.table.footer";
import { useCurrentApp } from "@/components/context/app.context";

const CartTable = () => {
  const { cart, setCart } = useCurrentApp();
  const [checkAllBox, setCheckAllBox] = useState<boolean>(false);
  const [cartListChecked, setCartListChecked] = useState<ICart[]>([]);

  const handleToggleAll = (checked: boolean) => {
    setCheckAllBox(checked);
    if (checked) {
      setCartListChecked(cart);
    } else {
      setCartListChecked([]);
    }
  };

  const handleDeleteSelectedCart = () => {
    const cartsChecked = new Set(cartListChecked.map((item) => item._id));
    const carts = cart.filter((item) => !cartsChecked.has(item._id));
    setCart(carts);
    localStorage.setItem("carts", JSON.stringify(carts));
    setCartListChecked([]);
  };

  return (
    <div className="cart-table-wrapper">
      <CartTableHeader checkAllBox={checkAllBox} handleToggleAll={handleToggleAll} />
      <CartTableList
        cartListChecked={cartListChecked}
        setCartListChecked={setCartListChecked}
        handleToggleAll={handleToggleAll}
      />
      <CartTableFooter
        checkAllBox={checkAllBox}
        handleToggleAll={handleToggleAll}
        cartListChecked={cartListChecked}
        handleDeleteSelectedCart={handleDeleteSelectedCart}
      />
    </div>
  );
};

export default CartTable;
