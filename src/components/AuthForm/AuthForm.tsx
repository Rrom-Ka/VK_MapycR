import { useState } from "react";

import { LoginForm } from "../LoginForm/LoginForm";
import { RegForm } from "../LoginForm/RegForm";
import { SegmentedSwitch, SegmentedSwitchOption } from "../SegmentedSwitch";
import { Button } from "../Button/Buutton";
import styles from "./AuthForm.module.css";
import { useMobile } from "../../hooks/useMoviListTop10";

type AuthType = false | true;

type AuthTypeProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AuthForm = ({ isOpen, onClose }: AuthTypeProps) => {
  const [authType, setAuthType] = useState<AuthType>(false);
  const [isSuccessRegistration, setIsSuccessRegistration] = useState(false);
  const isMobile = useMobile();

  const handleClose = () => {
    setIsSuccessRegistration(false);
    onClose();
  };

  const handleSwitchType = () => {
    // При ручном переключении между Входом и Регистрацией
    // сбрасываем статус успеха, чтобы кнопка переключения была видна
    setIsSuccessRegistration(false);
    setAuthType(!authType);
  };
  return (
    <>
      {isOpen && (
        <div className={styles.auth_form}>
          <div className={styles.btn__cross}>
            <Button
              onClick={handleClose}
              variant={!isMobile ? "cross" : "crossnotborder"}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"
                  fill="black"
                />
              </svg>
            </Button>
          </div>
          {authType == false ? (
            <LoginForm />
          ) : (
            <RegForm onSuccess={() => setIsSuccessRegistration(true)} />
          )}

          {!isSuccessRegistration && (
            <SegmentedSwitch>
              <SegmentedSwitchOption
                title={authType == false ? "Регистрация" : "У меня есть пароль"}
                isActive={
                  authType === false ? authType === false : authType === true
                }
                onClick={handleSwitchType}
              />
            </SegmentedSwitch>
          )}
        </div>
      )}
    </>
  );
};
