import { FC, MouseEventHandler } from "react";
import styles from "./SegmentedSwitchOption.module.css";
// import "./SegmentedSwitchOption.css";

interface ISegmentedSwitchOptionProps {
  isActive: boolean;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const SegmentedSwitchOption: FC<ISegmentedSwitchOptionProps> = ({
  isActive,
  title,
  onClick,
}) => {
  return (
    <button
      className={styles.segmented__switch_option}
      data-active={isActive}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
