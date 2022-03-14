import { createSelector } from '@reduxjs/toolkit';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'reactstrap';
import Toaster from '../../components/toast';
import { AppState } from '../../store/reducer';
import Info from './info';
import Password from './password';
import { profileActions } from './store/slice';

const userSelector = createSelector(
  (state: AppState) => state.auth.user,
  (state: AppState) => state.profile.message,
  (user, message) => ({ user: user!, message })
);

function Profile() {
  const { user, message } = useSelector(userSelector);
  const dispatch = useDispatch();

  const toggleToaster = useCallback(() => {
    dispatch(profileActions.resetState());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      toggleToaster();
    };
  }, [toggleToaster]);

  return (
    <Container style={{ paddingTop: '2rem' }}>
      <Toaster message={message} toggle={toggleToaster} />
      <Info user={user} />
      <Password user={user} />
    </Container>
  );
}

export default Profile;
