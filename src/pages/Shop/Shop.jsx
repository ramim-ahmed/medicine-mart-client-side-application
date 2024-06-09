import MetaData from "@/components/MetaData";
import Spinner from "@/components/Spinner";
import MedicineListsTable from "@/components/Table/MedicineListsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useBaseApi from "@/hooks/useBaseApi";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";
export default function Shop() {
  const searchInputRef = useRef();
  const [sortBy, setSortBy] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const baseApi = useBaseApi();
  const { data, isLoading } = useQuery({
    queryKey: ["medicines", sortBy, searchTerm],
    queryFn: async () =>
      await baseApi.get(`/medicines?searchTerm=${searchTerm}&sortBy=${sortBy}`),
  });
  const handleSearch = () => {
    setSearchTerm(searchInputRef.current.value);
    searchInputRef.current.value = "";
  };
  const clearSearch = () => {
    setSearchTerm((searchInputRef.current.value = ""));
  };
  return (
    <>
      <MetaData title="Medicine Mart | Shop" />
      <div className="pt-8">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex  justify-between">
            <div className="w-1/3">
              <Button variant="outline">All Medicines Lists</Button>
            </div>
            <div className="flex w-2/3 justify-between items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Input
                  className="w-[400px]"
                  ref={searchInputRef}
                  type="text"
                  placeholder="search here..."
                />
                <Button onClick={() => handleSearch()} type="text">
                  Search
                </Button>
                <Button onClick={() => clearSearch()} type="text">
                  Clear Search
                </Button>
              </div>
              <div>
                <Select onValueChange={(value) => setSortBy(value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="sort by price" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="desc">Descending</SelectItem>
                      <SelectItem value="asc">Ascending</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className="mt-2 bg-white">
            {isLoading ? (
              <div className="flex justify-center">
                <Spinner />
              </div>
            ) : (
              <MedicineListsTable medicines={data?.data?.data} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
