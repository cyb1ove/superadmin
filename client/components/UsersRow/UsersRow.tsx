/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef } from 'react';
import useSwitch from '../../hooks/useSwitch.tsx';
import requests from '../../api/requests.ts';
import './UsersRow.scss';

enum InputNames {
  name = 'name',
  email = 'email',
  data = 'data'
}

type User = {
  [key in InputNames]: string
} & {_id: string};

type Props = {
  id: string;
  number: number;
  editableFields: string[];
  unEditableFields: string[];
  onSetUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UsersRow: React.FC<Props> = ({
  id,
  number,
  editableFields,
  unEditableFields,
  onSetUsers,
}) => {
  const [[isEdit, setIsEdit], [isDelete, setIsDelete]] = useSwitch(2);
  const inputRefs = Array.from({ length: editableFields.length }, () => useRef(null));
  const names = Object.keys(InputNames);
  let counter = 0;

  useEffect(() => {
    if (!id) {
      setIsEdit();
      inputRefs[0].current.focus();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target;
    const requestName = editableFields[0];

    let currentUser = null;

    if (isEdit) {
      const { data: { user } } = id
        ? await requests.updateUser(form, requestName)
        : await requests.createUser(form);
      currentUser = user;
    }

    if (isDelete) {
      await requests.deleteUser(requestName);
    }

    onSetUsers((users) => {
      if (currentUser) {
        users.splice(number, 1, currentUser);
      } else {
        users.splice(number, 1);
      }

      return [...users];
    });

    setIsEdit(false);
  };

  return (
    <form
      className="UsersRow"
      onSubmit={handleSubmit}
    >
      {editableFields.map((field, i) => (
        <div className="UsersRow__cell">
          <input
            name={names[counter++]}
            ref={inputRefs[i]}
            defaultValue={field}
            type="text"
            readOnly={!isEdit}
          />
        </div>
      ))}

      {unEditableFields.map((field, i) => (
        <div className="UsersRow__cell">
          <input
            name={names[counter++]}
            defaultValue={field}
            type="text"
            readOnly
          />
        </div>
      ))}

      <div className="UsersRow__cell">
        <button
          type="button"
          onClick={setIsEdit}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={setIsDelete}
        >
          Delete
        </button>

        {isEdit && <button type="submit">Save</button>}

        {isDelete && <button type="submit">Confirm</button>}
      </div>
    </form>
  );
};

export default UsersRow;
