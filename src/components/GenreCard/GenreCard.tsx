import style from "./GenreCard.module.css";
import { Link } from "react-router-dom";

type GenreType = {
  title: string;
};

export const GenreCard = ({ title }: GenreType) => {
  return (
    <>
      <Link
        key={title.toString()}
        to={`/genresList/${title}`}
        className={style.genrecard}
      >
        <div className={style.genrecard__linc}>
          <div className={style.genrecard__cartoon}>
            <img
              className={style.genrecard__cartoon_img}
              src={`src/assets/cartoon/genre/${title}.jpg`}
            />
          </div>
          <div className={style.genrecard__genre}>
            <h2 className={style.genrecard__genre_title}>{title}</h2>
          </div>
        </div>
      </Link>
    </>
  );
};
