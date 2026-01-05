import { formatDisplaySold, formatVND } from "@/services/helper";
import { Card, Rate, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

interface IProps {
  book: IBookTable;
}

const ProductCard = (props: IProps) => {
  const { book } = props;
  const navigate = useNavigate();

  const handleOnClick = (_id: string) => {
    navigate(`/book/${_id}`);
  };

  return (
    <Card
      className="product-card"
      cover={<img alt="example" src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.thumbnail}`} />}
      onClick={() => handleOnClick(book._id)}
    >
      <Paragraph ellipsis={{ rows: 2 }} strong className="product-title">
        {book.mainText}
      </Paragraph>

      <div>
        <Text className="product-price">{formatVND(book.price)}</Text>
        <div className="product-info-footer">
          <Rate disabled defaultValue={5} className="product-rating" />
          <Text className="product-sold">Đã bán {formatDisplaySold(book.sold)}</Text>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
