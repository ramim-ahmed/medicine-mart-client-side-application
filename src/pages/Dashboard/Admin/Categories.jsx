import MetaData from "@/components/MetaData";
import CategoriesTable from "@/components/Table/CategoriesTable";
import { Button } from "@/components/ui/button";
import useSecureApi from "@/hooks/useSecureApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CgSpinner } from "react-icons/cg";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { uploadImage } from "@/api/utils";
import toast from "react-hot-toast";
export default function Categories() {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState("");
  const secureApi = useSecureApi();
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await secureApi.get("/categories"),
  });

  const { mutateAsync: addNewCategory } = useMutation({
    mutationFn: async (data) =>
      await secureApi.post("/categories/create-new", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
    },
  });

  const handleNewCategory = async (e) => {
    e.preventDefault();
    try {
      const photo = await uploadImage(imageFile);
      const data = {
        name,
        photo,
      };
      await addNewCategory(data);
      toast.success("Category Created Successfully!!");
    } catch (error) {
      toast.error("Category Created Failed!!");
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <CgSpinner className="animate-spin h-12 w-12" />
      </div>
    );
  }
  return (
    <>
      <MetaData title="Admin Dashboard | Categories" />
      <div>
        <div className="flex justify-between items-center">
          <Button variant="outline">All Categories List</Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleNewCategory} className="space-y-3">
                <div>
                  <Input
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Category Name"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="photo">Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>
                <DialogClose asChild>
                  <Button className="w-full bg-themeColor" type="submit">
                    Submit
                  </Button>
                </DialogClose>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-1 overflow-y-scroll h-[500px] ">
          <CategoriesTable categories={data?.data?.data} />
        </div>
      </div>
    </>
  );
}
