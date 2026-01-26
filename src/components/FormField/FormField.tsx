import { FC, ReactNode } from "react";
import styles from "./FormField.module.css";
interface IFormFieldProps {
  label: string;
  children: ReactNode;
  errorMessage?: string;
}
export const FormField: FC<IFormFieldProps> = ({ children, errorMessage }) => {
  return (
    <label
      className={`${styles.form_field} ${
        errorMessage && styles.form_field_err
      }`}
    >
      {children}
    </label>
  );
};
