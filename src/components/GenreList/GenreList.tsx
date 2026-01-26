import style from "./GenreList.module.css";
import { GenreCard } from "../GenreCard/GenreCard";
import { useGenreList } from "../../hooks/useMoviListTop10";

export const GenreList = () => {
  const { data, isError, isLoading } = useGenreList();

  let genresList = data || [];
  //ожидание
  if (isLoading) {
    return (
      <div className={style.genrelist}>
        <p className={style.error_loading}>Пожалуйста, подождите</p>
      </div>
    );
  }
  //ощибка
  if (isError) {
    return (
      <div className={style.genrelist}>
        <p className={style.error_loading}>Произошла ошибка</p>
      </div>
    );
  }

  return (
    <div className={style.genrelist}>
      <h1 className={style.genrelist__title}>Жанры фильмов</h1>
      <div className={style.genrelist__wrapper}>
        {genresList.map((item) => (
          <GenreCard key={item} title={item} />
        ))}
      </div>
    </div>
  );
};
