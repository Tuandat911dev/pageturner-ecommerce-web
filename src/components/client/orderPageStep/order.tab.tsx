import { useCurrentApp } from "@/components/context/app.context";
import OrderInfo from "components/client/order/order.info";
import OrderList from "components/client/order/order.list";
import { useMemo } from "react";

const OrderTab = () => {
  const { cart, cartListChecked } = useCurrentApp();

  const carts = useMemo(() => {
    const cartsChecked = new Set(cartListChecked.map((item) => item._id));
    return cart.filter((item) => cartsChecked.has(item._id));
  }, [cartListChecked, cart]);

  return (
    <div className="order-wrapper">
      <div className="order-container">
        <div className="order-left">
          <OrderList items={carts} />
        </div>

        <div className="order-right">
          <OrderInfo items={carts} />
        </div>
      </div>
    </div>
  );
};

export default OrderTab;
