import { Col, Row, Tabs } from "antd";
import HomeSidebar from "components/client/home/home.sidebar";
import HomeSlider from "components/client/home/home.slider";
import HomeListProduct from "components/client/home/home.list.product";
import { useEffect, useState } from "react";
import { getBookAPI } from "@/services/api";
import { FilterOutlined } from "@ant-design/icons";
import ProductMobileFilter from "@/components/client/product/product.mobile.filter";
import { useCurrentApp } from "@/components/context/app.context";

const HomePage = () => {
  const [bookData, setBookData] = useState<IBookTable[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [total, setTotal] = useState<number>(0);
  const [queryTab, setQueryTab] = useState<string>("");
  const [queryFilter, setQueryFilter] = useState<string>("");
  const [openMobileFilter, setOpenMobileFilter] = useState<boolean>(false);
  const { searchQuery } = useCurrentApp();
  const pageSize = 8;

  useEffect(() => {
    const getBookData = async () => {
      let query = "";
      query += `current=${currentPage}&pageSize=${pageSize}`;
      query += queryTab;
      query += queryFilter;
      if (searchQuery !== "") {
        query += `&mainText=/${searchQuery}/i`;
      }

      const res = await getBookAPI(query);
      if (res.data) {
        setBookData(res.data.result);
        setTotal(res.data.meta.total);
      }
    };

    getBookData();
  }, [currentPage, pageSize, queryTab, queryFilter, searchQuery]);

  const handleChangeTab = (activeKey: string) => {
    let query = "";
    switch (activeKey) {
      case "new":
        query += `&sort=-createdAt`;
        break;
      case "priceAsc":
        query += "&sort=price";
        break;
      case "priceDesc":
        query += "&sort=-price";
        break;
      case "sold":
        query += "&sort=-sold";
        break;
      default:
        query = "";
        break;
    }

    setQueryTab(query);
  };

  const handleClickFilterMobile = () => {
    setOpenMobileFilter(true);
  };

  return (
    <>
      <div className="home-page-container">
        <HomeSlider />

        <Row gutter={[20, 20]} className="main-content">
          <Col lg={5} md={0} sm={0} xs={0} className="left-sidebar">
            <HomeSidebar setQueryFilter={setQueryFilter} queryFilter={queryFilter} />
          </Col>

          <Col lg={19} md={24} sm={24} xs={24}>
            <div style={{ background: "#fff", padding: "10px 20px", borderRadius: "8px" }}>
              <Tabs
                defaultActiveKey="new"
                items={[
                  { key: "new", label: "Hàng mới" },
                  { key: "priceAsc", label: "Giá thấp đến cao" },
                  { key: "priceDesc", label: "Giá cao đến thấp" },
                  { key: "sold", label: "Bán chạy" },
                ]}
                onChange={handleChangeTab}
              />

              <p className="product__mobile-filter-icon" onClick={handleClickFilterMobile}>
                <FilterOutlined />
                <span>Lọc Sản Phẩm</span>
              </p>

              <HomeListProduct
                bookData={bookData}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                total={total}
                pageSize={pageSize}
              />
            </div>
          </Col>
        </Row>
      </div>

      <ProductMobileFilter
        setQueryFilter={setQueryFilter}
        queryFilter={queryFilter}
        openMobileFilter={openMobileFilter}
        setOpenMobileFilter={setOpenMobileFilter}
      />
    </>
  );
};

export default HomePage;
