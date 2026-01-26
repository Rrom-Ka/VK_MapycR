import style from "./LinkElement.module.css";

export const LinkElement = ({ children, href }: any) => {
  return (
    <a href={href} className={style.linkelement}>
      {children}
    </a>
  );
};
