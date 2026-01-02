import {
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  Image,
  type UploadFile,
  type GetProp,
  type UploadProps,
  App,
} from "antd";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { callUploadImageBook, createBookAPI, getBookCategory } from "@/services/api";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { APP_MESSAGES } from "@/constants";
import type { ActionType } from "@ant-design/pro-components";

interface IProps {
  openModalCreate: boolean;
  setOpenModalCreate: (v: boolean) => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
}

type FieldType = {
  thumbnail: string;
  slider: string[];
  mainText: string;
  author: string;
  price: number;
  sold: number;
  quantity: number;
  category: string;
};

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const CreateBook = (props: IProps) => {
  const { openModalCreate, setOpenModalCreate, actionRef } = props;
  const [previewOpenThumb, setPreviewOpenThumb] = useState(false);
  const [previewOpenSlider, setPreviewOpenSlider] = useState(false);
  const [previewImageThumb, setPreviewImageThumb] = useState("");
  const [previewImageSlider, setPreviewImageSlider] = useState("");
  const [fileListThumb, setFileListThumb] = useState<UploadFile[]>([]);
  const [fileListSlider, setFileListSlider] = useState<UploadFile[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();

  useEffect(() => {
    const getCategories = async () => {
      const res = await getBookCategory();
      if (res.data) {
        setCategories(res.data);
      }
    };

    getCategories();
  }, []);

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpenModalCreate(false);
    form.resetFields();
  };

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

  const handleUploadFileThumb = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    try {
      const res = await callUploadImageBook(file);
      if (res.data) {
        const fileName = res.data;
        onSuccess?.(fileName);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError?.(error);
    }
  };

  const handleUploadFileSlider = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    try {
      const res = await callUploadImageBook(file);
      if (res.data) {
        const fileName = res.data;
        onSuccess?.(fileName);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      onError?.(error);
    }
  };

  const onFinish = (values: FieldType) => {
    const thumbnail = fileListThumb[0]?.response.fileUploaded;
    const slider = fileListSlider.map((file) => file.response.fileUploaded);

    if (!thumbnail) {
      message.error("Vui lòng upload ảnh đại diện");
      return;
    }

    const data = {
      ...values,
      thumbnail: thumbnail,
      slider: slider,
    };

    setLoading(true);
    setTimeout(async () => {
      const res = await createBookAPI(data);
      if (res.data) {
        notification.success({
          message: APP_MESSAGES.COMMON.SUCCESS_TITLE,
          description: `${res.message || APP_MESSAGES.BOOK.CREATE_SUCCESS}`,
        });
        setOpenModalCreate(false);
        form.resetFields();
        setFileListSlider([]);
        setFileListThumb([]);
        actionRef.current?.reload();
      } else {
        notification.error({
          message: APP_MESSAGES.COMMON.ERROR_TITLE,
          description: `${res.message || APP_MESSAGES.BOOK.CREATE_FAILED}`,
        });
      }
      setLoading(false);
    }, 1500);
  };

  const handlePreviewThumb = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImageThumb(file.url || (file.preview as string));
    setPreviewOpenThumb(true);
  };

  const handlePreviewSlider = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImageSlider(file.url || (file.preview as string));
    setPreviewOpenSlider(true);
  };

  const handleChangeThumb: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileListThumb(newFileList);

  const handleChangeSlider: UploadProps["onChange"] = ({ fileList: newFileList }) => setFileListSlider(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <>
      <Modal
        title="Tạo sách mới"
        closable={{ "aria-label": "Custom Close Button" }}
        open={openModalCreate}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"50vw"}
        okText={"Save"}
        confirmLoading={loading}
      >
        <Form
          name="book-form"
          layout="vertical"
          initialValues={{ sold: 0, quantity: 1, category: "Arts" }}
          onFinish={onFinish}
          form={form}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Tên sách"
                name="mainText"
                rules={[{ required: true, message: APP_MESSAGES.BOOK.VALIDATION.REQUIRED.MAIN_TEXT }]}
              >
                <Input placeholder="Nhập tên sách..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Tác giả"
                name="author"
                rules={[{ required: true, message: APP_MESSAGES.BOOK.VALIDATION.REQUIRED.AUTHOR }]}
              >
                <Input placeholder="Nhập tên tác giả..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Giá tiền"
                name="price"
                rules={[{ required: true, message: APP_MESSAGES.BOOK.VALIDATION.REQUIRED.PRICE }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  parser={(value) => value!.replace(/\./g, "")}
                  addonAfter="đ"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Thể loại sách"
                name="category"
                rules={[{ required: true, message: APP_MESSAGES.BOOK.VALIDATION.REQUIRED.CATEGORY }]}
              >
                <Select
                  placeholder="Chọn thể loại sách"
                  options={categories.map((item) => ({
                    value: item,
                    label: item,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label="Số lượng"
                name="quantity"
                rules={[{ required: true, message: APP_MESSAGES.BOOK.VALIDATION.REQUIRED.QUANTITY }]}
              >
                <InputNumber style={{ width: "100%" }} min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType> label="Đã bán" name="sold">
                <InputNumber style={{ width: "100%" }} min={0} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item<FieldType> label="Ảnh đại diện" name="thumbnail">
                <Upload
                  listType="picture-card"
                  fileList={fileListThumb}
                  onPreview={handlePreviewThumb}
                  onChange={handleChangeThumb}
                  beforeUpload={beforeUpload}
                  customRequest={handleUploadFileThumb}
                >
                  {fileListThumb.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
              {previewImageThumb && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpenThumb,
                    onVisibleChange: (visible) => setPreviewOpenThumb(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImageThumb(""),
                  }}
                  src={previewImageThumb}
                />
              )}
            </Col>

            <Col span={12}>
              <Form.Item<FieldType> label="Các ảnh khác" name="slider">
                <Upload
                  multiple
                  listType="picture-card"
                  fileList={fileListSlider}
                  onPreview={handlePreviewSlider}
                  onChange={handleChangeSlider}
                  beforeUpload={beforeUpload}
                  customRequest={handleUploadFileSlider}
                >
                  {uploadButton}
                </Upload>
              </Form.Item>
              {previewImageSlider && (
                <Image
                  wrapperStyle={{ display: "none" }}
                  preview={{
                    visible: previewOpenSlider,
                    onVisibleChange: (visible) => setPreviewOpenSlider(visible),
                    afterOpenChange: (visible) => !visible && setPreviewImageSlider(""),
                  }}
                  src={previewImageSlider}
                />
              )}
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBook;
