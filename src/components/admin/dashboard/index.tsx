import { getDashboardAPI } from "@/services/api";
import { Card, Col, Row, Statistic, type StatisticProps } from "antd";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const AdminDashboard = () => {
  const [dataDashboard, setDataDashboard] = useState<IDashboard | null>(null);

  useEffect(() => {
    const initDashboard = async () => {
      const res = await getDashboardAPI();
      if (res && res.data) setDataDashboard(res.data);
    };
    initDashboard();
  }, []);

  const formatter: StatisticProps["formatter"] = (value) => <CountUp end={value as number} separator="," />;
  return (
    <>
      <Row gutter={[25, 25]}>
        <Col span={12}>
          <Card title="" variant="outlined">
            <Statistic title="Tổng Users" value={dataDashboard?.countUser} formatter={formatter} />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="" variant="outlined">
            <Statistic title="Tổng Đơn hàng" value={dataDashboard?.countOrder} precision={2} formatter={formatter} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
