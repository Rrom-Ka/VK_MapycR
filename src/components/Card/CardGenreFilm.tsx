import style from "./Card.module.css";
import { MoviType } from "../../api/api";
import { Link } from "react-router-dom";
import { forwardRef } from "react";

type CardType = {
  id: MoviType["id"];
  title: MoviType["title"];
  posterUrl: MoviType["posterUrl"];
};

export const CardGenreFilm = forwardRef<HTMLDivElement, CardType>(
  ({ id, title, posterUrl }, ref) => {
    return (
      <div
        className={`${style.card} ${!posterUrl && style.card__notposter}`}
        ref={ref}
      >
        <Link key={id.toString()} to={`../../filmpage/${id}`}>
          <div className={style.card__linc}>
            <div className={style.card__wrap}>
              <img
                className={style.card__cartoon}
                src={posterUrl ? posterUrl : ""}
                alt={title}
              />
            </div>
          </div>
        </Link>
      </div>
    );
  }
);
