import React, { useState } from 'react';
import Button from '@components/ui/Button';
import styles from './UsersGroupPage.module.scss';

const initialUsers = [
  { id: 1, confirmed: false },
  { id: 2, confirmed: false },
  { id: 3, confirmed: false },
  { id: 4, confirmed: true },
  { id: 5, confirmed: true },
  { id: 6, confirmed: true },
];

const UsersGroupPage = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleClick = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === id ? { ...user, confirmed: true } : user
      )
    );
  };

  return (
    <div className={styles.confirmBlock}>
      <h1 className={styles.bold28}>Все студенты группы</h1>
      {users.map((user) => (
        <div key={user.id} className={styles.confirmBlock__item}>
          <p>UserID: {user.id}</p>
          <Button
            onClick={() => handleClick(user.id)}
            disabled={user.confirmed}
          >
            {user.confirmed ? 'Подтверждён' : 'Подтвердить'}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default UsersGroupPage;
