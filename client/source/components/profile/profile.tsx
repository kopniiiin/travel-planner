import './profile.scss';
import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ButtonType, LoginFormType} from '../../const';
import {AsyncActionCreator} from '../../store/actions';
import Selector from '../../store/selector';
import Button from '../button/button';
import LoginForm from '../login-form/login-form';

interface Props {
  mixClassName?: string;
}

const Profile: FC<Props> = ({
  mixClassName,
}: Props) => {
  const [loginFormType, setLoginFormType] = useState(LoginFormType.SIGN_UP);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector(Selector.getEmail);
  const isFetching = useSelector(Selector.getFetchingStatus);

  const onRegisterButtonClick = (): void => {
    setLoginFormType(LoginFormType.SIGN_UP);
    setIsLoginFormOpen(true);
  };

  const onLoginButtonClick = (): void => {
    setLoginFormType(LoginFormType.SIGN_IN);
    setIsLoginFormOpen(true);
  };

  const onLogoutButtonClick = (): void => {
    const action = AsyncActionCreator.logout();
    dispatch(action);
  };

  const onLoginFormClose = (): void => setIsLoginFormOpen(false);

  return (
    <section className={`${mixClassName || ''} profile`}>

      <h2 className="profile__heading">{email || 'Guest'}</h2>

      {!email && !isLoginFormOpen && (
        <div>

          <Button
            type={ButtonType.BUTTON}
            label="Sign up"
            disabled={isFetching}
            onClick={onRegisterButtonClick}/>

          {' '}

          <Button
            type={ButtonType.BUTTON}
            label="Sign in"
            disabled={isFetching}
            onClick={onLoginButtonClick}/>

        </div>
      )}

      {email && (
        <div>

          <Button
            type={ButtonType.BUTTON}
            label="Log out"
            disabled={isFetching}
            onClick={onLogoutButtonClick}/>

        </div>
      )}

      {isLoginFormOpen && (
        <LoginForm type={loginFormType} onClose={onLoginFormClose}/>
      )}

    </section>
  );
};

export default Profile;
