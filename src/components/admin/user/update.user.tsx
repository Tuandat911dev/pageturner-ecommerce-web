import { useEffect, useState } from "react";
import { App, Button, Form, Input, Modal, type FormProps } from "antd";
import { updateUserAPI } from "@/services/api";
import type { ActionType } from "@ant-design/pro-components";

interface IProps {
  openModalUpdate: boolean;
  setOpenModalUpdate: (v: boolean) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  detailUser: IUserTable | null;
  setDetailUser: (v: IUserTable | null) => void;
}

interface IUpdateUser {
  _id?: string;
  fullName?: string;
  phone?: string;
  email?: string;
}

const UpdateUser = (props: IProps) => {
  const { openModalUpdate, setOpenModalUpdate, actionRef, detailUser, setDetailUser } = props;
  const [submittable, setSubmittable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { notification } = App.useApp();

  const values = Form.useWatch([], form);

  useEffect(() => {
    if (detailUser && openModalUpdate) {
      form.setFieldsValue({
        _id: detailUser._id,
        email: detailUser.email,
        fullName: detailUser.fullName,
        phone: detailUser.phone,
      });
    }
  }, [detailUser, openModalUpdate, form]);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  const handleCancelModal = () => {
    setOpenModalUpdate(false);
    setDetailUser(null);
    form.resetFields();
  };

  const onFinish: FormProps<IUpdateUser>["onFinish"] = (values) => {
    setLoading(true);
    setTimeout(async () => {
      const res = await updateUserAPI(values._id!, values.fullName!, values.phone!);
      if (res.data) {
        notification.success({
          message: "Thành công",
          description: `${res.message || "Cập nhật thành công"}`,
        });
        form.resetFields();
        setOpenModalUpdate(false);
        actionRef.current?.reload();
      }
      if (res.error) {
        notification.error({
          message: "Lỗi",
          description: `${res.message || "Cập nhật không thành công"}`,
        });
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <Modal title="Update Account" open={openModalUpdate} maskClosable={false} footer={null} closeIcon={false}>
        <Form form={form} layout="vertical" name="Update User Form" onFinish={onFinish} autoComplete="off">
          <Form.Item<IUpdateUser> label="ID" name="_id" hidden>
            <Input disabled />
          </Form.Item>

          <Form.Item<IUpdateUser> label="Email" name="email">
            <Input disabled />
          </Form.Item>

          <Form.Item<IUpdateUser>
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<IUpdateUser>
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

export default UpdateUser;
