/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import './UsersTable.scss';
import requests from '../../api/requests.ts';

enum InputNames {
  name = 'name',
  email = 'email',
  data = 'data'
}

type User = {
  [key in InputNames]: string
} & {_id: string};

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
    <div className="UsersTable">
      <div className="Users__caption">
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
