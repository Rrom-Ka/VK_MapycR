import { FC } from "react";
import styles from "./Button.module.css";

interface IButtonProps {
  children: string | JSX.Element;
  className?: string;
  onClick?: () => void;
  variant?:
    | "primary"
    | "secondary"
    | "white"
    | "text"
    | "cross"
    | "svg"
    | "crossnotborder";
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium";
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const Button: FC<IButtonProps> = ({
  children,
  onClick,
  type,
  isLoading,
  variant = "primary",
  size = "medium",
  ...props
}) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      {...props}
      type={type}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </button>
  );
};
