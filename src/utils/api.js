import axios from "axios"

// axios configuration
const instance = axios.create({
  baseURL: "https://www.swapi.tech/api/",
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
})

// set loading class in case of api request
instance.interceptors.request.use(
  function (config) {
    document.body.classList.add("loading-indicator")
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// remove loading class after response comes from api
instance.interceptors.response.use(
  function (response) {
    document.body.classList.remove("loading-indicator")
    return response
  },
  function (error) {
    return Promise.reject(error)
  }
)

const API = {
  /* = Date: 15-08-2021
     = handle post, get, put and delete API
     ---------------------------------------------------- */
  request: (method, path, data = {}) => {
    let requestObject = {
      method,
      url: path,
    }
    if (method === "post" || method === "put") {
      requestObject.data = data
    }
    return instance(requestObject)
  },
}

export default API
