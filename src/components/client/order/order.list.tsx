import OrderItem from "./order.item";

const OrderList = ({ items }: { items: ICart[] }) => {
  return (
    <div className="order-list">
      <h2 className="order-title">Đơn hàng của bạn</h2>
      {items.map((item) => (
        <OrderItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default OrderList;
