import { useQuery } from "@tanstack/react-query";
import useSecureApi from "./useSecureApi";
import useAuth from "./useAuth";

export default function useRole() {
  const { authUser, loading } = useAuth();
  const secureApi = useSecureApi();
  const { data: role = "", isLoading } = useQuery({
    queryKey: ["user-role", authUser?.email],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await secureApi.get(
        `/users/get-role/${authUser?.email}`
      );
      return data?.role;
    },
  });

  //   Fetch user info using logged in user email

  return [role, isLoading];
}
