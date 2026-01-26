import { useSearchMoviList } from "../../hooks/useMoviListTop10";
import { Moviinterface } from "../../api/api";
import { Button } from "../Button/Buutton";
import style from "./SearchModal.module.css";
import { CardSearch } from "../Card/CardSearch";
import { useMobile } from "../../hooks/useMoviListTop10";

/* Пакеты Swiper для React */

import { Swiper, SwiperSlide } from "swiper/react";

// Импорт стилей Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export const SearchModal = ({
  closeModal,
  query,
}: {
  closeModal: () => void;
  query: string;
}) => {
  const isMobile = useMobile();
  // Вызываем хук на верхнем уровне. React Query сам сделает запрос.
  const { dataMoviType, isError, isLoading } = useSearchMoviList(query);

  if (!isMobile) {
    return (
      <div className="modal-backdrop" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <Button
            className={style.card__cross}
            variant="cross"
            onClick={closeModal}
          >
            <svg
              className={style.card__cross_svg}
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.36396 4.94978L11.3138 0L12.728 1.41421L7.77816 6.36398L12.728 11.3137L11.3138 12.7279L6.36396 7.77818L1.41422 12.7279L0 11.3137L4.94976 6.36398L0 1.41421L1.41422 0L6.36396 4.94978Z"
                fill="red"
                //   fill-opacity="0.5"
              />
            </svg>
          </Button>

          <div className={style.results__list}>
            {isLoading && <p className={style.info}>Загрузка...</p>}
            {isError && <p className={style.info}>Произошла ошибка</p>}

            {!isLoading &&
              dataMoviType?.map((data: Moviinterface) => (
                <CardSearch data={data} key={data.id} />
              ))}

            {!isLoading && query.length >= 3 && dataMoviType?.length === 0 && (
              <p className={style.info}>Ничего не найдено</p>
            )}
            {!isLoading && dataMoviType === undefined && (
              <p className={style.info}>Введите в строку поиска три символа</p>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (isMobile) {
    return (
      <div className="modal-backdrop" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <Button
            className={style.card__cross}
            variant="cross"
            onClick={closeModal}
          >
            <svg
              className={style.card__cross_svg}
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.36396 4.94978L11.3138 0L12.728 1.41421L7.77816 6.36398L12.728 11.3137L11.3138 12.7279L6.36396 7.77818L1.41422 12.7279L0 11.3137L4.94976 6.36398L0 1.41421L1.41422 0L6.36396 4.94978Z"
                fill="red"
              />
            </svg>
          </Button>

          <div className={style.results__list}>
            {isLoading && <p className={style.info}>Загрузка...</p>}

            {!isLoading && (
              <Swiper
                spaceBetween={16}
                slidesPerView={1.3}
                modules={[Pagination]}
                className={`
                  ${style.cardlist__swiper}
                   top__swiper top__swiper--overflow`}
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
                {dataMoviType?.map((data: Moviinterface) => (
                  <SwiperSlide key={data.id} className="top__slide">
                    <div className={style.cardsearch__wrap}>
                      <CardSearch data={data} key={data.id} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}

            {!isLoading && query.length >= 3 && dataMoviType?.length === 0 && (
              <p className={style.info}>Ничего не найдено</p>
            )}
            {!isLoading && dataMoviType === undefined && (
              <p className={style.info}>Введите в строку поиска три символа</p>
            )}
          </div>
        </div>
      </div>
    );
  }
};
