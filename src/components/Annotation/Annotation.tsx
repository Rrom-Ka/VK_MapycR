import { Moviinterface, styleRatingColor } from "../../api/api";

type Annotation = {
  data: Moviinterface;
  styles: CSSModuleClasses;
};

export const Annotation = ({ data, styles }: Annotation) => {
  let noviListRandom = data || [];
  //рейтинг
  const ratingNumber = Number(noviListRandom.tmdbRating);
  //получене цвета рейтинга
  const ratingColor = styleRatingColor({ ratingNumber: ratingNumber, styles });
  const ratingNumberRound =
    ratingNumber % 1 ? ratingNumber.toFixed(1) : ratingNumber;

  return (
    <>
      <div className={styles.annotation}>
        <div
          className={`${styles.marginNotLastchild16} ${styles.annotation__rating}  ${ratingColor} `}
        >
          <svg
            className={styles.annotation__rating_svg}
            width="16"
            height="15"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z"
              fill="white"
            />
          </svg>
          <span className={` ${styles.annotation__rating_span} `}>
            {ratingNumberRound}
          </span>
        </div>
        <span
          className={`${styles.marginNotLastchild16} ${styles.annotation__collect} ${styles.annotation__year}`}
        >
          {noviListRandom.releaseYear}
        </span>
        <span
          className={`${styles.marginNotLastchild16} ${styles.annotation__collect} ${styles.annotation__ganre}`}
        >
          {noviListRandom.genres[0]}
        </span>
        <span
          className={`${styles.marginNotLastchild16} ${styles.annotation__collect} ${styles.annotation__time}`}
        >
          {Math.floor(noviListRandom.runtime / 60)} ч{" "}
          {noviListRandom.runtime % 60} мин
        </span>
      </div>
      <h1 className={styles.hero__title}>{noviListRandom.title}</h1>
    </>
  );
};
