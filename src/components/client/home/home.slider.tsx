import { Carousel } from "antd";
import slider01 from "@/assets/slider/slider-01.jpg";
import slider02 from "@/assets/slider/slider-02.jpg";
import slider03 from "@/assets/slider/slider-03.jpg";

const HomeSlider = () => {
  const images = [slider01, slider02, slider03];

  return (
    <Carousel infinite={true} dots={true} arrows={true} autoplay style={{ margin: "20px 0" }}>
      {images.map((img, index) => (
        <div key={index}>
          <img
            src={img}
            alt={`slider-${index}`}
            style={{
              width: "100%",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default HomeSlider;
