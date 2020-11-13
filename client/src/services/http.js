import axios from 'axios';

const BASE_URL = 'http://mern-rest-todo-api.herokuapp.com/api';

export function registerUser(data, callBack) {
  axios
    .post(`${BASE_URL}/auth`, data, {
      headers: {
        'content-type': 'application/json',
      },
    })
    // .then((res) => res.json())
    .then((res) => callBack(res.data))
    .catch((error) => {
      if (error.response) {
        callBack(error.response.data);
      } else {
        callBack({
          message: 'Unable to connect to server',
          status: 404,
        });
      }
    });
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
    .catch((error) => {
      if (error.response) {
        onFailure(error.response.data);
      } else {
        onFailure({
          message: 'Unable to connect to server',
          status: 404,
        });
      }
    });
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
    .then((res) => {})
    .catch((error) => callBack());
}

export function deleteTodo(id, callBack) {
  axios
    .delete(`${BASE_URL}/todo/${id}`)
    .then((res) => {})
    .catch((error) => callBack());
}
