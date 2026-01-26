import style from "./Card.module.css";
import { Moviinterface, MoviType } from "../../api/api";
import { Link } from "react-router-dom";
import { Annotation } from "../Annotation/Annotation";

type CardType = {
  id: MoviType["id"];
  title: MoviType["title"];
  posterUrl: MoviType["posterUrl"];
  num: number;
};

interface CardSearchProps {
  data: Moviinterface;
}

export const CardSearch = ({ data }: CardSearchProps) => {
  return (
    <Link
      key={data.id.toString()}
      className={style.cardsearch}
      to={`filmpage/${data.id}`}
    >
      <div className={style.cardsearch__linc}>
        <div className={style.cardsearch__wrap}>
          <img
            className={style.cardsearch__cartoon}
            src={data.posterUrl ? data.posterUrl : undefined}
            alt={data.title}
          />
          <div className={style.cardsearch__annotation}>
            <Annotation data={data} styles={style} />
          </div>
        </div>
      </div>
    </Link>
  );
};
