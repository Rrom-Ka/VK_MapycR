import style from "./Footer.module.css";
import { LinkElement } from "../LinkElement/LinkElement";

import IconVk from "../../assets/svg/vk.svg?react";
import IconOk from "../../assets/svg/ok.svg?react";
import IconUtub from "../../assets/svg/utub.svg?react";
import IconTg from "../../assets/svg/tg.svg?react";
export const Footer = () => {
  return (
    <div className={style.footer}>
      <LinkElement href="#!">
        <IconVk />
      </LinkElement>
      <LinkElement href="#!">
        <IconUtub />
      </LinkElement>
      <LinkElement href="#!">
        <IconOk />
      </LinkElement>
      <LinkElement href="#!">
        <IconTg />
      </LinkElement>
    </div>
  );
};
