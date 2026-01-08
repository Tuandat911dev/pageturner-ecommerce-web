import { formatVND } from "@/services/helper";

const getImage = (imageName: string) => {
  return `${import.meta.env.VITE_BACKEND_URL}/images/book/${imageName}`;
};

const OrderItem = ({ item }: { item: ICart }) => {
  return (
    <div className="order-item">
      <div className="order-item__main">
        <img src={getImage(item.detail.thumbnail)} alt="" className="order-item__thumb" />
        <div className="order-item__info">
          <p className="order-item__name">{item.detail.mainText}</p>
          <span className="order-item__qty">Số lượng: {item.quantity}</span>
        </div>
      </div>
      <div className="order-item__price">{formatVND(item.detail.price * item.quantity)}</div>
    </div>
  );
};

export default OrderItem;
