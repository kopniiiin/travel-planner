import './text-input.scss';
import React, {FC, ChangeEvent} from 'react';
import {TextInputType} from '../../const';

interface Props {
  mixClassName?: string;
  id: string;
  type: TextInputType;
  label: string;
  value: string;
  required: boolean;
  disabled: boolean;
  onChange: (value: string) => void;
}

const TextInput: FC<Props> = ({
  mixClassName,
  id,
  type,
  label,
  value,
  required,
  disabled,
  onChange,
}: Props) => (
  <div className={`${mixClassName || ''} text-input`}>

    <label
      className="text-input__label"
      htmlFor={id}>
      {label}
    </label>

    <input
      className="text-input__input"
      id={id}
      type={type}
      value={value}
      autoComplete="off"
      required={required}
      disabled={disabled}
      onChange={(event: ChangeEvent<HTMLInputElement>): void => {
        onChange(event.target.value);
      }}/>

  </div>
);

export default TextInput;
