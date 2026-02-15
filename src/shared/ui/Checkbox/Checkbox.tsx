import type { InputHTMLAttributes, JSX } from "react";
import styles from './Checkbox.module.scss';
import clsx from "clsx";
import { SquareIcon } from "../Icons";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  rootClassName?: string;
};

export const Checkbox = ({
  id,
  name,
  label,
  rootClassName,
  className,
  checked,
  ...otherProps
}: CheckboxProps): JSX.Element  => {
  return (
    <label className={clsx(styles.root, rootClassName)}>
      <input
        id={id}
        name={name}
        type="checkbox"
        className={clsx(styles.input, className)}
        checked={checked}
        {...otherProps}
      />
      <SquareIcon className={styles.icon} />
      {label}
    </label>
  );
}
