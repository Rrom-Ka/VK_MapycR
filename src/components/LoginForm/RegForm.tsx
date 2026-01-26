import { FC } from "react";
import { useMutation } from "@tanstack/react-query"; //хук для отправки данных на сервер
import styles from "./LoginForm.module.css";
import { FormField } from "../FormField";
import { Button } from "../Button/Buutton";
import logo from "../../assets/logi_light_reg.png";
import { registerUser, RegisterData } from "../../api/api";
import { queryClient } from "../../api/queryQlient";
import { LoginByMailForm } from "./LoginByMailForm";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegFormProps {
  onSuccess: () => void;
}

//схема
const RegSchema = z
  .object({
    email: z.string().email(),
    name: z.string().min(3, "Длинна имени не менее 3 символов"),
    surname: z.string().min(3, "Длинна имени не менее 3 символов"),
    password: z.string().min(8, "Длинна пароля не менее 8 символов"),
    confirmpassword: z.string().min(8, "Повторите пароль"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Пароли не совпадают",
    path: ["confirmpassword"],
  });
//тип
type RegForm = z.infer<typeof RegSchema>;

export const RegForm: FC<RegFormProps> = ({ onSuccess }) => {
  const regMutation = useMutation(
    {
      mutationFn: (data: RegisterData) => registerUser(data),
      onSuccess: () => {
        onSuccess(); // Вызываем колбэк при успехе
      },
    },
    queryClient
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegForm>({
    resolver: zodResolver(RegSchema),
  });

  if (regMutation.isSuccess) {
    const values = getValues();
    return <LoginByMailForm email={values.email} password={values.password} />;
  }

  return (
    <form
      className={styles.login_form}
      onSubmit={handleSubmit(({ email, name, surname, password }) => {
        regMutation.mutate({ email, name, surname, password });
      })}
    >
      <img src={logo} alt="logo" className={styles.login_form_logo} />
      <h2 className={styles.reg_form_title}>Регистрация</h2>
      {/* Поля ввода */}
      <div className={styles.login_form_wrap}>
        <FormField label="Почта" errorMessage={errors.email?.message}>
          <input
            className={styles.input}
            type="email"
            placeholder="Электронная почта"
            {...register("email")}
          />
          <i className={styles.input__icon}>
            <svg
              className={
                !errors.email?.message
                  ? styles.input__icon_path
                  : styles.input__icon_err
              }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={
                  !errors.email?.message
                    ? styles.input__icon_path
                    : styles.input__icon_err
                }
                d="M21 3C21.5523 3 22 3.44772 22 4V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V19H20V7.3L12 14.5L2 5.5V4C2 3.44772 2.44772 3 3 3H21ZM8 15V17H0V15H8ZM5 10V12H0V10H5ZM19.5659 5H4.43414L12 11.8093L19.5659 5Z"
                fill="none"
              />
            </svg>
          </i>
        </FormField>
        <FormField label="Имя" errorMessage={errors.name?.message}>
          <input
            className={styles.input}
            type="text"
            placeholder="Имя"
            {...register("name")}
          />
          <i className={styles.input__icon}>
            <svg
              className={
                !errors.email?.message
                  ? styles.input__icon_path
                  : styles.input__icon_err
              }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={
                  !errors.email?.message
                    ? styles.input__icon_path
                    : styles.input__icon_err
                }
                d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                fill="none"
              />
            </svg>
          </i>
        </FormField>
        <FormField label="Фамилия" errorMessage={errors.surname?.message}>
          <input
            className={styles.input}
            type="text"
            placeholder="Фамилия"
            {...register("surname")}
          />
          <i className={styles.input__icon}>
            <svg
              className={
                !errors.email?.message
                  ? styles.input__icon_path
                  : styles.input__icon_err
              }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={
                  !errors.email?.message
                    ? styles.input__icon_path
                    : styles.input__icon_err
                }
                d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"
                fill="none"
              />
            </svg>
          </i>
        </FormField>

        <FormField label="Пароль" errorMessage={errors.password?.message}>
          <input
            className={styles.input}
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
          <i className={styles.input__icon}>
            <svg
              className={
                !errors.email?.message
                  ? styles.input__icon_path
                  : styles.input__icon_err
              }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={
                  !errors.email?.message
                    ? styles.input__icon_path
                    : styles.input__icon_err
                }
                d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"
                fill="none"
              />
            </svg>
          </i>
        </FormField>
        <FormField
          label="ПодтвердитьПароль"
          errorMessage={errors.confirmpassword?.message}
        >
          <input
            className={styles.input}
            type="password"
            placeholder="Подтвердите пароль"
            {...register("confirmpassword")}
          />
          <i className={styles.input__icon}>
            <svg
              className={
                !errors.email?.message
                  ? styles.input__icon_path
                  : styles.input__icon_err
              }
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className={
                  !errors.email?.message
                    ? styles.input__icon_path
                    : styles.input__icon_err
                }
                d="M12.917 13C12.441 15.8377 9.973 18 7 18C3.68629 18 1 15.3137 1 12C1 8.68629 3.68629 6 7 6C9.973 6 12.441 8.16229 12.917 11H23V13H21V17H19V13H17V17H15V13H12.917ZM7 16C9.20914 16 11 14.2091 11 12C11 9.79086 9.20914 8 7 8C4.79086 8 3 9.79086 3 12C3 14.2091 4.79086 16 7 16Z"
                fill="none"
              />
            </svg>
          </i>
        </FormField>
      </div>

      {regMutation.isError && (
        <span className={styles.error_message}>
          {regMutation.error instanceof Error
            ? regMutation.error.message
            : "Ошибка регистрации"}
        </span>
      )}

      <Button type="submit" variant="primary" isLoading={regMutation.isPending}>
        Создать аккаунт
      </Button>
    </form>
  );
};
