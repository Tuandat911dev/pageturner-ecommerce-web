import { Form, Input, Radio, Divider, Button } from "antd";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { formatVND } from "@/services/helper";
import { useEffect, useState } from "react";
import { useCurrentApp } from "@/components/context/app.context";
import { orderAPI } from "@/services/api";
import { App } from "antd";
import { APP_MESSAGES } from "@/constants";

const { TextArea } = Input;

interface IOrder {
  name: string;
  address: string;
  phone: string;
  totalPrice: number;
  detail: {
    bookName: string;
    quantity: number;
    _id: string;
  }[];
}

interface IProps {
  handleNextStep: () => void;
  items: ICart[];
}

const OrderInfo = (props: IProps) => {
  const { handleNextStep, items } = props;
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { cartListChecked, setCartListChecked, cart, setCart } = useCurrentApp();
  const { notification } = App.useApp();

  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const subTotal = items.reduce((acc, item) => acc + item.detail.price * item.quantity, 0);

  const handleDeleteSelectedBookToCart = () => {
    const cartsChecked = new Set(cartListChecked.map((item) => item._id));
    const newCart = cart.filter((item) => !cartsChecked.has(item._id));
    setCart(newCart);
    localStorage.setItem("carts", JSON.stringify(newCart));
    setCartListChecked([]);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFinish = (values: any) => {
    console.log(values);
    const bookDetailList = cartListChecked.map((book) => {
      return {
        bookName: book.detail.mainText,
        quantity: book.quantity,
        _id: book._id,
      };
    });

    const data: IOrder = {
      name: values.fullName,
      address: values.address,
      phone: values.phone,
      totalPrice: subTotal,
      detail: bookDetailList,
    };

    setLoading(true);
    setTimeout(async () => {
      const res = await orderAPI(data);
      if (res.data) {
        notification.success({
          message: APP_MESSAGES.COMMON.SUCCESS_TITLE,
          description: "Đơn hàng của bản đã được đặt",
        });
        handleNextStep();
        setLoading(false);
        handleDeleteSelectedBookToCart();
      } else {
        notification.error({
          message: APP_MESSAGES.COMMON.ERROR_TITLE,
          description: "Có lỗi xảy ra, vui lòng tạo lại đơn hàng",
        });
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="order-info-card">
      <h3 className="info-title">Thông tin giao hàng</h3>

      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ payment: "COD" }}>
        <Form.Item
          label="Họ tên người nhận"
          name="fullName"
          rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Nhập tên người nhận" size="large" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            { required: true, message: "Vui lòng nhập số điện thoại!" },
            { pattern: /^[0-9]{10}$/, message: "Số điện thoại không hợp lệ!" },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" size="large" />
        </Form.Item>

        <Form.Item
          label="Địa chỉ nhận hàng"
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <TextArea placeholder="Nhập địa chỉ nhận hàng chi tiết" rows={3} showCount maxLength={200} />
        </Form.Item>

        <Divider />

        <Form.Item label="Phương thức thanh toán" name="payment">
          <Radio.Group className="payment-radio-group">
            <Radio value="COD">Thanh toán khi nhận hàng (COD)</Radio>
            <Radio value="VNPAY">Thanh toán qua VNPAY</Radio>
          </Radio.Group>
        </Form.Item>

        <div className="summary-section">
          <div className="summary-row">
            <span>Tạm tính</span>
            <span>{formatVND(subTotal)}</span>
          </div>
          <div className="summary-row total">
            <span>Tổng tiền</span>
            <span className="total-price">{formatVND(subTotal)}</span>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-order"
              size="large"
              disabled={!submittable}
              loading={loading}
            >
              ĐẶT HÀNG NGAY ({items.length})
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default OrderInfo;
