import axios from "axios";
import { API as BASE_URL } from "./const";
const AXIOS_ = (url, type, payload, query = null) => {
  const instance = {
    baseURL: BASE_URL,
    url,
    timeout: 100000,
    method: type,
    data: payload,
    params: {
      query,
    },
    headers: { "X-Custom-Header": "foobar" },
  };
  return new Promise(function (resolve, reject) {
    axios(instance)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      })
      .then(() => {
        console.log("Finally");
      });
  });
};

export default AXIOS_;
