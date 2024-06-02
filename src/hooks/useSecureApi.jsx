import axios from "axios";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../firebase";
const secureApi = axios.create({
  baseURL: "http://localhost:8000/api/v1",
});
export default function useSecureApi() {
  const navigate = useNavigate();
  // logout
  const logout = () => {
    const auth = getAuth();
    return signOut(auth);
  };
  secureApi.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  secureApi.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await logout();
        navigate("/login");
        localStorage.removeItem("access-token");
      }
      return Promise.reject(error);
    }
  );

  return secureApi;
}
