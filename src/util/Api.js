import axios from "axios";
export const API_URL = "http://localhost:3334/";
//export const API_URL = "http://61055c0a83f4.ngrok.io/";
// export const API_URL =
//   "http://ec2-18-216-193-215.us-east-2.compute.amazonaws.com:3334/";

export const getImg = (data) => {
  return axios.post(API_URL + "nin/imgs", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const registerUser = (data) => {
  return axios.post(API_URL + "users/signup", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const loginUser = (data) => {
  return axios.post(API_URL + "signin", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const getProfile = (data, token) => {
  const config = {
    headers: { authorization: token },
  };
  return axios
    .post(API_URL + "users/profile", data, config)
    .then(function (res) {
      let data = res.data;
      return data;
    });
};

export const editProfile = (data, token) => {
  const config = {
    headers: { authorization: token },
  };
  console.log(data, token);
  return axios
    .put(API_URL + "users/profile/edit", data, config)
    .then(function (res) {
      let data = res.data;
      return data;
    });
};

export const uploadVideo = (data, token) => {
  console.log(token);
  const config = {
    headers: { authorization: token },
  };
  return axios.post(API_URL + "videos/send", data, config).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const getUploadVideo = (data, token) => {
  return axios.post(API_URL + "videos/getData", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const checkEmail = (data) => {
  return axios.post(API_URL + "email/confirm_email", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const editPass = (data) => {
  //Ver com davi a necessidade de mandar o token:autho etc
  return axios.post(API_URL + "email/edit_pass", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const sendEmail = (data) => {
  return axios.post(API_URL + "email/send", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const getVideo = (data) => {
  return axios.post(API_URL + "videos/get", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const watchVideo = (data) => {
  return axios.post(API_URL + "videos/watch", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const editVideo = (data, token) => {
  const config = {
    headers: { authorization: token },
  };
  return axios.put(API_URL + "videos/edit", data, config).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const deletVideo = (data) => {
  return axios.put(API_URL + "video/delet", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const Inscribe = (data) => {
  return axios.post(API_URL + "users/subs", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const newLiked = (data) => {
  return axios.post(API_URL + "videos/liked", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const Report = (data) => {
  return axios.put(API_URL + "videos/report", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const sendComment = (data) => {
  return axios.post(API_URL + "videos/sendComment", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const editComment = (data) => {
  return axios.put(API_URL + "videos/edit_comment", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const deletComment = (data) => {
  return axios.put(API_URL + "videos/delet_comment", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const getComment = (data) => {
  return axios.post(API_URL + "videos/getComment", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const getVideos = (data) => {
  return axios.post(API_URL + "videos/get", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const myVideos = (data) => {
  return axios.post(API_URL + "videos/myVideos", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const feedVideos = (data) => {
  return axios.post(API_URL + "home/get", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const riseVideos = (data) => {
  return axios.post(API_URL + "home/rise", data).then(function (res) {
    let data = res.data;
    return data;
  });
};
export const historic = (data) => {
  return axios.post(API_URL + "home/historic", data).then(function (res) {
    let data = res.data;
    return data;
  });
};

export const listPlaylist = (data) => {
  return axios.post(API_URL + "playlist/list", data).then(function (res) {
    let data = res.data;
    return data;
  });
};
