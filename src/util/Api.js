import axios from "axios";
export const API_URL = "http://localhost:3334/";
//export const API_URL = "http://848251d83377.ngrok.io/";
// export const API_URL =
//   "http://ec2-18-216-193-215.us-east-2.compute.amazonaws.com:3334/";
// export const API_URL = "http://641d8549b43c.ngrok.io/";

export const registerUser = (data) => {
  return axios.post(API_URL + "users/signup", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};
export const loginUser = (data) => {
  return axios.post(API_URL + "signin", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const getProfile = (data, token) => {
  const config = {
    headers: { authorization: token },
  };
  return axios.post(API_URL + "users/profile", data, config).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const editProfile = (data, token) => {
  const config = {
    headers: { authorization: token },
  };
  console.log(data, token);
  return axios.put(API_URL + "users/profile/edit", data, config).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const uploadVideo = (data, token) => {
  console.log(token);
  const config = {
    headers: { authorization: token },
  };
  return axios.post(API_URL + "videos/send", data, config).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const checkEmail = (data) => {
  return axios.post(API_URL + "email/confirm_email", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const editPass = (data) => { //Ver com davi a necessidade de mandar o token:autho etc
  return axios.post(API_URL + "email/edit_pass", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const sendEmail = (data) => {
  return axios.post(API_URL + "email/send", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const getVideo = (data) => {
  return axios.put(API_URL + "video/get", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const editVideo = (data) => {
  return axios.put(API_URL + "video/edit", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const deletVideo = (data) => {
  return axios.put(API_URL + "video/delet", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const Inscribe = (data) => {
  return axios.put(API_URL + "users/inscribe", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};

export const Report = (data) => {
  return axios.put(API_URL + "/report", data).then(
    function (res) {
      let data = res.data;
      return data;
    }.bind(this)
  );
};
