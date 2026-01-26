import style from "./Card.module.css";
import { MoviType } from "../../api/api";
import { Link } from "react-router-dom";

type CardType = {
  id: MoviType["id"];
  title: MoviType["title"];
  posterUrl: MoviType["posterUrl"];
  num: number;
};

export const Card = ({ id, title, posterUrl, num }: CardType) => {
  return (
    <Link key={id.toString()} className={style.card} to={`filmpage/${id}`}>
      <div className={style.card__linc}>
        <div className={style.card__wrap}>
          <div className={style.card__number}>
            <span className={style.card__number_span}>{num + 1}</span>
          </div>
          <img
            className={style.card__cartoon}
            src={posterUrl ? posterUrl : undefined}
            alt={title}
          />
        </div>
      </div>
    </Link>
  );
};
