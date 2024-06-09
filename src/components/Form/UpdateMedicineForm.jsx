/* eslint-disable react/prop-types */
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { TiDeleteOutline } from "react-icons/ti";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useBaseApi from "@/hooks/useBaseApi";
import Spinner from "../Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import { uploadImage } from "@/api/utils";
import useSecureApi from "@/hooks/useSecureApi";
export default function UpdateMedicineForm({ item, setUpdateModalOpen }) {
  const baseApi = useBaseApi();
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState();
  const [company, setCompany] = useState("");
  const [massUnit, setMassUnit] = useState("");
  const [imageFile, setImageFile] = useState("");
  const { register, handleSubmit } = useForm();
  const { mutateAsync: updateMedicine } = useMutation({
    mutationFn: async (data) =>
      await secureApi.patch(`/medicines/${item?._id}`, data),
    onSuccess: () => queryClient.invalidateQueries(["my-medicines-list"]),
  });
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await baseApi.get("/categories"),
  });
  const { data: companies, isLoading: companiesLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => await baseApi.get("/companies"),
  });
  const handleNewMedicine = async (data) => {
    setLoading(true);
    try {
      let image;
      if (imageFile) {
        image = await uploadImage(imageFile);
      }
      const newData = {
        image: image || item?.image,
        name: data?.name || item?.name,
        genericName: data?.genericName,
        category: category || item?.category?._id,
        company: company || item?.company?._id,
        massUnit: massUnit || item?.massUnit,
        unitPrice: data?.unitPrice || item?.unitPrice,
        description: data?.description || item?.description,
        discountPercentage:
          data?.discountPercentage || item?.discountPercentage,
      };
      console.log(newData);
      await updateMedicine(newData);
      toast.success("Update Medicine Update Successfully!!");
      setLoading(false);
      setUpdateModalOpen(false);
    } catch (error) {
      toast.error("Update Medicine Update Failed!!");
      setUpdateModalOpen(false);
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Upload New Product Image</Label>
          <Input
            onChange={(e) => setImageFile(e.target.files[0])}
            id="picture"
            type="file"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(handleNewMedicine)} className="mt-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
          <div>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Enter Medicine Name"
              className="w-full bg-white rounded border border-gray-300 focus:border-themeColor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={item?.name}
            />
          </div>
          <div>
            <input
              {...register("genericName", { required: true })}
              type="text"
              placeholder="Enter Generic Name"
              className="w-full bg-white rounded border border-gray-300 focus:border-themeColor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={item?.genericName}
            />
          </div>
          <div>
            <Select
              className="mt-2"
              defaultValue={item?.company?._id}
              onValueChange={(value) => setCompany(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Company" />
              </SelectTrigger>
              <SelectContent>
                {companiesLoading ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  companies?.data?.data?.map(({ _id, name }) => (
                    <SelectItem key={_id} value={_id}>
                      {name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              defaultValue={item?.category?._id}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categoriesLoading ? (
                  <div>
                    <Spinner />
                  </div>
                ) : (
                  categories?.data?.data?.map(({ _id, name }) => (
                    <SelectItem key={_id} value={_id}>
                      {name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select
              defaultValue={item?.massUnit}
              onValueChange={(value) => setMassUnit(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Mass Unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Mg">Mg</SelectItem>
                <SelectItem value="Ml">Ml</SelectItem>
                <SelectItem value="Gm">Gm</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <input
              {...register("unitPrice", { required: true })}
              type="number"
              placeholder="Enter Unit Price"
              className="w-full bg-white rounded border border-gray-300 focus:border-themeColor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={item?.unitPrice}
            />
          </div>
          <div>
            <input
              {...register("discountPercentage")}
              type="number"
              placeholder="discount by percentage optional ( if you give )"
              className="w-full bg-white rounded border border-gray-300 focus:border-themeColor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              defaultValue={item?.discountPercentage}
            />
          </div>
          <div className="col-span-2">
            <textarea
              {...register("description", { required: true })}
              placeholder="short description"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              defaultValue={item?.description}
            />
          </div>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <Button className="w-3/4 bg-themeColor" type="submit">
            {loading ? <Spinner /> : "Update Now"}
          </Button>
          <Button
            onClick={() => setUpdateModalOpen(false)}
            variant="outline"
            type="button"
            size="icon"
          >
            <TiDeleteOutline className="h-6 w-6" />
          </Button>
        </div>
      </form>
    </div>
  );
}
