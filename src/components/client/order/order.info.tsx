import { Form, Input, Radio, Divider, Button } from "antd";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { formatVND } from "@/services/helper";
import { useEffect, useState } from "react";

const { TextArea } = Input;

const OrderInfo = ({ items }: { items: ICart[] }) => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState<boolean>(false);

  const values = Form.useWatch([], form);
  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const subTotal = items.reduce((acc, item) => acc + item.detail.price * item.quantity, 0);

  const onFinish = (values: any) => {
    console.log("Order Data:", { ...values, products: items, total: subTotal });
  };

  return (
    <div className="order-info-card">
      <h3 className="info-title">Thông tin giao hàng</h3>

      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ payment: "COD" }}>
        <Form.Item
          label="Họ tên người nhận"
          name="fullname"
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
            <Button type="primary" htmlType="submit" className="btn-order" size="large" disabled={!submittable}>
              ĐẶT HÀNG NGAY ({items.length})
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default OrderInfo;
