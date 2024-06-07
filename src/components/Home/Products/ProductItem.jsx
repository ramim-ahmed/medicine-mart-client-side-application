/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TiDeleteOutline } from "react-icons/ti";
import MedicineDetails from "@/components/MedicineDetails";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import useSecureApi from "@/hooks/useSecureApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProductItem({ item }) {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuth();
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: addToCart } = useMutation({
    mutationFn: async (data) => {
      const res = await secureApi.post("/carts/create-new", data);
      if (!res.data?.data) {
        toast.error("Already Product Added To Cart!!");
      } else {
        toast.success("Product Added To Cart!!");
      }
    },
    onSuccess: () => queryClient.invalidateQueries(["my-carts"]),
  });
  const {
    image,
    seller,
    name,
    genericName,
    category,
    company,
    unitPrice,
    discountPercentage,
    massUnit,
  } = item || {};
  const handleAddToCart = async ({
    _id,
    id,
    __v,
    company,
    category,
    createdAt,
    updatedAt,
    ...res
  } = product) => {
    if (!authUser) {
      return navigate("/login");
    }
    try {
      const newData = {
        email: authUser?.email,
        productId: _id,
        company: company?._id,
        category: category?._id,
        ...res,
      };
      await addToCart(newData);
    } catch (error) {
      toast.error("Product Add To Cart Failed!!");
    }
  };
  return (
    <div className="border p-6 bg-white">
      <div className="flex relative justify-center">
        <img className="w-52 h-52" src={image} alt="" />
        {discountPercentage > 0 && (
          <div className="absolute left-0">
            <Button variant="outline">{discountPercentage}% off</Button>
          </div>
        )}
      </div>
      <div className="space-y-3 mt-8">
        <div className="space-y-1">
          <h2 className="font-semibold">
            {name} {massUnit}{" "}
            <span className="text-gray-500 text-sm">{category?.name}</span>
          </h2>
          <p>{genericName}</p>
          <p>{company?.name}</p>
          <p>Unit Price: $ {unitPrice}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div>
            <img
              className="w-8 rounded-full object-cover h-8"
              src={seller?.photo}
              alt=""
            />
          </div>
          <h1>{seller?.name}</h1>
        </div>
        <div className="flex justify-between items-center">
          <Dialog open={open}>
            <DialogTrigger onClick={() => setOpen(true)}>
              <Button variant="outline" type="button">
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <MedicineDetails item={item} />
              <div className="flex justify-end">
                <Button
                  onClick={() => setOpen(false)}
                  variant="outline"
                  type="button"
                  size="icon"
                >
                  <TiDeleteOutline className="h-6 w-6" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={() => handleAddToCart(item)} variant="outline">
            Select
          </Button>
        </div>
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  item: PropTypes.object,
};
