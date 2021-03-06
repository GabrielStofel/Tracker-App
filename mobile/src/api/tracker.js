import axios from "axios";
import { AsyncStorage } from "react-native";

// CHANGE THE LINK WHEN YOU RUN NGROK AGAIN (NGROK HTTP 3000)
const instance = axios.create({
  baseURL: "http://d53983c9632b.ngrok.io",
});

instance.interceptors.request.use(
  // Functions that are called everytime we make a Request
  async (config) => {
    const token = await AsyncStorage.getItem("token");

    // This way we don't have to worry about authenticating ourselves when making requests
    // because with these lines of code, the token will be attached to the header automatically
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  // Function that is called everytime an error is returned
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
