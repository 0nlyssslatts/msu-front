import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@components/ui/Button';
import { AppDispatch, RootState } from 'src/store';

import {
  fetchUsers,
  confirmUser,
  resetConfirmError,
} from '../../actions/userAction';

import styles from './UsersGroupPage.module.scss';


interface User {
  id: number;
  confirmed: boolean;
}

const UsersGroupPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    // Загрузить список пользователей при монтировании
    dispatch(fetchUsers());
    return () => {
      dispatch(resetConfirmError());
    };
  }, [dispatch]);

  const handleConfirm = (userId: number) => {
    dispatch(confirmUser({ user_id: userId })).then((action) => {
      if (confirmUser.fulfilled.match(action)) {
        // после успешного подтверждения, обновляем список
        dispatch(fetchUsers());
      }
    });
  };

  return (
    <div className={styles.confirmBlock}>
      <h1 className={styles.bold28}>Все студенты группы</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {users.map((user: User) => (
        <div key={user.id} className={styles.confirmBlock__item}>
          <p>UserID: {user.id}</p>
          <Button
            onClick={() => handleConfirm(user.id)}
            disabled={user.confirmed || loading}
          >
            {user.confirmed
              ? 'Подтверждён'
              : loading
              ? 'Подтверждение...'
              : 'Подтвердить'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UsersGroupPage;
