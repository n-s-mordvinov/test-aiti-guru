import type { JSX, ReactNode } from "react";
import clsx from "clsx";

import styles from './Toast.module.scss';

type ToastType = "default" | "error" | "success" | "warning" | "info";

interface Toast {
  message: ReactNode;
  type: ToastType;
  duration?: number;
  onClose?: () => void;
}

export const Toast = ({
  message,
  type,
  onClose
}: Toast): JSX.Element => {
  return (
    <div className={clsx(styles.toast, {
      [styles.default]: type === 'default',
      [styles.error]: type === 'error',
      [styles.success]: type === 'success',
      [styles.warning]: type === 'warning',
      [styles.info]: type === 'info',
    })}>
      <div className={styles.message}>{message}</div>
      <button className={styles.close} onClick={onClose}>
        ×
      </button>
    </div>
  )
}