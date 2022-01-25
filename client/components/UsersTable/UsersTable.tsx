import React from 'react';
import requests from '../../api/requests';
import classes from './UsersTable.module.css';
import { User } from '../../../common';

type Props = {
  children: React.ReactNode,
  onSetUser: React.Dispatch<React.SetStateAction<User[]>>,
}

const UsersTable: React.FC<Props> = ({ children, onSetUser }) => {
  const defaultUser: User = {
    _id: '',
    name: '',
    email: '',
    data: '',
  };

  function handleAddRow() {
    onSetUser((users) => [...users, defaultUser]);
  }

  async function handleDeleteAll() {
    await requests.deleteAllUsers();
    onSetUser([]);
  }

  return (
    <div className={classes.table}>
      <div className={classes.caption}>
        <button
          type="button"
          onClick={handleAddRow}
        >
          Add Row
        </button>

        <button
          type="button"
          onClick={handleDeleteAll}
        >
          Remove All
        </button>
      </div>

      { children }
    </div>
  );
};

export default UsersTable;
