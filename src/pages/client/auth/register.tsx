import type { FormProps } from "antd";
import { Button, Divider, Form, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IRegister {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const onFinish: FormProps<IRegister>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<IRegister>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <article className="register">
        <h1 className="register--title">Đăng ký tài khoản</h1>
        <Form
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
            <Button type="primary" htmlType="submit" loading={loading}>
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
