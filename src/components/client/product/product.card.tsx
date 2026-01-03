import { formatVND } from "@/services/helper";
import { Card, Rate, Typography } from "antd";

const { Text, Paragraph } = Typography;

const ProductCard = ({ item }: any) => (
  <Card
    className="product-card"
    cover={<img alt="example" src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item.thumbnail}`} />}
  >
    <Paragraph ellipsis={{ rows: 2 }} strong>
      {item.mainText}
    </Paragraph>
    <Text type="danger" style={{ fontSize: 16 }}>
      {formatVND(item.price)}
    </Text>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
      <Rate disabled defaultValue={5} style={{ fontSize: 10 }} />
      <Text style={{ fontSize: 12 }}>Đã bán {item.sold}</Text>
    </div>
  </Card>
);

export default ProductCard;
