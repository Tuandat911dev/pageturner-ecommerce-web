import { Pagination } from "antd";
import ProductCard from "components/client/product/product.card";

interface IProps {
  bookData: IBookTable[];
  setCurrentPage: (v: string) => void;
  currentPage: string;
  total: number;
  pageSize: number;
}

const HomeListProduct = (props: IProps) => {
  const { bookData, setCurrentPage, currentPage, total, pageSize } = props;

  const handleChangePaginate = (value: number) => {
    setCurrentPage(String(value));
  };

  return (
    <div className="list-product-container">
      <div className="product-grid">
        {bookData.map((item: IBookTable) => (
          <ProductCard key={item._id} book={item} />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          defaultCurrent={1}
          current={+currentPage}
          total={total}
          showSizeChanger={false}
          onChange={handleChangePaginate}
          pageSize={pageSize}
          hideOnSinglePage={true}
        />
      </div>
    </div>
  );
};
export default HomeListProduct;
