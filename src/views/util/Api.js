import axios from "axios";
//export const API_URL = "http://localhost:3334/";
//export const API_URL = "http://848251d83377.ngrok.io/";
//export const API_URL = "http://ec2-18-216-193-215.us-east-2.compute.amazonaws.com:3334/";
export const API_URL = "http://641d8549b43c.ngrok.io/";

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
  console.log(data,token);
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
