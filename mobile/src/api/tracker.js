import axios from "axios";
import { AsyncStorage } from "react-native";

// CHANGE THE LINK WHEN YOU RUN NGROK AGAIN (NGROK HTTP 3000)
const instance = axios.create({
  baseURL: "http://174094cef1ee.ngrok.io",
});

instance.interceptors.request.use(
  // Functions that is called everytime we make a Request
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
