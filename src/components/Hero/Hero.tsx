import { Button } from "../Button/Buutton";
import { ButtonLink } from "../Button/BuuttonLink";
import styles from "./Hero.module.css";
import { Annotation } from "../Annotation/Annotation";
import {
  useMoviRandom,
  useMoviRandomMutation,
} from "../../hooks/useMoviListTop10";
import { useState } from "react";
import { FavoriteButton } from "../FavoriteAdd/FavoriteButton";
import { TarailerModal } from "../TrailerModal/TrailerModal";

export const Hero = () => {
  const { data, isError, isLoading } = useMoviRandom();
  const moviRandomMutation = useMoviRandomMutation();

  const [isVideoOpen, setIsVideoOpen] = useState(false); // для трейлера
  let noviListRandom = data || [];
  const trailerUrl = data?.trailerUrl; // // для трейлера Ссылка формата /embed/

  const handleRandomMovie = async () => {
    moviRandomMutation.mutate();
  };

  //ожидание
  if (isLoading) {
    return (
      <div className={styles.container}>
        <p className={styles.error_loading}>Пожалуйста, подождите</p>
      </div>
    );
  }
  //ощибка
  if (isError) {
    return (
      <div className={styles.container}>
        <p className={styles.error_loading}>Произошла ошибка</p>
      </div>
    );
  }
  return (
    <div className={`${styles.container} ${styles.hero}`}>
      <div className={`${styles.hero__info} ${styles.hero__info__left}`}>
        <Annotation data={data} styles={styles} />

        <p className={styles.hero__subtitle}>{noviListRandom.plot}</p>
        <div className={styles.hero__wrapper_btn}>
          <Button variant="primary" onClick={() => setIsVideoOpen(true)}>
            Трейлер
          </Button>
          {isVideoOpen && (
            <TarailerModal
              videoUrl={trailerUrl}
              onClose={() => setIsVideoOpen(false)}
            />
          )}

          <div className={styles.hero__container_btn}>
            <ButtonLink
              variant="primary"
              onClick={handleRandomMovie}
              to={`filmpage/${noviListRandom.id}`}
            >
              О&nbsp;фильме
            </ButtonLink>
            <FavoriteButton idMovi={noviListRandom.id} />
            <Button variant="svg" onClick={handleRandomMovie}>
              <svg
                className={styles.btn__svg}
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z"
                  fill="white"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
      <div className={`${styles.hero__info} ${styles.hero__info__right}`}>
        <img
          src={noviListRandom.posterUrl ? noviListRandom.posterUrl : undefined}
          alt="Film"
          className={styles.hero__img}
        />
      </div>
    </div>
  );
};
