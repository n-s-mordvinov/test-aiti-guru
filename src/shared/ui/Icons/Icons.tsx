import type { FC, SVGProps } from 'react';

import ArrowsClockwiseIconSvg from '../../../assets/icons/ArrowsClockwise.svg?react';
import CaretLeftIconSvg from '../../../assets/icons/CaretLeft.svg?react';
import CaretRightIconSvg from '../../../assets/icons/CaretRight.svg?react';
import CloseIconSvg from '../../../assets/icons/Close.svg?react';
import LockIconSvg from '../../../assets/icons/Lock.svg?react';
import PlusCircleIconSvg from '../../../assets/icons/PlusCircle.svg?react';
import SearchIconSvg from '../../../assets/icons/Search.svg?react';
import SpinnerIconSvg from '../../../assets/icons/Spinner.svg?react';
import SquareIconSvg from '../../../assets/icons/Square.svg?react';
import UserIconSvg from '../../../assets/icons/User.svg?react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export interface IconModel {
  name: string;
  icon: string | FC<SVGProps<SVGSVGElement>> | FC<IconProps>;
  type?: 'svg' | 'png' | 'jpg';
}


export const ArrowsClockwiseIcon: FC<IconProps> = ({ size = 22, ...props }) => (
  <ArrowsClockwiseIconSvg width={size} height={size} {...props} />
);
export const CaretLeftIcon: FC<IconProps> = ({ size = 20, ...props }) => (
  <CaretLeftIconSvg width={size} height={size} {...props} />
);
export const CaretRightIcon: FC<IconProps> = ({ size = 20, ...props }) => (
  <CaretRightIconSvg width={size} height={size} {...props} />
);
export const CloseIcon: FC<IconProps> = ({ size = 18, ...props }) => (
  <CloseIconSvg width={size} height={size} {...props} />
);
export const LockIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <LockIconSvg width={size} height={size} {...props} />
);
export const PlusCircleIcon: FC<IconProps> = ({ size = 22, ...props }) => (
  <PlusCircleIconSvg width={size} height={size} {...props} />
);
export const SearchIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <SearchIconSvg width={size} height={size} {...props} />
);
export const SpinnerIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <SpinnerIconSvg width={size} height={size} {...props} />
);
export const SquareIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <SquareIconSvg width={size} height={size} {...props} />
);
export const UserIcon: FC<IconProps> = ({ size = 24, ...props }) => (
  <UserIconSvg width={size} height={size} {...props} />
);