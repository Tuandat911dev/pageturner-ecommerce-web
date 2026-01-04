import { getBookCategory } from "@/services/api";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Divider, Form, InputNumber, Row, Typography, type InputNumberProps } from "antd";
import { useEffect, useState } from "react";

const { Text } = Typography;

interface IProps {
  setQueryFilter: (v: string) => void;
  queryFilter: string;
}

const HomeSidebar = (props: IProps) => {
  const { setQueryFilter, queryFilter } = props;
  const [form] = Form.useForm();
  const [categories, setCategories] = useState<string[]>([]);
  const categoryValue = Form.useWatch<string[]>("category", form);
  const fromPrice = Form.useWatch(["range", "from"], form);
  const toPrice = Form.useWatch(["range", "to"], form);

  useEffect(() => {
    const getCategories = async () => {
      const res = await getBookCategory();
      if (res.data) {
        setCategories(res.data);
      }
    };

    getCategories();
  }, []);

  useEffect(() => {
    const handleFilterCategory = () => {
      let query = queryFilter;
      if (categoryValue && categoryValue.length > 0) {
        query += "&category=";

        for (let i = 0; i < categoryValue.length; i++) {
          if (categoryValue.length === 1) {
            query += categoryValue[i];
          } else {
            if (i === categoryValue.length - 1) {
              query += categoryValue[i];
              break;
            }
            query += categoryValue[i] + ",";
          }
        }
      }
      setQueryFilter(query);
    };

    handleFilterCategory();
  }, [categoryValue, setQueryFilter]);

  const handleFilterPrice = () => {
    let query = queryFilter;
    if (fromPrice && toPrice) {
      query += `&price>=${fromPrice}&price<=${toPrice}`;
      setQueryFilter(query);
    } else {
      return;
    }
  };

  const formatter: InputNumberProps<number>["formatter"] = (value) => {
    if (!value) return "";
    const [start, end] = `${value}`.split(".") || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `${end ? `${v},${end}` : `${v}`}`;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parser = (value: any) => value.replace(/\./g, "");

  return (
    <div style={{ background: "#fff", padding: "15px", borderRadius: "8px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Text strong>
          <FilterOutlined /> Bộ lọc tìm kiếm
        </Text>
        <ReloadOutlined
          style={{ cursor: "pointer", color: "#1677ff" }}
          onClick={() => {
            form.resetFields();
            setQueryFilter("");
          }}
        />
      </div>
      <Divider />

      <Form form={form} layout="vertical">
        <Form.Item name="category" label={<Text strong>Danh mục sản phẩm</Text>}>
          <Checkbox.Group style={{ width: "100%" }}>
            <Row>
              {categories.map((item) => (
                <Col span={24} key={item} style={{ marginBottom: 10 }}>
                  <Checkbox value={item}>{item}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </Form.Item>
        <Divider />
        <Form.Item label={<Text strong>Khoảng giá</Text>}>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <Form.Item name={["range", "from"]} noStyle>
              <InputNumber<number>
                placeholder="Từ"
                controls={false}
                style={{ width: "100%" }}
                formatter={formatter}
                parser={parser}
                min={0}
                onChange={() => form.validateFields([["range", "to"]])}
              />
            </Form.Item>

            <div style={{ textAlign: "center", color: "#ccc" }}>-</div>

            <Form.Item name={["range", "to"]} noStyle dependencies={[["range", "from"]]}>
              <InputNumber<number>
                placeholder="Đến"
                controls={false}
                style={{ width: "100%" }}
                formatter={formatter}
                parser={parser}
                min={fromPrice || 0}
              />
            </Form.Item>
          </div>

          <Button type="primary" style={{ width: "100%", marginTop: 20 }} onClick={handleFilterPrice}>
            Áp dụng
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default HomeSidebar;
