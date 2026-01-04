import { Modal, Row, Col } from "antd";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

interface IProps {
  isOpen: boolean;
  handleClose: () => void;
  items: { original: string; thumbnail: string }[];
  currentIndex: number;
}

const ModalGallery = ({ isOpen, handleClose, items, currentIndex }: IProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={800}
      centered
      className="modal-gallery-custom"
      destroyOnClose={true}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <ImageGallery
            items={items}
            startIndex={currentIndex}
            showPlayButton={false}
            showFullscreenButton={false}
            thumbnailPosition="right"
            showNav={true}
            slideDuration={300}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalGallery;
