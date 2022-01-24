/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import axios from 'axios';

enum InputNames {
  name = 'name',
  email = 'email',
}

const route = (path = '') => `http://localhost:5556/user/${path}`;

function getDataFromForm(formData: HTMLFormElement) {
  return Object.fromEntries(
    Object.keys(InputNames).map((name) => [name, formData[name].value]),
  );
}

export default {
  getUsers: () => axios.get(route('users')),
  createUser: (data) => axios.post(route(), getDataFromForm(data)),
  updateUser: (data, name) => axios.put(route(name), getDataFromForm(data)),
  deleteUser: (name) => axios.delete(route(name)),
  deleteAllUsers: () => axios.delete(route('users')),
};
