import clsx from "clsx";
import { Link as LinkRouter, type LinkProps } from "react-router";
import styles from './Link.module.scss';
import type { JSX } from "react";

type TLink = (props: LinkProps) => JSX.Element;

export const Link: TLink = ({
  className,
  ...otherProps
}) => {
  return (
    <LinkRouter className={clsx(styles.link, className)} {...otherProps} />
  )
}