import style from "./Card.module.css";
import { MoviType } from "../../api/api";
import { Link } from "react-router-dom";
import { Button } from "../Button/Buutton";
import { useDeleteFavorites } from "../../hooks/useMoviListTop10";
import { forwardRef } from "react";

type CardType = {
  id: MoviType["id"];
  title: MoviType["title"];
  posterUrl: MoviType["posterUrl"];
};

export const CardFavorite = forwardRef<HTMLDivElement, CardType>(
  ({ id, title, posterUrl }, ref) => {
    const deletefavoriteMutation = useDeleteFavorites();
    const handleDeleteCard = () => {
      deletefavoriteMutation.mutate(id.toString());
    };
    return (
      <div className={style.card} ref={ref}>
        <Button
          className={style.card__cross}
          variant="svg"
          onClick={handleDeleteCard}
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
              fill="none"
            />
          </svg>
        </Button>
        <Link key={id.toString()} to={`../../filmpage/${id}`}>
          <div className={style.card__linc}>
            <div className={style.card__wrap}>
              <img
                className={style.card__cartoon}
                src={posterUrl ? posterUrl : undefined}
                alt={title}
              />
            </div>
          </div>
        </Link>
      </div>
    );
  }
);
