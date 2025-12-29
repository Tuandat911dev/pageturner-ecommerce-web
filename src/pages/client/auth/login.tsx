import { loginAPI } from "@/services/api";
import type { FormProps } from "antd";
import { Button, Divider, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { App } from "antd";
import { useEffect, useState } from "react";
import { useCurrentApp } from "@/components/context/app.context";

interface ILogin {
  username?: string;
  password?: string;
}

const LoginPage = () => {
  const { notification, message } = App.useApp();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const values = Form.useWatch([], form);
  const { setUser, setIsAuthenticated } = useCurrentApp();

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const onFinish: FormProps<ILogin>["onFinish"] = async (values) => {
    setLoading(true);
    const res = await loginAPI(values.username!, values.password!);

    if (res.data) {
      notification.success({
        title: "Đăng nhập thành công",
        description: `Chào mừng ${res.data.user.fullName || "bạn"}`,
      });
      form.resetFields();
      setIsAuthenticated(true);
      setUser(res.data.user);
      localStorage.setItem("access_token", res.data.access_token);
      navigate("/");
    }

    if (res.error) {
      message.error(res.message);
    }

    setLoading(false);
  };

  const onFinishFailed: FormProps<ILogin>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <article className="auth">
        <h1 className="auth--title">Đăng nhập</h1>
        <Form
          form={form}
          layout="vertical"
          name="Login Form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<ILogin>
            label="Email"
            name="username"
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

          <Form.Item<ILogin>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" disabled={!submittable} loading={loading}>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>

        <Divider>Hoặc</Divider>

        <div className="auth-footer">
          <p className="auth-footer__text">Chưa có tài khoản ?</p>
          <Link className="auth-footer__link" to={`/register`}>
            Đăng ký
          </Link>
        </div>
      </article>
    </>
  );
};

export default LoginPage;
