import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  export default request;
