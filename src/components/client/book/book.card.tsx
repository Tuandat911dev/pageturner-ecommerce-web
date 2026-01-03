import { Card, Rate, Typography, Space, Tag } from "antd";
import { formatVND } from "@/services/helper";
import "./ProductCard.scss";

const { Text, Paragraph } = Typography;

interface IProduct {
  _id: string;
  mainText: string;
  thumbnail: string;
  price: number;
  sold: number;
  quantity: number;
  category: string;
}

interface IProps {
  data: IProduct;
}

const ProductCard = (props: IProps) => {
  const { data } = props;

  const rating = 5;

  const urlImage = `${import.meta.env.VITE_BACKEND_URL}/images/book/${data?.thumbnail}`;

  return (
    <Card hoverable className="product-card" cover={<img alt={data?.mainText} src={urlImage} loading="lazy" />}>
      <Paragraph ellipsis={{ rows: 2 }} className="product-title">
        {data?.mainText}
      </Paragraph>

      <Space direction="vertical" size={0} style={{ width: "100%" }}>
        <Text className="product-price">{formatVND(data?.price)}</Text>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <Rate disabled defaultValue={rating} style={{ fontSize: 10, color: "#ffce3d" }} />
          <Text type="secondary" style={{ fontSize: 12 }}>
            ({rating})
          </Text>
        </div>

        <div className="product-info-footer">
          <Text type="secondary">Đã bán {data?.sold}</Text>
          <Tag color="blue" style={{ margin: 0 }}>
            Kho: {data?.quantity}
          </Tag>
        </div>
      </Space>
    </Card>
  );
};

export default ProductCard;
