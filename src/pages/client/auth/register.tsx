import { registerAPI } from "@/services/api";
import type { FormProps } from "antd";
import { Button, Divider, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { App } from "antd";
import { useEffect, useState } from "react";
import { APP_MESSAGES } from "@/constants";

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
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const onFinish: FormProps<IRegister>["onFinish"] = (values) => {
    setLoading(true);
    setTimeout(async () => {
      const res = await registerAPI(values.fullName!, values.email!, values.password!, values.phone!);

      if (res.data) {
        message.success(res.message || APP_MESSAGES.AUTH.REGISTER_SUCCESS_MESSAGE);
        form.resetFields();
        navigate("/login");
      }

      if (res.error) {
        message.error(res.message || APP_MESSAGES.AUTH.REGISTER_FAILED_MESSAGE);
      }

      setLoading(false);
    }, 1500);
  };

  const onFinishFailed: FormProps<IRegister>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <article className="auth">
        <h1 className="auth--title">Đăng ký tài khoản</h1>
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
            rules={[{ required: true, message: APP_MESSAGES.USER.VALIDATION.REQUIRED.FULLNAME }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IRegister>
            label="Email"
            name="email"
            rules={[
              { required: true, message: APP_MESSAGES.USER.VALIDATION.REQUIRED.EMAIL },
              {
                type: "email",
                message: APP_MESSAGES.USER.VALIDATION.INVALID.EMAIL,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IRegister>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: APP_MESSAGES.USER.VALIDATION.REQUIRED.PASSWORD }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<IRegister>
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: APP_MESSAGES.USER.VALIDATION.REQUIRED.PHONE }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" disabled={!submittable} loading={loading}>
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <Divider>Hoặc</Divider>

        <div className="auth-footer">
          <p className="auth-footer__text">Đã có tài khoản ?</p>
          <Link className="auth-footer__link" to={`/login`}>
            Đăng nhập
          </Link>
        </div>
      </article>
    </>
  );
};

export default RegisterPage;
