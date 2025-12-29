import { registerAPI } from "@/services/api";
import type { FormProps } from "antd";
import { Button, Divider, Form, Input } from "antd";
import { Link, redirect, useNavigate } from "react-router-dom";
import { App } from "antd";

interface IRegister {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const RegisterPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish: FormProps<IRegister>["onFinish"] = async (values) => {
    const res = await registerAPI(values.fullName!, values.email!, values.password!, values.phone!);

    if (res.data) {
      message.success(res.message || "Tạo tài khoản thành công");
      form.resetFields();
      navigate("/login");
    }

    if (res.error) {
      message.error(res.message);
    }
  };

  const onFinishFailed: FormProps<IRegister>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <article className="register">
        <h1 className="register--title">Đăng ký tài khoản</h1>
        <Form
          form={form}
          layout="vertical"
          name="Register Form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<IRegister>
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IRegister>
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IRegister>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<IRegister>
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <Divider>Hoặc</Divider>

        <div className="register-footer">
          <p className="register-footer__text">Đã có tài khoản ?</p>
          <Link className="register-footer__link" to={`/login`}>
            Đăng nhập
          </Link>
        </div>
      </article>
    </>
  );
};

export default RegisterPage;
