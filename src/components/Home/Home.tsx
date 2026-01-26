import { Hero } from "../Hero/Hero";
import { CardList } from "../CardList/CardList";
import { useMoviListTop10 } from "../../hooks/useMoviListTop10";

export const Home = () => {
  const { data, isError, isLoading } = useMoviListTop10();

  let noviListTop10 = data || [];
  if (isLoading) {
    return (
      <div>
        <p>Пожалуйста, подождите</p>
      </div>
    );
  }
  //ощибка
  if (isError) {
    return (
      <div>
        <p>Произошла ошибка</p>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <CardList moviList={noviListTop10} />
    </>
  );
};
