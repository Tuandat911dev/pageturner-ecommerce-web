import { useEffect, useState } from "react";
import { App, Button, Form, Input, Modal, type FormProps } from "antd";
import { createUserAPI } from "@/services/api";
import type { ActionType } from "@ant-design/pro-components";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

interface ICreateUser {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
}

const CreateUser = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate, actionRef } = props;
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { notification } = App.useApp();

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const handleCancelModal = () => {
    setOpenModalCreate(false);
    form.resetFields();
  };

  const onFinish: FormProps<ICreateUser>["onFinish"] = (values) => {
    setLoading(true);
    setTimeout(async () => {
      const res = await createUserAPI(values.fullName!, values.password!, values.email!, values.phone!);

      if (res.data) {
        notification.success({
          message: "Thành công",
          description: `${res.message || "Tạo tài khoản thành công"}`,
        });
        form.resetFields();
        setOpenModalCreate(false);
        actionRef.current?.reload();
      }

      if (res.error) {
        notification.error({
          message: "Có lỗi xảy ra",
          description: `${res.message || "Tạo tài khoản không thành công"}`,
        });
      }

      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Modal title="Create Account" open={openModalCreate} maskClosable={false} footer={null} closeIcon={false}>
        <Form form={form} layout="vertical" name="Create User Form" onFinish={onFinish} autoComplete="off">
          <Form.Item<ICreateUser>
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ICreateUser>
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

          <Form.Item<ICreateUser>
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<ICreateUser>
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label={null}>
            <div style={{ display: "flex", alignItems: "center", gap: "5px", justifyContent: "flex-end" }}>
              <Button type="default" onClick={() => handleCancelModal()}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" disabled={!submittable} loading={loading}>
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateUser;
