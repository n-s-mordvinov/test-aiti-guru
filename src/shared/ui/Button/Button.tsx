import clsx from "clsx";
import type { ButtonHTMLAttributes, JSX, ReactNode } from "react";

import style from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: "text" | "contained" | "outlined";
  renderBefore?: ReactNode;
}

type TButton = (props: ButtonProps) => JSX.Element;

const Button: TButton = ({
  children,
  onClick,
  disabled = false,
  className,
  fullWidth,
  variant = "contained",
  renderBefore,
  ...otherProps
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        style.button,
        {
          [style.buttonText]: variant === 'text',
          [style.buttonContained]: variant === 'contained',
          [style.buttonOutlined]: variant === 'outlined',
          [style.buttonFullWidth]: fullWidth,
        },
        className
      )}
      {...otherProps}
    >
      <div className={style.buttonInner}>
        {renderBefore}
        {children}
      </div>
    </button>
  );
}

export default Button;
