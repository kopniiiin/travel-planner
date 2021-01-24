import './select.scss';
import React, {FC, ChangeEvent} from 'react';

interface Props {
  mixClassName?: string;
  id: string;
  label: string;
  value: string;
  options: string[];
  disabled: boolean;
  onChange: (value: string) => void;
}

const Select: FC<Props> = ({
  mixClassName,
  id,
  label,
  value,
  options,
  disabled,
  onChange,
}: Props) => (
  <div className={`${mixClassName || ''} select`}>

    <label
      className="select__label"
      htmlFor={id}>
      {label}
    </label>

    <br/>

    <select
      className="select__select"
      id={id}
      value={value}
      disabled={disabled}
      onChange={(event: ChangeEvent<HTMLSelectElement>): void => {
        onChange(event.target.value);
      }}>

      {options.map((option: string): JSX.Element => (
        <option
          key={option}
          value={option}>
          {option}
        </option>
      ))}

    </select>

  </div>
);

export default Select;
