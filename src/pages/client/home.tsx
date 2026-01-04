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
  const pageSize = 5;

  useEffect(() => {
    const getBookData = async () => {
      let query = "";
      query += `current=${currentPage}&pageSize=${pageSize}`;
      const res = await getBookAPI(query);
      if (res.data) {
        setBookData(res.data.result);
        setTotal(res.data.meta.total);
      }
    };

    getBookData();
  }, [currentPage, pageSize]);

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
              defaultActiveKey="1"
              items={[
                { key: "1", label: "Phổ biến" },
                { key: "2", label: "Hàng mới" },
                { key: "3", label: "Giá thấp đến cao" },
                { key: "4", label: "Giá cao đến thấp" },
              ]}
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
