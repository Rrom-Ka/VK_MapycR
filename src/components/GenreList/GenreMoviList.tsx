import style from "../CardList/CardList.module.css";
import { CardGenreFilm } from "../Card/CardGenreFilm";
import {
  useGenreMoviList,
  useInfiniteClick,
} from "../../hooks/useMoviListTop10";
import { useParams } from "react-router-dom";
import { Button } from "../Button/Buutton";

export const GenreMoviList = () => {
  const { titleGenre } = useParams();
  // 1. Получаем данные
  const { dataMoviType, isLoading, isError } = useGenreMoviList(titleGenre);
  // 2. бесконечная добавка
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteClick(dataMoviType);

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
  //объединение данных
  const allRenderedItems = data?.pages.flatMap((page) => page.data) || [];

  return (
    <div className={style.genrelist}>
      <h1 className={style.genrelist__title}>{titleGenre}</h1>
      <div className={style.cardlist__wrapper}>
        {allRenderedItems.map((item, index) => (
          <div
            className={style.genremovicard__wrap}
            key={`${item.id}-${index}`}
          >
            <CardGenreFilm
              key={`${item.id}-${index}`}
              id={item.id}
              title={item.title}
              posterUrl={item.posterUrl}
            />
          </div>
        ))}
        {(isFetchingNextPage || isFetching) && <h1>Загрузка страниц...</h1>}
      </div>
      {hasNextPage && (
        <div className={style.genrelist__outside_wrap}>
          <div className={style.genrelist__insaid_wrap}>
            <Button variant="primary" onClick={() => fetchNextPage()}>
              Показать ещё
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
