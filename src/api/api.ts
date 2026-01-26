import {languageObj} from './arr';

const API_URL = 'https://cinemaguide.skillbox.cc/';

export interface Moviinterface {
// length: any;
  /**
   * Иденитификаторо фильма
   */
id:	number//string //integer
title:	string
originalTitle:	string
language:	string
releaseYear:	number
releaseDate:	string
genres:	[string]
plot:	string
runtime:	number
budget:	string
revenue:	string
homepage:	string
status:	string
posterUrl:	string|null
backdropUrl:	string
trailerUrl:	string
trailerYoutubeId:	string
tmdbRating:	number
searchL:	string
keywords:	[string]
countriesOfOrigin:	[string]
languages:	[string]
cast:	[string]
director:	string
production:	string
awardsSummary:	string
}



export type UserData = {
  name:	string
  surname:	string
  email:	string
  favorites:	[string]
};


export type MoviType=Moviinterface


//получение данных из файла
export const getMovi = async (collection: string) => {
  const response = await fetch(`${API_URL}${collection}`,
    {credentials: 'include',}
  )
  .then(validateResponse)
    .then((res) => res.json())
  return response;
}

//ф-я создания массива данных о фильме для стр фильм

  export const createArrobutFilm = (data: Moviinterface): string[][] => {
    return [
      ["Язык оригинала", data.language ?  languageRename(data.language)  : "- нет данных"],
      [
        "Бюджет",
        data.budget
          ? Number(data.budget).toLocaleString() + " денег"
          : "- нет данных",
      ],
      [
        "Выручка",
        data.budget
          ? Number(data.revenue).toLocaleString() + " денег"
          : "- нет данных",
      ],
      ["Режиссёр", data.director ? data.director : "- нет данных"],
      ["Продакшен", data.production ? data.production : "- нет данных"],
      ["Награды", data.awardsSummary ? data.awardsSummary : "- нет данных"],
    ];
  };

  //ф-я соответствия языков абревиатуре

  const languageRename=(lang:string):string=>{
    if (lang in languageObj) { return languageObj[lang] }
    return lang
  }
//ф-я цвета рейтинга
type RatingColorType = {
  ratingNumber: number;
  styles: CSSModuleClasses;

};

export const styleRatingColor = ({ratingNumber, styles}:RatingColorType):string => {
    let ratingColor = styles.annotation__rating_gold;
    if (ratingNumber < 5) ratingColor = styles.annotation__rating_red;
    if (ratingNumber < 7) ratingColor = styles.annotation__rating_silver;
    if (ratingNumber < 8) ratingColor = styles.annotation__rating_green;
    return ratingColor;
  };

  export type RegisterData ={
  /**
   * Иденитификатор регистрации
   */
email:	string
password:	string
name?:	string
surname?:	string
}

  export function registerUser(
    {email, password, name='',surname='',}: RegisterData
): Promise<void> {
  return fetch(`${API_URL}user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      accept: "application/json",
    },
    credentials: "include",
    body: new URLSearchParams({ email, password, name, surname }),
  }).then((response) => {
     if (!response.ok) {
      throw new Error("Ошибка при регистрации.");
    }
    return undefined;
  });
}

  //валидация

  async function validateResponse(response:Response):Promise<Response> {
    if(!response.ok) {
      throw new Error(await response.text());
    }
    return response;
    
  }
  export type AuthInfo = {
    email:	string
    password:	string
};

  //ф-я входа пользователя
  export function login({email, password}: AuthInfo): Promise<void>{
      return fetch (`${API_URL}auth/login`, {
      method: "POST",
      credentials: 'include',
      headers:{
         "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body:new URLSearchParams({email, password}),
    })
    .then(validateResponse)
    .then(()=>undefined)
  }

  //Получение данных о текущем авторизованном пользователе

  export function fetchMe():Promise<UserData> {
    return fetch(`${API_URL}profile`, {credentials: 'include',})
    .then(validateResponse)
    .then(response=>response.json())
  }

    //заврешение сессиии

  export function logout(): Promise<void> {
    return fetch(`${API_URL}auth/logout`, {
      method: "GET",
      credentials: 'include',
    headers:{
         "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
    })
    .then(validateResponse)
    .then(response=>response.json())
  }

  // --!!!!-- favorites возможно нигде не используется
//полученние списка избранных фильмов  

  // export function favorites({pageParam=1}:{pageParam:number}):Promise<MoviType> {
  //   return fetch(`${API_URL}favorites?_page=${pageParam}&_limit=10`, {credentials: 'include',})
  //   .then(validateResponse)
  //   .then(response=>response.json())
  // }

// получение списка для ленивой загрузки
export const fetchMoreItems=async ( {pageParam = 0,dataMoviType=[] }: { 
  pageParam?: number; 
  dataMoviType: Moviinterface[] 
}) => {
        const itemsPerPage = 10; // кол-во карточек 10,
        await new Promise((resolve) => setTimeout(resolve, 500));

        const start = pageParam * itemsPerPage;
        const end = start + itemsPerPage;

        // Берем данные напрямую из того, что вернул хук
        const data = dataMoviType?.slice(start, end) || [];

        return {
          data,
          nextPage: pageParam + 1,
          hasMore: end < (dataMoviType?.length || 0),
        };
      }

    //ф-я добавление фильма в избранное
  export function addFavorites(id:	string): Promise<void> {
      return fetch (`${API_URL}favorites`, {
      method: "POST",
      credentials: 'include',
      headers:{
         "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body:new URLSearchParams({id}),
    })
    .then(validateResponse)
    .then(()=>undefined)
  }

    //ф-я удаление фильма из избранного
  export function deleteFavorites(movieId :	string): Promise<UserData> {
      return fetch (`${API_URL}favorites/${movieId}`, {
      method: "DELETE",
      credentials: 'include',
      headers:{
         "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body:new URLSearchParams({movieId }),
    })
    .then(validateResponse)
    .then(response=>response.json())
  }
  






