import { FormEventHandler } from "react";
import { useMutation } from "@tanstack/react-query"; //хук для отправки данных на сервер
import styles from "./LoginForm.module.css";
import { Button } from "../Button/Buutton";
import logo from "../../assets/logi_light_reg.png";
import { queryClient } from "../../api/queryQlient";
import { login } from "../../api/api";

export const LoginByMailForm = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const loginMutation = useMutation(
    {
      mutationFn: () => login({ email, password }),
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["users", "me"] });
      },
    },
    queryClient
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    loginMutation.mutate();
  };

  return (
    <form
      className={`${styles.login_form} ${styles.login_form_bymail}`}
      onSubmit={handleSubmit}
    >
      <img src={logo} alt="logo" className={styles.login_form_logo} />
      <h2 className={styles.reg_form_title}>Регистрация завершена</h2>
      <p className={styles.reg_form_descr}>
        Используйте вашу электронную почту для входа
      </p>

      {loginMutation.error && <span>{loginMutation.error.message}</span>}
      <Button
        type="submit"
        variant="primary"
        isLoading={loginMutation.isPending}
      >
        Войти
      </Button>
    </form>
  );
};
