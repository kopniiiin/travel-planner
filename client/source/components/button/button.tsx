import './button.scss';
import React, {FC} from 'react';
import {ButtonType} from '../../const';

interface Props {
  mixClassName?: string;
  type: ButtonType;
  label: string;
  disabled: boolean;
  onClick: () => void;
}

const Button: FC<Props> = ({
  mixClassName,
  type,
  label,
  disabled,
  onClick,
}: Props) => (
  <button
    className={`${mixClassName || ''} button`}
    type={type}
    disabled={disabled}
    onClick={onClick}>
    {label}
  </button>
);

export default Button;
