import UserTable from "@/components/Table/UserTable";
import { Button } from "@/components/ui/button";
import useSecureApi from "@/hooks/useSecureApi";
import { useQuery } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
export default function User() {
  const secureApi = useSecureApi();
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await secureApi.get("/users"),
  });
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <CgSpinner className="animate-spin h-12 w-12" />
      </div>
    );
  }
  console.log(data);
  return (
    <div>
      <div>
        <Button variant="outline">All Users Lists</Button>
      </div>
      <div className="overflow-y-scroll h-[800px]">
        <UserTable users={data?.data?.data} />
      </div>
    </div>
  );
}
