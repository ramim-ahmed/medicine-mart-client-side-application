import MetaData from "@/components/MetaData";
import Spinner from "@/components/Spinner";
import BannerTable from "@/components/Table/BannerTable";
import { Button } from "@/components/ui/button";
import useSecureApi from "@/hooks/useSecureApi";
import { useQuery } from "@tanstack/react-query";

export default function BannerAdvertisement() {
  const secureApi = useSecureApi();
  const { data, isLoading } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => await secureApi.get("/advertisements"),
  });
  return (
    <>
      <MetaData title="Admin Dashboard | Banner Advertisement" />
      <div>
        <div>
          <Button variant="outline">All Advertisements List</Button>
        </div>
        <div>
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <BannerTable items={data?.data?.data} />
          )}
        </div>
      </div>
    </>
  );
}
