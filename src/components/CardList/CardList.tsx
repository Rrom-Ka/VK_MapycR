import style from "./CardList.module.css";
import { Card } from "../Card/Card";
import { MoviType } from "../../api/api";
import { useMobile } from "../../hooks/useMoviListTop10";

{
  /* Пакеты Swiper для React */
}
import { Swiper, SwiperSlide } from "swiper/react";

// Импорт стилей Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

type MoviProps = {
  moviList: MoviType[];
};

export const CardList = ({ moviList }: MoviProps) => {
  const isMobile = useMobile();

  if (!isMobile) {
    return (
      <div className={style.cardlist}>
        <h2 className={style.cardlist__title}>Топ 10 фильмов</h2>
        <div className={style.cardlist__wrapper}>
          {moviList.map((item, num) => (
            <div className={style.cardlist__wrap} key={item.id}>
              <Card
                key={item.id}
                id={item.id}
                title={item.title}
                posterUrl={item.posterUrl}
                num={num}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className={style.cardlist}>
        <h2 className={style.cardlist__title}>Топ 10 фильмов</h2>
        <div className={style.cardlist__swiper_wrap}>
          <Swiper
            spaceBetween={8}
            slidesPerView={1.3}
            modules={[Pagination]}
            slidesOffsetBefore={15} // Добавляет отступ перед первым слайдом
            className={`${style.cardlist__swiper} top__swiper top__swiper--overflow`}
            breakpoints={{
              375: {
                slidesPerView: 1.3,
              },
              460: {
                slidesPerView: 1.7,
              },
              520: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 2.5,
              },
            }}
          >
            {moviList.map((item, num) => (
              <SwiperSlide key={item.id} className="top__slide">
                <div className={style.cardlist__wrap} key={item.id}>
                  <Card
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    posterUrl={item.posterUrl}
                    num={num}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  }
};
