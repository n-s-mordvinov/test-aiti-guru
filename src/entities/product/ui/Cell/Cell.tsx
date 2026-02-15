import type { JSX, ReactNode } from "react";

import styles from './Cell.module.scss';
import { Checkbox } from "../../../../shared/ui";

interface HeaderCellTitleProps {
  title: string;
  isChecked: boolean;
  onChangeChecked: (value: boolean) => void;
}

interface CellProps {
  children: ReactNode;
}

interface CellTitleProps {
  title: string;
  description: string;
  isChecked: boolean;
  onChangeChecked: (value: boolean) => void;
  image?: string;
}

export const Cell = ({ children }: CellProps): JSX.Element => {
  return <div className={styles.cell}>{children}</div>
}

export const HeaderCell = ({ children }: CellProps): JSX.Element => {
  return <div className={styles.headerCell}>{children}</div>
}

export const CellTitle = ({
  title,
  description,
  image,
  isChecked,
  onChangeChecked
}: CellTitleProps): JSX.Element => {
  return (
    <div className={styles.cellTitle}>
      <Checkbox
        checked={isChecked}
        onChange={(e) => onChangeChecked(e.target.checked)}
        aria-label="Select row"
      />
      <div className={styles.cellImage}>
        {image && <img src={image} alt={title} />}
      </div>
      <div className={styles.cellContent}>
        <div className={styles.cellContentTitle}>{title}</div>
        <div className={styles.cellContentDescription}>{description}</div>
      </div>
    </div>
  );
}

export const HeaderCellTitle = ({ title, isChecked, onChangeChecked }: HeaderCellTitleProps): JSX.Element => {
  return (
    <div className={styles.headerCellTitle}>
      <Checkbox
        checked={isChecked}
        onChange={(e) => {
          e.stopPropagation()
          onChangeChecked(e.target.checked)
        }}
        aria-label="Select all"
      />
      {title}
    </div>
  );
}