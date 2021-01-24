import './login-form.scss';
import React, {FC, useState, FormEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  ButtonType,
  TextInputType,
  LoginFormType,
  Credentials,
} from '../../const';

import {doNothing} from '../../utils';
import {AsyncActionCreator} from '../../store/actions';
import Selector from '../../store/selector';
import Button from '../button/button';
import TextInput from '../text-input/text-input';

interface Props {
  mixClassName?: string;
  type: LoginFormType;
  onClose: () => void;
}

const LoginForm: FC<Props> = ({
  mixClassName,
  type,
  onClose,
}: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const isFetching = useSelector(Selector.getFetchingStatus);

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const credentials: Credentials = {email, password};
    const action = type === LoginFormType.SIGN_UP ?
      AsyncActionCreator.register(credentials) :
      AsyncActionCreator.login(credentials);
    dispatch(action);
    onClose();
  };

  return (
    <form className={`${mixClassName || ''} login-form`} onSubmit={onSubmit}>

      <TextInput
        id="email"
        type={TextInputType.EMAIL}
        label="Email"
        value={email}
        required={true}
        disabled={isFetching}
        onChange={setEmail}/>

      <TextInput
        id="password"
        type={TextInputType.PASSWORD}
        label="Password"
        value={password}
        required={true}
        disabled={isFetching}
        onChange={setPassword}/>

      <div>

        <Button
          type={ButtonType.SUBMIT}
          label={type === LoginFormType.SIGN_UP ? 'Sign up' : 'Sign in'}
          disabled={isFetching}
          onClick={doNothing}/>

        {' '}

        <Button
          type={ButtonType.BUTTON}
          label="Cancel"
          disabled={isFetching}
          onClick={onClose}/>

      </div>

    </form>
  );
};

export default LoginForm;
