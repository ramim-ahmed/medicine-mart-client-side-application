import axios from "axios";

const baseApi = axios.create({
  baseURL: "https://medicine-mart-server-side-application.vercel.app/api/v1",
});
export default function useBaseApi() {
  return baseApi;
}
