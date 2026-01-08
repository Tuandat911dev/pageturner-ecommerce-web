import CartTableHeader from "components/client/cart/cart.table.header";
import CartTableList from "components/client/cart/cart.table.list";
import { useState } from "react";
import CartTableFooter from "components/client/cart/cart.table.footer";
import { useCurrentApp } from "@/components/context/app.context";

interface IProps {
  handleNextStep: () => void;
}

const CartTab = (props: IProps) => {
  const { handleNextStep } = props;
  const { cart, setCart, cartListChecked, setCartListChecked } = useCurrentApp();
  const [checkAllBox, setCheckAllBox] = useState<boolean>(false);

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
      <CartTableList handleToggleAll={handleToggleAll} />
      <CartTableFooter
        checkAllBox={checkAllBox}
        handleToggleAll={handleToggleAll}
        handleDeleteSelectedCart={handleDeleteSelectedCart}
        handleNextStep={handleNextStep}
      />
    </div>
  );
};

export default CartTab;
