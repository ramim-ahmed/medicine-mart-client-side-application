import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { TableCell, TableRow } from "../ui/table";
import PropTypes from "prop-types";
import { RiDeleteBin7Line } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import useSecureApi from "@/hooks/useSecureApi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { uploadImage } from "@/api/utils";
import toast from "react-hot-toast";
import { TiDeleteOutline } from "react-icons/ti";
import Spinner from "../Spinner";
import Swal from "sweetalert2";
export default function CategoryRow({ category, idx }) {
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [upateName, setUpdateName] = useState("");
  const [imageFile, setImageFile] = useState("");
  const { _id, name: categoryName, photo: categoryPhoto } = category || {};
  const { mutateAsync: updateCategory } = useMutation({
    mutationFn: async (data) =>
      await secureApi.patch(`/categories/${_id}`, data),
    onSuccess: () => queryClient.invalidateQueries(["categories"]),
  });
  const { mutateAsync: deleteCategory } = useMutation({
    mutationFn: async (id) => await secureApi.delete(`categories/${id}`),
  });
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let photo;
      if (imageFile) {
        photo = await uploadImage(imageFile);
      }
      const data = {
        name: upateName || categoryName,
        photo: photo || categoryPhoto,
      };
      await updateCategory(data);
      toast.success("Category Updated Successfully!!");
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Category Updated Failed!!");
      setLoading(false);
      setOpen(false);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteCategory(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          toast.success("Category Deleted Successfully!!");
        }
      });
    } catch (error) {
      toast.success("Category Deleted Failed!!");
    }
  };
  return (
    <TableRow>
      <TableCell>{idx + 1}</TableCell>
      <TableCell>
        <div>
          <img src={categoryPhoto} className="w-10" alt="" />
        </div>
      </TableCell>
      <TableCell>{categoryName}</TableCell>
      <TableCell>
        <div className="space-x-3">
          <Dialog open={open}>
            <DialogTrigger onClick={() => setOpen(true)}>
              <Button variant="outline" size="icon">
                <TiEdit className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleUpdateCategory} className="space-y-3">
                <div>
                  <Input
                    defaultValue={categoryName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    placeholder="Enter Category Name"
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="photo">Select New Photo</Label>
                  <Input
                    id="photo"
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Button className="w-3/4 bg-themeColor" type="submit">
                    {loading ? <Spinner /> : "Update Now"}
                  </Button>
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outline"
                    type="button"
                    size="icon"
                  >
                    <TiDeleteOutline className="h-6 w-6" />
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          <Button
            onClick={() => handleDeleteCategory(_id)}
            variant="outline"
            size="icon"
          >
            <RiDeleteBin7Line className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

CategoryRow.propTypes = {
  category: PropTypes.object,
  idx: PropTypes.number,
};
