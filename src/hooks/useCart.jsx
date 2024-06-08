import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useBaseApi from "./useBaseApi";

export default function useCart() {
  const baseApi = useBaseApi();
  const { authUser, loading } = useAuth();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["my-carts"],
    enabled: !loading,
    queryFn: async () => await baseApi.get(`/carts/my-cart/${authUser?.email}`),
  });
  return [data, isLoading, refetch];
}
