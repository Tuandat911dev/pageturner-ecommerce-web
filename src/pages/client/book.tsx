import { getBookByIdAPI } from "@/services/api";
import { App, Breadcrumb, Button, Col, InputNumber, Rate, Row, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ShoppingCartOutlined, CreditCardOutlined, HomeOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import ModalGallery from "@/components/client/product/product.gallery.modal";
import { formatDisplaySold } from "@/services/helper";
import ProductLoading from "@/components/client/product/product.loading";
import { useCurrentApp } from "@/components/context/app.context";

type TInputNumber = "increase" | "decrease";

interface ICart {
  detail: IBookTable;
  quantity: number;
  _id: string;
}

const BookPage = () => {
  const { bookId } = useParams();
  const { Title, Text } = Typography;
  const [bookData, setBookData] = useState<IBookTable | null>(null);
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [currentQuantity, setCurrentQuantity] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { setCart } = useCurrentApp();

  useEffect(() => {
    const getBook = () => {
      setLoading(true);
      if (bookId) {
        setTimeout(async () => {
          const res = await getBookByIdAPI(bookId);
          if (res && res.data) {
            setBookData(res.data);
            setLoading(false);
          } else {
            message.error("Sản phẩm không tồn tại");
            navigate("/");
          }
        }, 1500);
      }
    };
    getBook();
  }, [bookId]);

  const getImage = (imageName: string) => {
    return `${import.meta.env.VITE_BACKEND_URL}/images/book/${imageName}`;
  };

  const images = useMemo(() => {
    if (!bookData) return [];
    const res = bookData.slider.map((link: string) => ({
      original: getImage(link),
      thumbnail: getImage(link),
      originalClass: "original-image",
      thumbnailClass: "thumbnail-image",
    }));
    res.push({
      original: getImage(bookData.thumbnail),
      thumbnail: getImage(bookData.thumbnail),
      originalClass: "original-image",
      thumbnailClass: "thumbnail-image",
    });
    return res;
  }, [bookData]);

  const handleChangQuantity = (v: TInputNumber) => {
    if (v === "increase") {
      setCurrentQuantity(currentQuantity + 1);
    } else {
      setCurrentQuantity(currentQuantity - 1);
    }
  };

  const handleAddToCart = (_id: string, book: IBookTable) => {
    const cartData = localStorage.getItem("carts");
    if (cartData) {
      let carts = JSON.parse(cartData) as ICart[];
      const existedCart = carts.find((cart) => cart._id === _id);
      if (existedCart) {
        existedCart.quantity += currentQuantity;
      } else {
        carts = [...carts, { detail: book, quantity: currentQuantity, _id: _id }];
      }

      setCart(carts);
      localStorage.setItem("carts", JSON.stringify(carts));
      setCurrentQuantity(1);
      message.success("Thêm vào giỏ hàng thành công");
    } else {
      const carts = [{ detail: book, quantity: currentQuantity, _id: _id }];
      localStorage.setItem("carts", JSON.stringify(carts));
      setCart(carts);
      setCurrentQuantity(1);
      message.success("Thêm vào giỏ hàng thành công");
    }
  };

  return (
    <>
      {loading !== true && bookData ? (
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
                        Đã Bán <span>{formatDisplaySold(bookData.sold)}</span>
                      </Text>
                    </div>

                    <div className="price-section">
                      <Text className="price-value">{new Intl.NumberFormat("vi-VN").format(bookData.price)} đ</Text>
                    </div>

                    <div className="quantity-control">
                      <Text className="label">Số Lượng</Text>
                      <div className="quantity__input-wrapper">
                        <button
                          className="quantity__input-btn decrease"
                          onClick={() => handleChangQuantity("decrease")}
                          disabled={currentQuantity <= 1}
                        >
                          <MinusOutlined />
                        </button>
                        <InputNumber
                          min={1}
                          max={bookData.quantity}
                          value={currentQuantity}
                          onChange={(value) => setCurrentQuantity(value || 1)}
                          className="input-quantity"
                          controls={false}
                        />
                        <button
                          className="quantity__input-btn increase"
                          onClick={() => handleChangQuantity("increase")}
                          disabled={currentQuantity >= bookData.quantity}
                        >
                          <PlusOutlined />
                        </button>
                      </div>

                      <Text className="available-stock">{bookData.quantity} sản phẩm có sẵn</Text>
                    </div>

                    <div className="action-buttons">
                      <Button
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(bookData._id, bookData)}
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
      ) : (
        <ProductLoading />
      )}
    </>
  );
};

export default BookPage;
