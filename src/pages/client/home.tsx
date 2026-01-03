import { Col, Row, Tabs } from "antd";
import HomeSidebar from "components/client/home/home.sidebar";
import HomeSlider from "components/client/home/home.slider";
import HomeListProduct from "components/client/home/home.list.product";

const HomePage = () => {
  const mockData = Array(10).fill({
    _id: "1",
    mainText: "Tên cuốn sách siêu hay và hấp dẫn người đọc",
    price: 150000,
    sold: 100,
    thumbnail: "default.png",
  });

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
            <HomeListProduct data={mockData} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
