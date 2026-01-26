import style from "./CardList.module.css";
import { CardFavorite } from "../Card/CardFavotite";
import {
  useFavoritesList,
  useInfiniteScrolling,
} from "../../hooks/useMoviListTop10";
import { useRef } from "react";

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

export const CardListFavorite = () => {
  const isMobile = useMobile();
  // 1. Получаем данные
  const { dataMoviType, isLoading, isError } =
    useFavoritesList("CardListFavorite");

  // 2. бесконечная прокрутка

  const observerRef = useRef<IntersectionObserver>();
  const { data, isFetching, isFetchingNextPage, lastCardRef } =
    useInfiniteScrolling(dataMoviType, observerRef);

  //ожидание
  if (isLoading) {
    return (
      <div className={style.cardlist}>
        <p className={style.error_loading}>Пожалуйста, подождите</p>
      </div>
    );
  }
  //ощибка
  if (isError) {
    return (
      <div className={style.cardlist}>
        <p className={style.error_loading}>Произошла ошибка</p>
      </div>
    );
  }
  //объединение данных
  const allRenderedItems = data?.pages.flatMap((page) => page.data) || [];
  if (!isMobile) {
    return (
      <div className={style.cardlist}>
        <div className={style.cardlist__wrapper}>
          {allRenderedItems.map((item, index) => (
            <div className={style.cardlist__wrap} key={`${item.id}-${index}`}>
              <CardFavorite
                key={`${item.id}-${index}`}
                id={item.id}
                title={item.title}
                posterUrl={item.posterUrl}
                ref={allRenderedItems.length === index + 1 ? lastCardRef : null}
              />
            </div>
          ))}
          {(isFetchingNextPage || isFetching) && (
            <p className={style.error_loading}>Загрузка страниц...</p>
          )}
        </div>
      </div>
    );
  }
  if (isMobile) {
    return (
      <div className={style.cardlist}>
        <div className={style.cardlist__wrapper}>
          <Swiper
            spaceBetween={8}
            modules={[Pagination]}
            slidesOffsetBefore={0} // Добавляет отступ перед первым слайдом
            className={`${style.cardlist__swiper_favorite} top__swiper top__swiper--overflow`}
            slidesPerView={1.3}
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
            {allRenderedItems.map((item, index) => (
              <SwiperSlide key={item.id} className="top__slide">
                <div
                  className={style.cardlist__wrap}
                  key={`${item.id}-${index}`}
                >
                  <CardFavorite
                    key={`${item.id}-${index}`}
                    id={item.id}
                    title={item.title}
                    posterUrl={item.posterUrl}
                    ref={
                      allRenderedItems.length === index + 1 ? lastCardRef : null
                    }
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
