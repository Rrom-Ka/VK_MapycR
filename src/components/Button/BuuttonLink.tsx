import { FC } from "react";
import styles from "./Button.module.css";
import { Link } from "react-router-dom";

interface IButtonLinkProps {
  children: string | JSX.Element;
  className?: string;
  to?: any;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "white" | "text" | "cross" | "svg";
  type?: "button" | "submit" | "reset";
  size?: "small" | "medium";
  isLoading?: boolean;
  isDisabled?: boolean;
}

export const ButtonLink: FC<IButtonLinkProps> = ({
  children,
  onClick,
  to,
  type,
  isLoading,
  variant = "primary",
  size = "medium",
  ...props
}) => {
  return (
    <Link
      to={to}
      className={styles.button}
      onClick={onClick}
      {...props}
      type={type}
      data-variant={variant}
      data-size={size}
    >
      {children}
    </Link>
  );
};
