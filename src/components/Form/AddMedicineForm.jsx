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
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useBaseApi from "@/hooks/useBaseApi";
import Spinner from "../Spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { uploadImage } from "@/api/utils";
import useSecureApi from "@/hooks/useSecureApi";
export default function AddMedicineForm({ setOpen }) {
  const baseApi = useBaseApi();
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [massUnit, setMassUnit] = useState("");
  const [imageFile, setImageFile] = useState("");
  const { authUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { mutateAsync: addNewMedicine } = useMutation({
    mutationFn: async (data) =>
      await secureApi.post("/medicines/create-new", data),
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
    if (!category) {
      return toast.error("Please Select Category!!");
    }
    if (!company) {
      return toast.error("Please Select company!!");
    }
    if (!massUnit) {
      return toast.error("Please Select Mass Unit!!");
    }
    if (!imageFile) {
      return toast.error("Please Select Image!!");
    }
    try {
      const image = await uploadImage(imageFile);
      const newData = {
        seller: {
          name: authUser?.displayName,
          email: authUser?.email,
          photo: authUser?.photoURL,
        },
        image,
        name: data?.name,
        genericName: data?.genericName,
        category,
        company,
        massUnit,
        unitPrice: data?.unitPrice,
        description: data?.description,
        discountParcentage: data?.discountParcentage || 0,
      };
      await addNewMedicine(newData);
      toast.success("Medicine Successfully Added!!");
      setLoading(false);
      setOpen(false);
    } catch (error) {
      toast.error("Add New Medicine Failed!!");
      setOpen(false);
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="picture">Select Image</Label>
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
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <input
              {...register("genericName", { required: true })}
              type="text"
              placeholder="Enter Generic Name"
              className="w-full bg-white rounded border border-gray-300 focus:border-themeColor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
            {errors.genericName && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <Select onValueChange={(value) => setCompany(value)}>
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
            <Select onValueChange={(value) => setCategory(value)}>
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
            <Select onValueChange={(value) => setMassUnit(value)}>
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
            />
            {errors.unitPrice && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <input
              {...register("discountPercentage")}
              type="number"
              placeholder="discount by percentage optional ( if you give )"
              className="w-full bg-white rounded border border-gray-300 focus:border-themeColor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="col-span-2">
            <textarea
              {...register("description", { required: true })}
              placeholder="shor description"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              defaultValue={""}
            />
            {errors.description && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <Button className="w-3/4 bg-themeColor" type="submit">
            {loading ? <Spinner /> : "Add Now"}
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
    </div>
  );
}

AddMedicineForm.propTypes = {
  setOpen: PropTypes.func,
};
