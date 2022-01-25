/* eslint-disable import/no-relative-packages */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import axios from 'axios';
import { editableFieldsNames } from '../../common';

const route = (path = '') => `http://localhost:5556/user/${path}`;

function getDataFromForm(formData: HTMLFormElement) {
  console.log(Object.fromEntries(
    Object.keys(editableFieldsNames).map((name) => [name, formData[name].value]),
  ));

  return Object.fromEntries(
    Object.keys(editableFieldsNames).map((name) => [name, formData[name].value]),
  );
}

export default {
  getUsers: () => axios.get(route('users')),
  createUser: (data: HTMLFormElement) => axios.post(route(), getDataFromForm(data)),
  updateUser:
    (data: HTMLFormElement, name: string) => axios.put(route(name), getDataFromForm(data)),
  deleteUser: (name: string) => axios.delete(route(name)),
  deleteAllUsers: () => axios.delete(route('users')),
};
