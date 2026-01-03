import { Pagination } from "antd";
import ProductCard from "components/client/product/product.card";

const HomeListProduct = ({ data }: any) => {
  return (
    <div className="list-product-container">
      <div className="product-grid">
        {data.map((item: any) => (
          <ProductCard key={item._id} item={item} />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination defaultCurrent={1} total={50} showSizeChanger={false} />
      </div>
    </div>
  );
};
export default HomeListProduct;
