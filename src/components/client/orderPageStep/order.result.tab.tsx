import OrderErrorResult from "components/client/order/order.error";
import OrderSuccessResult from "components/client/order/order.success";

interface IProps {
  orderSuccess: boolean;
}
const OrderResult = (props: IProps) => {
  const { orderSuccess } = props;

  return (
    <>
      <div className="order-result__wrapper">
        <div className="order-result__content">{orderSuccess ? <OrderSuccessResult /> : <OrderErrorResult />}</div>
      </div>
    </>
  );
};

export default OrderResult;
