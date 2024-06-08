/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { Button } from "./ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useSecureApi from "@/hooks/useSecureApi";
import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
export default function MedicineDetails({ item }) {
  const {
    image,
    name,
    description,
    genericName,
    massUnit,
    unitPrice,
    company,
    category,
  } = item || {};
  const secureApi = useSecureApi();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { authUser } = useAuth();
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
    <div className="bg-gray-50">
      <div className="flex space-x-8 p-2">
        <div className="">
          <img className="w-96" src={image} alt="" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl">
            {name} {massUnit}{" "}
            <span className="text-sm text-gray-500">{category?.name}</span>
          </h1>
          <p>{genericName}</p>
          <p>{company?.name}</p>
          <p>Unit Price : ${unitPrice}</p>
          <div>
            <Button
              onClick={() => handleAddToCart(item)}
              className="w-32"
              variant="outline"
            >
              Select
            </Button>
          </div>
        </div>
      </div>
      <div className="mt3 bg-white p-2">
        <h3 className="font-semibold text-lg">Description</h3>
        <p className="mt-2">{description}</p>
      </div>
    </div>
  );
}

MedicineDetails.propTypes = {
  item: PropTypes.object,
};
