import { formatVND } from "@/services/helper";
import { Card, Rate, Typography } from "antd";

const { Text, Paragraph } = Typography;

interface IProps {
  book: IBookTable;
}

const ProductCard = (props: IProps) => {
  const { book } = props;

  const handleDisplaySold = (sold: number) => {
    let n = "";
    if (sold > 1000) {
      const soldPrice = String(sold);
      if (soldPrice.length > 4) {
        n = "K";
        const first = soldPrice.charAt(0);
        const middle = soldPrice.slice(1, -3).charAt(0);
        return `${first}${n}${middle || ""}`;
      } else if (soldPrice.length > 7) {
        n = "M";
        const first = soldPrice.charAt(0);
        const middle = soldPrice.slice(1, -6).charAt(0);
        return `${first}${n}${middle || ""}`;
      } else {
        n = "B";
        const first = soldPrice.charAt(0);
        const middle = soldPrice.slice(1, -9).charAt(0);
        return `${first}${n}${middle || ""}`;
      }
    }

    return book.sold;
  };

  return (
    <Card
      className="product-card"
      cover={<img alt="example" src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.thumbnail}`} />}
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
