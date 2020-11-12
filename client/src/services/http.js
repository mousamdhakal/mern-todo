import axios from 'axios';

const BASE_URL = 'http://localhost:3333/api';

export function registerUser(data, callBack) {
  axios
    .post(`${BASE_URL}/auth`, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    // .then((res) => res.json())
    .then((res) => callBack(res.data))
    .catch((error) => callBack(error.response.data));
}

export function loginUser(data, onSuccess, onFailure) {
  axios
    .post(`${BASE_URL}/auth/login`, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    // .then((res) => res.json())
    .then((res) => onSuccess(res.data))
    .catch((error) => onFailure(error.response.data));
}

export function getAllTodo(callBack) {
  axios
    .get(`${BASE_URL}/todo`)
    .then((res) => callBack(res.data))
    .catch((err) => callBack(null));
}

export function addTodo(data, callBack) {
  axios
    .post(`${BASE_URL}/todo`, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    // .then((res) => res.json())
    .then((res) => callBack(res.data.data))
    .catch((error) => console.log(error));
}

export function updateTodo(data, callBack) {
  axios
    .patch(`${BASE_URL}/todo/${data._id}`, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    // .then((res) => res.json())
    .then((res) => callBack(res.data.data))
    .catch((error) => console.log(error));
}

export function deleteTodo(id, callBack) {
  axios
    .delete(`${BASE_URL}/todo/${id}`)
    // .then((res) => res.json())
    .then((res) => callBack(res.data))
    .catch((error) => console.log(error));
}
