import axios from "axios";

// this create an instance of the axios
const instance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

instance.defaults.headers.common["Authorization"] = "AUTH TOKEN FROM INSTANCE";

// the same way as we have written it inside the index js file
// instance.interceptors.request.use()

export default instance;
