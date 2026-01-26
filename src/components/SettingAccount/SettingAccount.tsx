import style from "./SettingAccount.module.css";
import { ButtonLink } from "../Button/BuuttonLink";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMe, logout } from "../../api/api";
import { queryClient } from "../../api/queryQlient";

export const SettingAccount = () => {
  const handleRandomMovie = async () => {
    logoutMutation.mutate();
  };

  const logoutMutation = useMutation(
    {
      mutationFn: () => logout(),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      },
    },
    queryClient,
  );

  const meQuery = useQuery(
    {
      queryFn: () => fetchMe(),
      queryKey: ["users", "me"],
      retry: 0,
    },
    queryClient,
  );

  switch (meQuery.status) {
    case "pending":
      return (
        <div className={style.container}>
          <p className={style.error_loading}>Пожалуйста, подождите</p>
        </div>
      );

    case "error":
      return (
        <div className={style.container}>
          <p className={style.error_loading}>Произошла ошибка</p>
        </div>
      );
    case "success":
      return (
        <>
          <div className={style.container}>
            <div className={style.setting__wrap}>
              <div className={style.setting__elem}>
                <div className={style.setting__elem_ikon}>
                  {meQuery.data.name[0]}
                  {meQuery.data.surname[0]}
                </div>
                <div className={style.setting__elem_block}>
                  <div className={style.setting__elem_naming}>Имя Фамилия</div>
                  <div className={style.setting__elem_wrap}>
                    <span className={style.setting__elem_descr}>
                      {meQuery.data.name}{" "}
                    </span>
                    <span className={style.setting__elem_descr}>
                      {meQuery.data.surname}{" "}
                    </span>
                  </div>
                </div>
              </div>
              <div className={style.setting__elem}>
                <div className={style.setting__elem_ikon}>
                  <svg
                    width="22"
                    height="18"
                    viewBox="0 0 22 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 0C21.5523 0 22 0.44772 22 1V17.0066C22 17.5552 21.5447 18 21.0082 18H2.9918C2.44405 18 2 17.5551 2 17.0066V16H20V4.3L12 11.5L2 2.5V1C2 0.44772 2.44772 0 3 0H21ZM8 12V14H0V12H8ZM5 7V9H0V7H5ZM19.5659 2H4.43414L12 8.8093L19.5659 2Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className={style.setting__elem_block}>
                  <div className={style.setting__elem_naming}>
                    Электронная почта
                  </div>
                  <div className={style.setting__elem_descr}>
                    {meQuery.data.email}
                  </div>
                </div>
              </div>
            </div>
            <ButtonLink variant="primary" onClick={handleRandomMovie} to={"/"}>
              Выйти из аккаунта
            </ButtonLink>
          </div>
        </>
      );
  }
};
