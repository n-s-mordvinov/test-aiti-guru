import type { InputHTMLAttributes, JSX } from "react";
import styles from './InputField.module.scss';
import { CloseIcon } from "../Icons";
import clsx from "clsx";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  label?: string;
  renderAfter?: JSX.Element;
  renderBefore?: JSX.Element;
  rootClassName?: string;
  inputWrapperClassName?: string;
  error?: string;
};

type TInputField = (props: InputFieldProps) => JSX.Element;

export const InputField: TInputField = ({
  value,
  id,
  name,
  type = 'text',
  label,
  onClear,
  renderBefore,
  renderAfter,
  rootClassName,
  inputWrapperClassName,
  required,
  error,
  ...otherProps
})  => {
  const isShowClear = value && onClear;

  return (
    <div className={clsx(styles.root, rootClassName)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <div className={clsx(styles.inputWrapper, inputWrapperClassName, { [styles.inputWrapperError]: !!error })}>
        {renderBefore && (
          <div className={styles.renderBeforeWrapper}>
            {renderBefore}
          </div>
        )}
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          className={styles.input}
          {...otherProps}
        />
        {isShowClear && (
          <button
            onClick={onClear}
            className={styles.clearBtn}
            aria-label="Clear input"
          >
            <CloseIcon />
          </button>
        )}
        {renderAfter && (
          <div className={styles.renderAfterWrapper}>
            {renderAfter}
          </div>
        )}
      </div>
      {error && (
        <div className={styles.error}>{error}</div>
      )}
    </div>
  );
}

export default InputField;