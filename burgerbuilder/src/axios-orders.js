import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-790cb-default-rtdb.firebaseio.com/",
});

export default instance;
