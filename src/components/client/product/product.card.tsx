import { formatVND } from "@/services/helper";
import { Card, Rate, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Text, Paragraph } = Typography;

interface IProps {
  book: IBookTable;
}

const ProductCard = (props: IProps) => {
  const { book } = props;
  const navigate = useNavigate();

  const handleDisplaySold = (sold: number) => {
    if (!sold) return 0;
    if (sold < 1000) return sold;

    if (sold >= 1000 && sold < 1000000) {
      const kValue = sold / 1000;
      return kValue.toFixed(1).replace(/\.0$/, "") + "K";
    }

    if (sold >= 1000000 && sold < 1000000000) {
      const mValue = sold / 1000000;
      return mValue.toFixed(1).replace(/\.0$/, "") + "M";
    }

    if (sold >= 1000000000) {
      const bValue = sold / 1000000000;
      return bValue.toFixed(1).replace(/\.0$/, "") + "B";
    }

    return sold;
  };

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
          <Text className="product-sold">Đã bán {handleDisplaySold(book.sold)}</Text>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
