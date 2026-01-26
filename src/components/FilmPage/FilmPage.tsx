import { useParams } from "react-router-dom";
import { Button } from "../Button/Buutton";
import styles from "./FilmPage.module.css";
import stylesHero from "../Hero/Hero.module.css";
import { createArrobutFilm } from "../../api/api";

import { useMoviId } from "../../hooks/useMoviListTop10";
import { FavoriteButton } from "../FavoriteAdd/FavoriteButton";
import { useState } from "react";
import { TarailerModal } from "../TrailerModal/TrailerModal";
import { Annotation } from "../Annotation/Annotation";
export const FilmPage = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false); // для трейлера

  const { idFilm } = useParams();
  const { data, isError, isLoading } = useMoviId(idFilm);
  let noviListRandom = data || [];
  const trailerUrl = data?.trailerUrl; // // для трейлера Ссылка формата /embed/

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

  const obuutFilmObj = createArrobutFilm(noviListRandom);

  return (
    <>
      <section className={`${styles.container} ${styles.filmpage}`}>
        <div
          className={`${styles.filmpage__info} ${styles.filmpage__info__left}`}
        >
          <Annotation data={data} styles={stylesHero} />
          <p className={styles.filmpage__subtitle}>{noviListRandom.plot}</p>
          <div className={styles.filmpage__wrapper_btn}>
            <Button variant="primary" onClick={() => setIsVideoOpen(true)}>
              Трейлер
            </Button>
            {isVideoOpen && (
              <TarailerModal
                videoUrl={trailerUrl}
                onClose={() => setIsVideoOpen(false)}
              />
            )}
            <FavoriteButton idMovi={noviListRandom.id} />
          </div>
        </div>
        <div
          className={`${styles.filmpage__info} ${styles.filmpage__info__right}`}
        >
          <img
            src={
              noviListRandom.posterUrl ? noviListRandom.posterUrl : undefined
            }
            alt="Film"
            className={styles.filmpage__img}
          />
        </div>
      </section>
      <section className={`${styles.container} ${styles.aboutfilm_container}`}>
        <h2 className={styles.aboutfilm_title}>О фильме</h2>
        <div>
          <ul className={styles.list__reset}>
            {obuutFilmObj.map((item: string[], num) => (
              <li key={num} className={styles.about__item}>
                <div className={styles.item__wrap}>
                  <span className={styles.item__title}>{item[0]}</span>
                  <div className={styles.item__boreder}></div>
                </div>
                <span className={styles.item__descr}>{item[1]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
