import { useQuery } from "@tanstack/react-query";
import useSecureApi from "./useSecureApi";
import useAuth from "./useAuth";

export default function useCart() {
  const secureApi = useSecureApi();
  const { authUser, loading } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-carts"],
    enabled: !loading,
    queryFn: async () =>
      await secureApi.get(`/carts/my-cart/${authUser?.email}`),
  });
  return [data, isLoading, refetch];
}
