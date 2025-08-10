import axios from "axios";
import { URL } from "./url";

export default axios.create({
  // baseURL: process.env.NODE_ENV == "development" ? URL.LOCAL_API : URL.SERVER_API
 baseURL: URL.SERVER_API,
});
