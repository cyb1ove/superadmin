import React, { useState, useEffect } from 'react';
import { User, editableFieldsNames, uneditableFieldsNames } from '../../common';
import UsersTable from './UsersTable/UsersTable';
import UsersRow from './UsersRow/UsersRow';
import UsersHead from './UsersHead/UsersHead';
import requests from '../api/requests';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const inputNames = [
    ...Object.keys(editableFieldsNames),
    ...Object.keys(uneditableFieldsNames),
  ] as [keyof User];

  useEffect(() => {
    async function loadData() {
      const response = await requests.getUsers();

      setUsers(response.data.users);
    }

    loadData();

    return () => {};
  }, []);

  return (
    <UsersTable onSetUser={setUsers}>
      {users[0] && <UsersHead names={inputNames} />}

      {users.map((user, i) => (
        <UsersRow
          key={user._id}
          number={i}
          inputNames={inputNames}
          currentUser={user}
          onSetUsers={setUsers}
        />
      ))}
    </UsersTable>
  );
};

export default App;
