import { checkResponse } from "./utils/CheckResponse.js";

export const BASE_URL = "https://api.voiislavm.nomoredomainsmonster.ru";

const request = (url, options) => {
  return fetch(url, { ...options, credentials: 'include' }).then(checkResponse);
}

export const register = (email, password) => {
  return request(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  })
};

export const authorize = (email, password) => {
  return request(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        return data;
      }
    })
};

export const checkToken = (token) => {
  return request(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      credentials: 'include',
    },
  })
    .then((data) => data)
};
