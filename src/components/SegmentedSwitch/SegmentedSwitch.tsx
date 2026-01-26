import { FC, ReactNode } from "react";
import styles from "./SegmentedSwitch.module.css";
// import "./SegmentedSwitch.css";

interface ISegmentedSwitchProps {
  children: ReactNode;
}

export const SegmentedSwitch: FC<ISegmentedSwitchProps> = ({ children }) => {
  return <div className={styles.segmented__switch}>{children}</div>;
};
