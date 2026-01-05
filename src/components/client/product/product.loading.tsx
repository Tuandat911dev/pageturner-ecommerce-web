import { Col, Row, Skeleton } from "antd";

const ProductLoading = () => {
  return (
    <>
      <div className="book-loading">
        <div className="book-loading-container">
          <Row gutter={[20, 0]} className="responsive-row">
            <Col xs={24} md={14} className="right-column">
              <div className="book-loading-left">
                <Skeleton.Image active={true} className="book-loading__main-img" />
                <div className="book-loading__thumb-wrapper">
                  <Skeleton.Image active={true} className="book-loading__thumb-img" />
                  <Skeleton.Image active={true} className="book-loading__thumb-img" />
                  <Skeleton.Image active={true} className="book-loading__thumb-img" />
                  <Skeleton.Image active={true} className="book-loading__thumb-img" />
                </div>
              </div>
            </Col>

            <Col xs={24} md={10} className="left-column">
              <div className="book-loading-right">
                <Skeleton active={true} className="book-loading__desc" />
                <Skeleton active={true} className="book-loading__desc" />
                <div className="book-loading__input-wrapper">
                  <Skeleton.Input active={true} className="book-loading__input" />
                  <Skeleton.Input active={true} className="book-loading__input" />
                </div>
                <div className="book-loading__cta-wrapper">
                  <Skeleton.Button active={true} className="book-loading__cta-btn" />
                  <Skeleton.Button active={true} className="book-loading__cta-btn" />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ProductLoading;
