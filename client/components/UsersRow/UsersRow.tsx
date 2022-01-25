import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { User } from '../../../common';
import useSwitch from '../../hooks/useSwitch';
import requests from '../../api/requests';
import classes from './UsersRow.module.css';
import './UsersRow.scss';

type Props = {
  number: number;
  currentUser: User;
  inputNames: [keyof User];
  onSetUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UsersRow: React.FC<Props> = ({ number, inputNames, currentUser, onSetUsers }) => {
  const [[isEdit, setIsEdit], [isDelete, setIsDelete]] = useSwitch(2);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!currentUser._id) {
      setIsEdit();
      inputRef?.current?.focus();
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, id: string) => {
    event.preventDefault();

    const form: HTMLFormElement = event.target as HTMLFormElement;

    let newUser: User | null = null;

    if (isEdit) {
      const { data: { user } } = id
        ? await requests.updateUser(form, currentUser.name)
        : await requests.createUser(form);
      newUser = user;
    }

    if (isDelete) {
      await requests.deleteUser(currentUser.name);
    }

    onSetUsers((users) => {
      if (newUser) {
        users.splice(number, 1, newUser);
      } else {
        users.splice(number, 1);
      }

      return [...users];
    });

    setIsEdit();
  };

  return (
    <form
      onSubmit={(event) => handleSubmit(event, currentUser._id)}
      className={clsx({
        UsersRow: true,
        [classes.deleted]: isDelete,
      })}
    >
      {inputNames.map((name, i) => {
        const refs = !i ? { ref: inputRef } : {};

        return (
          <div className="UsersRow__cell">
            <input
              name={name}
              defaultValue={currentUser[name]}
              type="text"
              readOnly={!isEdit}
              {...refs}
            />
          </div>
        );
      })}

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
