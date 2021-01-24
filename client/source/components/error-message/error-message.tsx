import './error-message.scss';
import React, {FC} from 'react';
import {useSelector} from 'react-redux';
import Selector from '../../store/selector';

const ErrorMessage: FC<{}> = () => {
  const error = useSelector(Selector.getError);
  return error ? <span className="error-message">{error}</span> : null;
};

export default ErrorMessage;
