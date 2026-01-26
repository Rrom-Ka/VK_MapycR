import {
  getMovi,
  MoviType,
  // UserData,
  addFavorites,
  fetchMe,
  deleteFavorites,
  Moviinterface,
  fetchMoreItems,
} from "../api/api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../api/queryQlient";
import { useCallback, useEffect, useState } from "react";

//хук возвращающийй список номеров доступных для бронирования
type Response = {
  data: MoviType[];
  isError: boolean;
  isLoading: boolean;
};

type ResponseFilm = {
  data: MoviType;
  isError: boolean;
  isLoading: boolean;
};

type ResponseGenres = {
  data: string[];
  isError: boolean;
  isLoading: boolean;
};

type ResponseFavorites = {
  dataMoviType: MoviType[];
  isError: boolean;
  isLoading: boolean;
};

// type ResponseSearch = {
//   dataMoviType: MoviType[];
//   isError: boolean;
//   isLoading: boolean;
// };

// type ResponseAddFavorites = {
//   data: UserData;
//   isError: boolean;
//   isLoading: boolean;
// };

//получение пользователя

export const useAuth = () => {
  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", "me"],
      retry: 0,
      refetchOnWindowFocus: false,
    },
    queryClient,
  );
  return meQuery;
};

//получение списка топ 10 фильмов
export const useMoviListTop10 = (): Response => {
  const { data, isError, isLoading } = useQuery(
    {
      queryFn: () => getMovi("movie/top10"),
      queryKey: ["movisTop10"],
    },
    queryClient,
  );
  return { data, isError, isLoading };
};

//получение рандомного фильма
export const useMoviRandom = (): ResponseFilm => {
  const { data, isError, isLoading } = useQuery(
    {
      queryFn: () => getMovi("movie/random"),
      queryKey: ["movisRandom"],
    },
    queryClient,
  );
  return { data, isError, isLoading };
};

//получение списка избранных фильмов Mutation
export const useMoviRandomMutation = () => {
  const moviRandomMutation = useMutation(
    {
      mutationFn: () => getMovi("movie/random"),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["movisRandom"] });
      },
      retry: 0,
    },
    queryClient,
  );
  return moviRandomMutation;
};

//получение  фильма по Id
export const useMoviId = (movieId: string | undefined): ResponseFilm => {
  const { data, isError, isLoading } = useQuery(
    {
      queryFn: () => getMovi(`movie/${movieId}`),
      queryKey: ["moviId", movieId],
      retry: 0,
    },
    queryClient,
  );
  return { data, isError, isLoading };
};

//получение списка жанров
export const useGenreList = (): ResponseGenres => {
  const { data, isError, isLoading } = useQuery(
    {
      queryFn: () => getMovi("movie/genres"),
      queryKey: ["genresList"],
    },
    queryClient,
  );
  return { data, isError, isLoading };
};

//получение списка Фильмов по жанру
export const useGenreMoviList = (
  titleGenre: string | undefined,
): ResponseFavorites => {
  const { data, isError, isLoading } = useQuery(
    {
      queryFn: () => getMovi(`movie?genre=${titleGenre}`),
      queryKey: ["genresMoviList"],
    },
    queryClient,
  );
  const dataMoviType = data;
  return { dataMoviType, isError, isLoading };
};
// movie?count=5&title=Abigail"
//получение списка Фильмов Поиск 5шт
export const useSearchMoviList = (titleSearch: string) => {
  const { data, isError, isLoading } = useQuery(
    {
      // Добавляем titleSearch в ключ, чтобы данные обновлялись при вводе
      queryKey: ["searchMoviList", titleSearch],
      queryFn: () => getMovi(`movie?count=5&title=${titleSearch}`),
      // Запрос пойдет только если введено больше 2 символов
      enabled: titleSearch.length >= 3,
      // Опционально: задержка (staleTime), чтобы не спамить запросами
      staleTime: 500,
    },
    queryClient,
  );

  return { dataMoviType: data, isError, isLoading };
};

//получение списка избранных фильмов
export const useFavoritesList = (key: string): ResponseFavorites => {
  const { data, isError, isLoading } = useQuery(
    {
      queryFn: () => getMovi("favorites"),
      queryKey: ["favoritesList", key],
      retry: 0,
    },
    queryClient,
  );
  const dataMoviType = data;
  return { dataMoviType, isError, isLoading };
};

//получение списка избранных фильмов Mutation
export const useFavoritesListMutation = (key: string) => {
  const favoriteListMutation = useMutation(
    {
      mutationFn: () => getMovi("favorites"),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favoritesList", key] });
      },
      retry: 0,
    },
    queryClient,
  );
  return favoriteListMutation;
};

// //добавление фильма в избранное
export const useAddFavorites = () => {
  const favoriteMutation = useMutation(
    {
      mutationFn: addFavorites,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["addFavorites"] });
      },
    },
    queryClient,
  );
  return favoriteMutation;
};

// //удаление фильма из избранное
export const useDeleteFavorites = () => {
  const favoriteMutation = useMutation(
    {
      mutationFn: deleteFavorites,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favoritesList"] });
      },
    },
    queryClient,
  );
  return favoriteMutation;
};

//бесконечная прорутка
//- параметры-бесконечная прорутка
export const useInfiniteScrolling = (
  dataMoviType: Moviinterface[],
  observerRef: React.MutableRefObject<IntersectionObserver | undefined>,
) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infiniteItems", dataMoviType?.length], // Добавляем длину в ключ, чтобы сбросить при получении данных
      enabled: !!dataMoviType, // Запускаем ТОЛЬКО когда данные появились
      initialPageParam: 0,
      queryFn: ({ pageParam }) => fetchMoreItems({ pageParam, dataMoviType }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });
  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      if (node) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            // Добавляем проверку на видимость
            if (entries[0].isIntersecting && hasNextPage && !isFetching) {
              fetchNextPage();
            }
          },
          { threshold: 1.0 }, // Снижаем порог, чтобы срабатывало надежнее
        );
        observerRef.current.observe(node);
      }
    },
    [isFetchingNextPage, isFetching, fetchNextPage, hasNextPage],
  );
  return {
    data,
    // fetchNextPage,
    // hasNextPage,
    isFetching,
    isFetchingNextPage,
    lastCardRef,
  };
};

//бесконечная прорутка
//- загрузка доп карточек по клику
export const useInfiniteClick = (dataMoviType: Moviinterface[]) => {
  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["infiniteItems", dataMoviType?.length], // Добавляем длину в ключ, чтобы сбросить при получении данных
      enabled: !!dataMoviType, // Запускаем ТОЛЬКО когда данные появились
      initialPageParam: 0,
      queryFn: ({ pageParam }) => fetchMoreItems({ pageParam, dataMoviType }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });
  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  };
};

//определение мобильника
export const useMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    // Обязательно удаляем обработчик при размонтировании
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

///-----------------------------

//бесконечная прорутка
//- параметры-бесконечная прорутка
// export const useInfiniteScrolling2 = (
//   dataMoviType: Moviinterface[],
//   observerRef: React.MutableRefObject<IntersectionObserver | undefined>
// ) => {
//   const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ["infiniteItems", dataMoviType?.length], // Добавляем длину в ключ, чтобы сбросить при получении данных
//       enabled: !!dataMoviType, // Запускаем ТОЛЬКО когда данные появились
//       initialPageParam: 0,
//       queryFn: ({ pageParam }) => fetchMoreItems({ pageParam, dataMoviType }),
//       getNextPageParam: (lastPage) =>
//         lastPage.hasMore ? lastPage.nextPage : undefined,
//     });
//   const lastCardRef = useCallback(
//     (node: HTMLDivElement | null) => {
//       if (isFetchingNextPage) return;
//       if (observerRef.current) observerRef.current.disconnect();

//       if (node) {
//         observerRef.current = new IntersectionObserver(
//           (entries) => {
//             // Добавляем проверку на видимость
//             if (entries[0].isIntersecting && hasNextPage && !isFetching) {
//               fetchNextPage();
//             }
//           },
//           { threshold: 1.0 } // Снижаем порог, чтобы срабатывало надежнее
//         );
//         observerRef.current.observe(node);
//       }
//     },
//     [isFetchingNextPage, isFetching, fetchNextPage, hasNextPage]
//   );
//   return {
//     data,
//     // fetchNextPage,
//     // hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     lastCardRef,
//   };
// };

// //бесконечная прорутка
// //- загрузка доп карточек по клику
// export const useInfiniteClick2 = (dataMoviType: Moviinterface[]) => {
//   const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
//     useInfiniteQuery({
//       queryKey: ["infiniteItems", dataMoviType?.length], // Добавляем длину в ключ, чтобы сбросить при получении данных
//       enabled: !!dataMoviType, // Запускаем ТОЛЬКО когда данные появились
//       initialPageParam: 0,
//       queryFn: ({ pageParam }) => fetchMoreItems({ pageParam, dataMoviType }),
//       getNextPageParam: (lastPage) =>
//         lastPage.hasMore ? lastPage.nextPage : undefined,
//     });
//   return {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//   };
// };
