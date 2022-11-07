import React, { useContext } from "react";
import SwiperCore, {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  Virtual,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { DataContext } from "../App";
import Doctores from "../Doctor/Doctor";
import "./Doctores.css";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Virtual]);

const Doctores = () => {
  const doctoresData = useContext(DataContext);

  return (
    <section className="doctores">
      <div className="container my-5">
        <h1 className="text-center text-primary my-5">Our Doctores</h1>
        <div className="doctores-view">
          <Swiper
            spaceBetween={20}
            slidesPerView={3}
            centeredslide="true"
            navigation
            autoplay={true}
            key={
              doctoresData.allAppointments &&
              doctoresData.allAppointments.length
            }
          >
            {doctoresData.allAppointments &&
              doctoresData.allAppointments.map((doctoresData, index) => (
                <SwiperSlide key={index}>
                  <Doctor key={doctoresData.id} doctoresData={doctoresData} />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Doctores;
