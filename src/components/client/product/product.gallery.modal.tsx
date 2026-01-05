import { Modal, Row, Col } from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  items: { original: string; thumbnail: string }[];
  currentIndex: number;
  mainText: string;
}

const ModalGallery = ({ isOpen, handleClose, items, currentIndex, mainText }: IProps) => {
  const galleryRef = useRef<ImageGallery>(null);
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={"80vw"}
      centered
      className="modal-gallery-custom"
      destroyOnClose={true}
      closable={false}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} md={15}>
          <ImageGallery
            ref={galleryRef}
            items={items}
            startIndex={currentIndex}
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={true}
            slideDuration={300}
            showThumbnails={false}
            onSlide={(index) => setActiveIndex(index)}
          />
        </Col>
        <Col xs={24} md={9}>
          <p className="thumb-modal-title">{mainText}</p>
          <div className="thumb-modal-wrapper">
            {items.map((item, index) => (
              <img
                key={index}
                className={`thumb-modal-img ${activeIndex === index ? "active" : ""}`}
                src={item.original}
                alt=""
                onClick={() => {
                  galleryRef.current?.slideToIndex(index);
                  setActiveIndex(index);
                }}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalGallery;
