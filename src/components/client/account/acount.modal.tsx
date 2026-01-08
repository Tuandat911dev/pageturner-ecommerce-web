import { useEffect, useState } from "react";
import {
  Modal,
  Menu,
  Form,
  Input,
  Image,
  Upload,
  Row,
  Col,
  type UploadFile,
  type GetProp,
  type UploadProps,
} from "antd";
import { UserOutlined, LockOutlined, PhoneOutlined } from "@ant-design/icons";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { App } from "antd";
import { callUploadImageAvatar, updateAccountAPI } from "@/services/api";
import { useCurrentApp } from "@/components/context/app.context";

interface IProps {
  isModalAccountOpen: boolean;
  setIsModalAccountOpen: (v: boolean) => void;
}

interface IFormInfo {
  fullName: string;
  phone: string;
  email: string;
  avatar: string;
}

type TActiveKey = "info" | "password";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const AccountModal = (props: IProps) => {
  const { isModalAccountOpen, setIsModalAccountOpen } = props;
  const [activeKey, setActiveKey] = useState<TActiveKey>("info");
  const [formInfo] = Form.useForm();
  const [formPass] = Form.useForm();
  const [previewOpenAvatar, setPreviewOpenAvatar] = useState(false);
  const [previewImageAvatar, setPreviewImageAvatar] = useState("");
  const [fileListAvatar, setFileListAvatar] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { message } = App.useApp();
  const { user } = useCurrentApp();

  useEffect(() => {
    if (user && isModalAccountOpen) {
      formInfo.setFieldsValue({
        fullName: user.fullName,
        phone: user.phone,
        email: user.email,
      });

      if (user.avatar) {
        const avatar: UploadFile[] = [
          {
            uid: "-1",
            name: user.avatar,
            status: "done",
            url: `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${user.avatar}`,
          },
        ];
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFileListAvatar(avatar);
        formInfo.setFieldsValue({ avatar: user.avatar });
      }
    }
  }, [formInfo, user, isModalAccountOpen]);

  const handleOk = () => {
    if (activeKey === "info") {
      formInfo.submit();
    } else {
      formPass.submit();
    }
    // setIsModalAccountOpen(false);
  };

  const handleCancel = () => {
    setIsModalAccountOpen(false);
    formInfo.resetFields();
    formPass.resetFields();
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <UserOutlined style={{ fontSize: "25px", color: "#ccc" }} />
    </button>
  );

  const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/webp";
    if (!isJpgOrPng) {
      message.error("Bạn chỉ có thể upload file JPG/PNG/WebP!");
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Ảnh phải nhỏ hơn 5MB!");
    }
    return isJpgOrPng && isLt5M;
  };

  const handleUploadFile = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    try {
      const res = await callUploadImageAvatar(file);
      if (res.data) {
        const fileName = res.data;
        onSuccess?.(fileName);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError?.(error);
    }
  };

  const handlePreviewAvatar = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImageAvatar(file.url || (file.preview as string));
    setPreviewOpenAvatar(true);
  };

  const handleChangeAvatar: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileListAvatar(newFileList);

  // handle submit form
  const handleSubmitFormInfo = (values: IFormInfo) => {
    let currentAvatar = user!.avatar;
    if (fileListAvatar[0].response) {
      currentAvatar = fileListAvatar[0].response.fileUploaded;
    }

    const data = {
      fullName: values.fullName,
      phone: values.phone,
      avatar: currentAvatar,
      _id: user!.id,
    };

    setLoading(true);
    setTimeout(async () => {
      const res = await updateAccountAPI(data);
      if (res && res.data) {
        message.success("Cập nhật tài khoản thành công");
        setLoading(false);
        setIsModalAccountOpen(false);
        formInfo.resetFields();
      }
    }, 1500);
  };

  return (
    <Modal
      title="Cài đặt tài khoản"
      open={isModalAccountOpen}
      onCancel={() => handleCancel()}
      onOk={handleOk}
      width={800}
      maskClosable={false}
      okText="Cập nhật"
      cancelText="Hủy"
      className="user-info-modal"
      confirmLoading={loading}
    >
      <Row gutter={24} style={{ minHeight: "400px" }}>
        <Col span={8} className="modal-sidebar">
          <Menu
            mode="inline"
            selectedKeys={[activeKey]}
            onClick={(e) => setActiveKey(e.key as TActiveKey)}
            items={[
              { key: "info", icon: <UserOutlined />, label: "Thông tin tài khoản" },
              { key: "password", icon: <LockOutlined />, label: "Đổi mật khẩu" },
            ]}
          />
        </Col>

        <Col span={16} className="modal-content">
          {activeKey === "info" ? (
            <Form<IFormInfo> form={formInfo} layout="vertical" onFinish={(values) => handleSubmitFormInfo(values)}>
              <Form.Item label="Ảnh đại diện" name="avatar">
                <div className="avatar-section">
                  <Upload
                    listType="picture-circle"
                    fileList={fileListAvatar}
                    onPreview={handlePreviewAvatar}
                    onChange={handleChangeAvatar}
                    beforeUpload={beforeUpload}
                    customRequest={handleUploadFile}
                  >
                    {fileListAvatar.length >= 1 ? null : uploadButton}
                  </Upload>

                  {previewImageAvatar && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpenAvatar,
                        onVisibleChange: (visible) => setPreviewOpenAvatar(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImageAvatar(""),
                      }}
                      src={previewImageAvatar}
                    />
                  )}
                </div>
              </Form.Item>

              <Form.Item label="Họ tên" name="fullName" rules={[{ required: true }]}>
                <Input prefix={<UserOutlined />} placeholder="Nhập họ tên" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
                <Input prefix={<PhoneOutlined />} placeholder="Nhập số điện thoại" />
              </Form.Item>

              <Form.Item label="Email" name="email">
                <Input disabled placeholder="email@example.com" />
              </Form.Item>
            </Form>
          ) : (
            <Form form={formPass} layout="vertical" onFinish={(values) => console.log("Change Pass:", values)}>
              <Form.Item label="Mật khẩu cũ" name="oldPassword" rules={[{ required: true }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu hiện tại" />
              </Form.Item>

              <Form.Item label="Mật khẩu mới" name="newPassword" rules={[{ required: true }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Nhập mật khẩu mới" />
              </Form.Item>

              <Form.Item
                label="Xác nhận mật khẩu mới"
                name="confirmPassword"
                dependencies={["newPassword"]}
                rules={[
                  { required: true },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Nhập lại mật khẩu mới" />
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default AccountModal;
