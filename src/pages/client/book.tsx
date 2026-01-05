import { getBookAPI } from "@/services/api";
import { App, Breadcrumb, Button, Col, InputNumber, Rate, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShoppingCartOutlined, CreditCardOutlined, HomeOutlined } from "@ant-design/icons";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ModalGallery from "@/components/client/product/product.gallery.modal";

const BookPage = () => {
  const { bookId } = useParams();
  const { Title, Text } = Typography;
  const [bookData, setBookData] = useState<IBookTable | null>(null);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const getBook = async () => {
      const query = `current=1&pageSize=1&_id=${bookId}`;
      const res = await getBookAPI(query);
      if (res && res.data && res.data.result.length > 0) {
        setBookData(res.data.result[0]);
      } else {
        message.error("Sản phẩm không tồn tại");
        navigate("/");
      }
    };
    getBook();
  }, [bookId]);

  if (!bookData) return null; // Hoặc loading spinner

  const formatSold = (sold: number) => {
    if (sold >= 1000) return (sold / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return sold;
  };

  const getImage = (imageName: string) => {
    return `${import.meta.env.VITE_BACKEND_URL}/images/book/${imageName}`;
  };

  const images = bookData.slider.map((link: string) => ({
    original: getImage(link),
    thumbnail: getImage(link),
    originalClass: "original-image",
    thumbnailClass: "thumbnail-image",
  }));

  images.push({
    original: getImage(bookData.thumbnail),
    thumbnail: getImage(bookData.thumbnail),
    originalClass: "original-image",
    thumbnailClass: "thumbnail-image",
  });

  return (
    <>
      <div className="book-page-wrapper">
        <Breadcrumb
          className="breadcrumb"
          items={[
            {
              title: (
                <Link to="/">
                  <HomeOutlined /> <span>Trang chủ</span>
                </Link>
              ),
            },
            {
              title: "Chi tiết sách",
            },
            {
              title: bookData.mainText,
            },
          ]}
        />
        <div className="book-detail-container">
          <Row gutter={[0, 0]} className="responsive-row">
            {/* Right: gallery */}
            <Col xs={24} md={10} className="right-column">
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                thumbnailPosition="bottom"
                useBrowserFullscreen={false}
                showNav={false}
                showThumbnails={true}
                onClick={() => setIsModalOpen(true)}
                onSlide={(index) => setActiveIndex(index)}
              />
            </Col>

            {/* Left: content */}
            <Col xs={24} md={14} className="left-column">
              <div className="info-wrapper">
                <Title level={2} className="book-title">
                  {bookData.mainText}
                </Title>

                <div className="author-section">
                  <Text type="secondary">Tác Giả: </Text>
                  <Text strong className="author-name">
                    {bookData.author}
                  </Text>
                </div>

                <div className="rating-and-sold">
                  <Rate allowHalf disabled defaultValue={5} className="product-rating" />
                  <span className="separator"></span>
                  <Text className="product-sold">
                    Đã Bán <span>{formatSold(bookData.sold)}</span>
                  </Text>
                </div>

                <div className="price-section">
                  <Text className="price-value">{new Intl.NumberFormat("vi-VN").format(bookData.price)} đ</Text>
                </div>

                <div className="quantity-control">
                  <Text className="label">Số Lượng</Text>
                  <InputNumber
                    min={1}
                    max={bookData.quantity}
                    value={currentQuantity}
                    onChange={(value) => setCurrentQuantity(value || 1)}
                    className="input-quantity"
                  />
                  <Text className="available-stock">{bookData.quantity} sản phẩm có sẵn</Text>
                </div>

                <div className="action-buttons">
                  <Button
                    size="large"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => message.success("Đã thêm vào giỏ")}
                    className="add-to-cart-btn"
                  >
                    Thêm Vào Giỏ Hàng
                  </Button>
                  <Button
                    size="large"
                    type="primary"
                    icon={<CreditCardOutlined />}
                    onClick={() => message.info("Chức năng mua ngay")}
                    className="buy-now-btn"
                  >
                    Mua Ngay
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      <ModalGallery
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        items={images}
        currentIndex={activeIndex}
        mainText={bookData.mainText}
      />
    </>
  );
};

export default BookPage;
