import { Col, Row, Tabs } from "antd";
import HomeSidebar from "components/client/home/home.sidebar";
import HomeSlider from "components/client/home/home.slider";
import HomeListProduct from "components/client/home/home.list.product";
import { useEffect, useState } from "react";
import { getBookAPI } from "@/services/api";

const HomePage = () => {
  const [bookData, setBookData] = useState<IBookTable[]>([]);
  const [currentPage, setCurrentPage] = useState<string>("1");
  const [total, setTotal] = useState<number>(0);
  const [queryFilter, setQueryFilter] = useState<string>("");
  const pageSize = 5;

  useEffect(() => {
    const getBookData = async () => {
      let query = "";
      query += `current=${currentPage}&pageSize=${pageSize}`;
      query += queryFilter;
      const res = await getBookAPI(query);
      if (res.data) {
        setBookData(res.data.result);
        setTotal(res.data.meta.total);
      }
    };

    getBookData();
  }, [currentPage, pageSize, queryFilter]);

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

    setQueryFilter(query);
  };

  return (
    <div className="home-page-container">
      <HomeSlider />

      <Row gutter={[20, 20]} className="main-content">
        <Col lg={5} md={0} sm={0} xs={0} className="left-sidebar">
          <HomeSidebar />
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
  );
};

export default HomePage;
