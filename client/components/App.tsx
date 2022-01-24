/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css';
import UsersTable from './UsersTable/UsersTable.tsx';
import UsersRow from './UsersRow/UsersRow.tsx';
import UsersHead from './UsersHead/UsersHead.tsx';
import requests from '../api/requests.ts';

enum InputNames {
  name = 'name',
  email = 'email',
  data = 'data'
}

type User = {
  [key in InputNames]: string
} & {_id: string};

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function loadData() {
      const response = await requests.getUsers();

      setUsers(response.data.users);
    }

    loadData();
  }, []);

  return (
    <UsersTable onSetUser={setUsers}>
      <UsersHead names={['Name', 'Email', 'Date']} />

      {users.map((user, i) => (
        <UsersRow
          key={user._id}
          number={i}
          id={user._id}
          editableFields={[user.name, user.email]}
          unEditableFields={[user.data]}
          onSetUsers={setUsers}
        />
      ))}
    </UsersTable>
  );
};

export default App;
