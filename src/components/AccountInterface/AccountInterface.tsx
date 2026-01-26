import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthForm } from "../AuthForm";
import styles from "./AccountInterface.module.css";
import { useAuth, useMobile } from "../../hooks/useMoviListTop10";

export const AccountInterface = () => {
  const meQuery = useAuth();
  const isMobile = useMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    if (meQuery.status === "success") {
      setIsModalOpen(false);
    }
  }, [meQuery.status]);

  switch (meQuery.status) {
    case "pending":
      return (
        <p className={`${styles.nav__link} ${styles.login__link}`}>
          Загрузка...
        </p>
      );
    case "error":
      return (
        <div className={`${styles.login}`}>
          <Link
            to={"/"}
            className={`${styles.nav__link} ${styles.login__link}`}
            onClick={openModal}
          >
            {!isMobile ? (
              "Войти"
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                  fill="white"
                />
              </svg>
            )}
          </Link>
          {isModalOpen && (
            <AuthForm
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      );
    case "success":
      return (
        <div className={`${styles.login}`}>
          <Link
            to={"/login"}
            state={`/login ${meQuery.data.email}`}
            className={`${styles.nav__link} ${styles.login__link}`}
          >
            {!isMobile ? (
              meQuery.data.name
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                  fill="white"
                />
              </svg>
            )}
          </Link>
          <AuthForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      );
  }
};
