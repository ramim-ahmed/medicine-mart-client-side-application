import MetaData from "@/components/MetaData";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useSecureApi from "@/hooks/useSecureApi";
import useAuth from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TiDeleteOutline } from "react-icons/ti";
import useBaseApi from "@/hooks/useBaseApi";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadImage } from "@/api/utils";
export default function AskForAdvertisement() {
  const secureApi = useSecureApi();
  const baseApi = useBaseApi();
  const queryClient = useQueryClient();
  const { authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [company, setCompany] = useState("");
  const [imageFile, setImageFile] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { mutateAsync: addAdvertise } = useMutation({
    mutationFn: async (data) =>
      await secureApi.post("/advertisements/create-new", data),
    onSuccess: () => queryClient.invalidateQueries(["my-advertisements"]),
  });
  const { data: companies, isLoading: companiesLoading } = useQuery({
    queryKey: ["companies"],
    queryFn: async () => await baseApi.get("/companies"),
  });
  const { data, isLoading } = useQuery({
    queryKey: "my-advertisements",
    queryFn: async () =>
      await secureApi.get(
        `/advertisements/my-advertisement/${authUser?.email}`
      ),
  });
  const handleAdvertisement = async (data) => {
    setLoading(true);
    if (!company) {
      return toast.error("Please select company!!");
    }
    if (!imageFile) {
      return toast.error("Please upload medicine photo!!");
    }
    try {
      const image = await uploadImage(imageFile);
      const advertiseData = {
        seller: {
          name: authUser?.displayName,
          email: authUser?.email,
          photo: authUser?.photoURL,
        },
        image,
        name: data?.name,
        genericName: data?.genericName,
        company,
        description: data?.description,
      };
      await addAdvertise(advertiseData);
      toast.success("Advertise Successfully Added!!");
      setLoading(false);
      setOpen(false);
      reset();
    } catch (error) {
      toast.error("Advertise Created Failed!!");
      setLoading(false);
      setOpen(false);
      reset();
    }
  };
  return (
    <>
      <MetaData title="Seller Dashboard | Advertisement" />
      <div>
        <div className="flex space-x-5">
          <Button variant="outline">My Advertisements</Button>

          <Dialog open={open}>
            <DialogTrigger onClick={() => setOpen(true)} asChild>
              <Button variant="outline">Add Advertise</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Add New Advertise</DialogTitle>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(handleAdvertisement)}
                className="space-y-3"
              >
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="product-image">Product Image</Label>
                  <Input
                    id="product-image"
                    type="file"
                    onChange={(e) => setImageFile(e.target.files[0])}
                  />
                </div>
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
                  <textarea
                    {...register("description", { required: true })}
                    placeholder="short description"
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  />
                  {errors.description && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <Button className="w-3/4 bg-themeColor" type="submit">
                    {loading ? <Spinner /> : "Add Advertise"}
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
        </div>
        <div className="pt-10">
          {isLoading ? (
            <div className="flex justify-center">
              <Spinner />
            </div>
          ) : (
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {data?.data?.data?.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="bg-gradient-to-r flex justify-between p-20 from-gray-50 to-white w-full">
                    <div className="w-1/2 space-y-3">
                      <div>
                        <h1 className="text-3xl font-bold">{item.name}</h1>
                        <p>{item.genericName}</p>
                      </div>
                      <p>{item.description}</p>
                      <p>{item?.company?.name}</p>
                      <p>{item?.seller?.email}</p>
                      <div>
                        {item?.status ? (
                          <Button variant="outline">
                            Approved for Advertisement
                          </Button>
                        ) : (
                          <Button variant="outline">Pending</Button>
                        )}
                      </div>
                    </div>
                    <div className="w-1/2 flex justify-center">
                      <img className="w-60" src={item?.image} alt="" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </>
  );
}
